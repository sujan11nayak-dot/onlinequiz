
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const questions = [
 {id:1, q:"Capital of India?", o:["Delhi","Mumbai","Chennai"], a:"Delhi"},
 {id:2, q:"Which is a programming language?", o:["HTML","JavaScript","CSS"], a:"JavaScript"},
 {id:3, q:"CPU stands for?", o:["Central Processing Unit","Computer Unit","Control Unit"], a:"Central Processing Unit"}
];

let results = [], id = 1;

app.get("/api/quiz", (req,res) => {
 res.json(questions.map(({a,...q}) => q));
});

app.post("/api/submit", (req,res) => {
 const {name, answers} = req.body;
 if(!name || !Array.isArray(answers))
  return res.status(400).json({message:"Enter valid details"});

 let score = questions.filter((q,i) => q.a === answers[i]).length;
 let result = {id:id++, name, score, total:questions.length};
 results.push(result);
 res.json(result);
});

app.get("/api/results", (req,res) => res.json(results));

app.get("/api/results/:id", (req,res) => {
 const user = results.find(u => u.id == req.params.id);
 res.json(user || {message:"User not found"});
});

app.listen(3000, () => console.log("Server running at 3000"));
