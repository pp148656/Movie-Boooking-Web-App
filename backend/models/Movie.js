import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  // genre: {
  //   type: String,
  //   required: true,
  // },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});
//what is mongoose.Types.ObjectId
// mongoose.Types.ObjectId is a "mongoose object" 
// the admin type is an id of object admin
//ref just tells mongoose that you want to store there a reference to another model and at some point you want to populate those and get the full blown model by that reference. In a sense it is nothing more than a foreign key to another collection by which you fetch the actual document when populate is called.
export default mongoose.model("Movie", movieSchema);