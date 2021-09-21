const express = require('express');
const path = require('path');
const fs = require('fs');
const note = require('./db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

app.get("/api/notes", (req,res) => { res.json(note)});

app.post("/api/notes", (req, res) => {
  // console.log(req.body)
  const newNoteInfo = req.body;
  newNoteInfo.id = Math.floor(Math.random() * 10000000)
  note.push(newNoteInfo)

  fs.writeFileSync('db/db.json', JSON.stringify(note))

  res.json("new Note added")
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);