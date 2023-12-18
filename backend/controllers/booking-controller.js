import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";


const extractTime = (dateString) => {
  const dateObject = new Date(dateString);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  
  // Format the time as needed, for example, "HH:mm"
  const formattedTime = `${hours}:${minutes}`;
  
  return formattedTime;
};
const strToInt = (timeString) => {
  // Extract hour and minute from the timeString
  const [hourStr, minuteStr] = timeString.split(':');
  
  // Convert the extracted strings to integers
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  // console.log(hour*100+minute);
 

  return hour*100+minute;
};

const conditionChecker = ({bookingsarr, targetDate, startTime, endTime }) => {
  // Add your custom conditions here
  // For example, check if startTime is before endTime
  // You can add more conditions based on your requirements
  
  
  let bookingsarray= bookingsarr.filter(( booking ) => {const bookingDate = new Date(booking.date); return(bookingDate.toISOString().split('T')[0] === targetDate.toISOString().split('T')[0]);});
  
  

  const existingStartTimes = bookingsarray.map((booking) => extractTime(booking.startTime));
  const existingEndTimes = bookingsarray.map((booking) => extractTime(booking.endTime));
  
  // Convert startTime and endTime to timestamps for comparison
  const startTimestamp = extractTime(startTime);
  const endTimestamp = extractTime(endTime);

  const isSlotAvailable = !existingStartTimes.some((existingStartTime, index) => {
    const existingEndTime = existingEndTimes[index];
   
    return (
      (strToInt(startTimestamp) >= strToInt(existingStartTime) && strToInt(startTimestamp) < strToInt(existingEndTime)) ||
      (strToInt(endTimestamp) > strToInt(existingStartTime) && strToInt(endTimestamp) <= strToInt(existingEndTime)) ||
      (strToInt(startTimestamp) <= strToInt(existingStartTime) && strToInt(endTimestamp) >= strToInt(existingEndTime))
    );
  });
  // console.log(isSlotAvailable);
  return isSlotAvailable;
};
export const newBooking = async (req, res, next) => {
  const { movie, date, user, startTime, endTime } = req.body;

  let existingMovie;
  let existingUser;
  let booking;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let targetDate= new Date(`${date}`);
  console.log("ravimvc");
  const bookingsarr = await Bookings.find({ movie: movie });
  console.log(conditionChecker({bookingsarr,targetDate,startTime,endTime}));
  if(conditionChecker({bookingsarr,targetDate,startTime,endTime})===false){
    console.log("hehe");
    return res.status(404).json({message: "Slot isn't available"});
  }
  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      user,
      startTime,
      endTime
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
  
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }
  

  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
//   The properties that we want to use .populate() on are properties that have a type of mongoose.Schema.Types.ObjectId. This tells Mongoose “Hey, I’m gonna be referencing other documents from other collections”. The next part of that property is the ref. The ref tells Mongoose “Those docs are going to be in the ___ collection.”
//.pull is used to pull or remove that item from the array automatically
 
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    console.log(booking);
    let existingMovie=await Movie.findById(booking.movie);
    let seatNumber=booking.seatNumber;
    const session = await mongoose.startSession();
    session.startTransaction();
    existingMovie.bookedSeats[seatNumber-1]=false;
    await booking.user.bookings.pull(booking);
    
    await booking.movie.bookings.pull(booking);
    await existingMovie.save({ session });
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};