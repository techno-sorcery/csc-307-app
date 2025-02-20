// src/MyApp.jsx
import React, { useState, useEffect } from "react"
import Table from "./Table"
import Form from "./Form"




function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error => console.log(error)))
    }, []);

    return (
        <div className="container">
            <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );

    function removeOneCharacter(index) {
        deleteUser(characters[index].id)
            .then((res) => {
                if (res.status !== 204) {
                    throw new Error(res.body);
                }


                const updated = characters.filter((character, i) => {
                    return i !== index;
                });

                setCharacters(updated);

            })
            .catch((error) => {
                console.log(error);
            });
    }


    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }


    function deleteUser(id) {
        console.log(`http://localhost:8000/users/${id}`);

        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        return promise;
    }


    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        });

        return promise;
    }

    function updateList(person) {
        postUser(person).then(response => {
                if (response.status !== 201) {
                    throw new Error(response.body)
                }

                return response.json()               
            })
            .then((json) => setCharacters([...characters, json]))
            .catch((error) => {
                console.log(error);
            });

    }
}
export default MyApp;
