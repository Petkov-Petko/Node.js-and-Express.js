import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`); // Рънваме сървър на http://localhost:3000/
});

app.get("/", (request, response) => {
  response.status(201).send("Hello, World"); // Ако статуса е успешен пращаме Hello, World
  // response.send("Hello") // Можем и без статуса
});

app.get("/users", (request, response) => {
  response.send([
    { id: 1, username: "Petko", displayName: "Pecata" },
    { id: 2, username: "Gosho", displayName: "Gogata" },
    { id: 3, username: "Huliq", displayName: "Huli" },
  ]);
});

// Route Params
app.get("/users/:any", (request, response) => {
    console.log(request.params); // Каквото напишем във URL на мястото на :id ще ни го логнме в конзолата като { any: 'waea' }
})