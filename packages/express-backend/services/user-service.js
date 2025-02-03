import mongoose from "mongoose";
import userModel from "../models/user.js";

// mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

function getUsers(name, job) {
    let promise;

    if (name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        console.log(job);
        promise = findUserByJob(job);
    } else if (name && job) {
        promise = findUserByNameAndJob(name, job);
    }
    return promise;
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return userModel.find({ name: name }).find({ job: job });
}

function deleteUser(id) {
    console.log(id);
    const promise = userModel.findByIdAndDelete(id);
    return promise;

}

export default {
    addUser, getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    deleteUser,
};
