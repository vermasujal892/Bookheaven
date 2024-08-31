import mongoose, { mongo } from "mongoose";
const bookSchema = mongoose.Schema({
    name:String,
    title:String,
    price:Number,
    catogory:String,
    image:String

})

const Book = mongoose.model("Book",bookSchema)

export default Book;