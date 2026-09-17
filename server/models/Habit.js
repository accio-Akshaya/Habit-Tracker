import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required:true,
    },
    completedDates:[Date],
    streak:{
        type:Number,
        default:0,
    },
},{timestamps:true})
export default mongoose.model("Habit",habitSchema);