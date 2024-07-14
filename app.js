import express from "express";
import bodyParser from "body-parser";
import { getAll, getId, postId, user } from "./database/database.js";
const app = express();
app.use(bodyParser.json());

//menambahkan data
app.post("/post", async (req, res) => {
  try {
    const respond = await user.create(req.body);
    res.send("data berhasil ditambahkan");
    return respond;
  } catch (error) {
    res.status(500).send("gagal menambahkan data");
  }
});

//menampilkan semua data di dalam db
app.get("/users", async (req, res) => {
  try {
    const respond = await user.find();
    res.send(respond);
  } catch (error) {
    throw new Error("Something went wrong");
  }
});

//mencari data sesuai id
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const respond = await user.findById(id);
    res.send(respond);
  } catch (error) {
    res.status(500).send("appjs mencari data sesuai id tidak berhasil");
  }
  console.log(id);
});

//mengupdate data sesuai id
app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateUser = await user.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.send("data berhasil di update");
    return updateUser;
  } catch (error) {
    res.status(500).send("data tidak berhasil di update");
  }
});

//menghapus data sesuai id
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await user.findByIdAndDelete(id);
    res.send("data berhasil di hapus");
    return deleteUser;
  } catch (error) {
    res.status(500).send("data tidak berhasil di update");
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000, (req, res) => {
  console.log("server sudah berjalan");
});
