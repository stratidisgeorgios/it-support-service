import mongoose, {Schema } from 'mongoose';
const postSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            minLength:1,
            maxLength:30
        },
        description:{
            type:String,
            required:true,
            minLength:1,
            maxLength:50
        },
        age: {
            type:Number,
            required:true,
            min:1,
            max:150
        }
    },
    {
        timestamps:true
    }
)

export const Post = mongoose.model("Post",postSchema)