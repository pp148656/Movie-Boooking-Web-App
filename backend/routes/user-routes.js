//routes for the get,put ,post requests
import  express  from "express";
import { deleteUser, getAllUsers,getUserById,login,signup, updateUser, getBookingsOfUser } from "../controllers/user-controller";
//express.Router is a class and userRouter is an object or an instance to use all functions in userRouter 
const userRouter= express.Router();

userRouter.get("/",getAllUsers);
userRouter.post("/signup",signup);
//here we can edit the user to edit the user we need its id from the frontend
userRouter.put("/:id",updateUser);
userRouter.get("/:id",getUserById);
userRouter.delete("/:id",deleteUser);
userRouter.get("/bookings/:id", getBookingsOfUser);
userRouter.post("/login",login);
export default userRouter;