
const API = "/api";
let questions = [];

async function loadQuiz() {
 questions = await (await fetch(API+"/quiz")).json();

 quiz.innerHTML = questions.map((q,i) => `
 <h3>${q.q}</h3>
 ${q.o.map(a => `
 <input type="radio" name="q${i}" value="${a}">${a}<br>
 `).join("")}
 `).join("");
}

async function submitQuiz() {
 const name = document.getElementById("name").value;
 if(!name) return alert("Enter name");

 const answers = questions.map((q,i) =>
 document.querySelector(`input[name=q${i}]:checked`)?.value || ""
 );

 const res = await fetch(API+"/submit", {
 method:"POST",
 headers:{"Content-Type":"application/json"},
 body:JSON.stringify({name,answers})
 });

 const data = await res.json();
 result.innerText = `Score: ${data.score}/${data.total}`;
 loadResults();
}

async function loadResults() {
 const data = await (await fetch(API+"/results")).json();
 scores.innerHTML = data.map(u =>
 `<p>${u.id}. ${u.name} - ${u.score}/${u.total}</p>`
 ).join("") || "No results";
}

loadQuiz();
