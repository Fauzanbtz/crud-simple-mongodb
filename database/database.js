import express from "express";
import mongoose from "mongoose";

const app = express();
const url =
  "mongodb+srv://fauzan:fauzan123@users.hwijnua.mongodb.net/?retryWrites=true&w=majority&appName=users";

// Koneksi ke MongoDB dengan Mongoose
mongoose
  .connect(url)
  .then(() => console.log("Connected!"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Membuat Schema
// Definisi Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
});

// Membuat Model dari Schema
export const user = mongoose.model("User", userSchema);

//membuat data
export async function postId(data) {
  try {
    const user = new User(data);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error adding user");
  }
}

//menampilkan semua data
export async function getAll() {
  try {
    const respond = await user.find();
    return respond;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

//menampilkan data sesuai id
export async function getId(id) {
  try {
    const respond = await user.findb(id);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
