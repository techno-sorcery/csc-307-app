// backend.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import userService from "./services/user-service.js";

// Initialize environment vars and mongo connectionjj
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

console.log("String:" + MONGO_CONNECTION_STRING);

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.post("/users", (req, res) => {
    const userToAdd = {
        name: req.body.name,
        job: req.body.job
    }
    userService.addUser(userToAdd);

    res.status(201).send(userToAdd);
});


app.delete("/users", (req, res) => {
    const id = req.body;

    userService.deleteUser(id).then((result) => {
        res.send(result);
    })
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    userService.getUsers(name, job).then((result) => {
        res.send(result);
    })
});


app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    userService.findUserById(id).then((result) => {
        if (result === undefined) {
            res.status(404).send("Resource not found.");

        } else {
            res.send(result);
        }
    })
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    
    userService.deleteUser(id).then((result) => {
        if (result === undefined) {
            res.status(404).send("Resource not found.");

        } else {
            res.status(204).send();
        }
    })
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
