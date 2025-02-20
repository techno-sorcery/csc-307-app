// backend.js

import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
    return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
    return users["users_list"].filter((user) => user["job"] === job);
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter((user) => user["name"] === name)
    .filter((user) => user["job"] === job);
};

const findUserById = (id) => {
    return users["users_list"].find((user) => user["id"] === id);
};


const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};


app.post("/users", (req, res) => {
    const userToAdd = {
        id: Math.floor(Math.random() * 100000).toString(),
        name: req.body.name,
        job: req.body.job
    }
    addUser(userToAdd);

    res.status(201).send(userToAdd);
});


app.delete("/users", (req, res) => {
    const idToRemove = req.body;
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== idToRemove);

    res.send(req.body);
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    // Name and job
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);

    // Name
    } else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);

    // Job
    } else if (job != undefined) {
        let result = findUserByJob(job);
        result = { users_list: result };
        res.send(result);

    } else {
        res.send(users);
    }
});


app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);

    if (result === undefined) {
        res.status(404).send("Resource not found.");

    } else {
        res.send(result);
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);

    if (result === undefined) {
        res.status(404).send("Resource not found.");

    } else {
        users["users_list"] = users["users_list"].filter((user) => user["id"] !== req.params.id);
        res.status(204).send();
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
