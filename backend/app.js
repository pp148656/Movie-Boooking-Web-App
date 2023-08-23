import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingsRouter from "./routes/booking-routes";
import cors from "cors";
dotenv.config();

const app= express();
//to addd origin to access control
app.use(
    cors({
        origin: "http://localhost:3000",
        
    })
)

//middleware
//to use json data
app.use(express.json())
app.use("/user",userRouter);

//middleware for admin
app.use("/admin",adminRouter);

app.use("/movie",movieRouter);

app.use("/booking",bookingsRouter);
//to connect to the mongoose
//and then to connect to the server
mongoose.connect(`mongodb://admin:${process.env.MONGODB_PASSWORD}@ac-bwa2nl0-shard-00-00.8mng1gt.mongodb.net:27017,ac-bwa2nl0-shard-00-01.8mng1gt.mongodb.net:27017,ac-bwa2nl0-shard-00-02.8mng1gt.mongodb.net:27017/?ssl=true&replicaSet=atlas-ofrndj-shard-0&authSource=admin&retryWrites=true&w=majority`
).then(()=>app.listen(5000,()=>{
    console.log("hehkke iipipppppppppp")
}))
.catch(e=>console.log(e));



//next is used to move to next available middleware 


//YYSHz4UUVKwVhual