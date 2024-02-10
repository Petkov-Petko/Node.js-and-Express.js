import express, { request, response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`); // Рънваме сървър на http://localhost:3000/
});

const users = [
  { id: 1, username: "Petko", displayName: "Pecata" },
  { id: 2, username: "Gosho", displayName: "Gogata" },
  { id: 3, username: "Huliq", displayName: "Huli" },
];
app.get("/", (request, response) => {
  response.status(201).send("Hello, World"); // Правим статуса на 201 и пращаме Hello, World
  // response.send("Hello") // Можем и без статуса
});

/**
 * query = всичко след ? в URL-a ПР: http://localhost:3000/users?filter=petko
 *
 * с този код можем да пуснем query със ?filter=username&value=et и ще ни върне всички обекти който
 * имат et във username-а си
 * ако не предоставим филтер и валуе или само едното ще ни върне целия аррей със хора
 */
app.get("/users", (request, response) => {
  // Query Params
  const {
    query: { filter, value },
  } = request;
  // when filter and value are undefined
  if (!filter && !value) return response.send(users);

  if (filter && value)
    return response.send(users.filter((user) => user[filter].includes(value)));

  return response.send(users);
});

// Post Requests
/*  Първо си правим app.use(express.json()) най отгоре на файла.

    Чрез thunder Clien extention пускаме post request със примерни данни:
  {"username":"koko"}
  вземаме тези данни и към тях конкатенираме id като то е +1 от последния аррей ot users
  {
  "id": 4,
  "username": "koko"}
 */
app.post("/users", (request, response) => {
  const { body } = request;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return response.send(newUser);
});

// Route Params
app.get("/users/:id", (request, response) => {
  console.log(request.params); // Каквото напишем във URL на мястото на :id ще ни го логнме в конзолата като { id: 'waea' }
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) {
    return response.status(400).send("Bad request");
  }

  const findUser = users.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  // Ако нмяма човек с това ид ще даде Not Found и ще направи статува 404
  else {
    return response.send(findUser);
  } // Ако сложим 3 след users/ ще ни даде Huliq
});

// Put Requests
/* 
  На мястото на :id пишем индекса на обекта който искаме да променим ПР:2
  и подаваме put request пр: 
  {
  "username": "Gogo",
  "displayName":"Gogata"
}
и така сменямае цялата стойностите. На обект със индекс 2
*/
app.put("/users/:id", (request, response) => {
  // Дестукторираме request body object
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id); // Правим го number.
  if (isNaN(parsedId)) return response.sendStatus(404);

  const findUserIndex = users.findIndex((user) => user.id === parsedId); // 0 ili -1

  if (findUserIndex === -1) return response.sendStatus(404);

  users[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
});

// Patch Requests
/* Като put но ни позволява да ъпдейтнем дадена част. А не всичко.
 */

app.patch("/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(404);
  const findUserIndex = users.findIndex((user) => user.id === parsedId); // 0 ili -1
  if (findUserIndex === -1) return response.sendStatus(404);

  users[findUserIndex] = { ...users[findUserIndex], ...body }; // Копираме целия обкет
  // и след това със ...body добавяме това кето искаме да променим
  // Пр: { id: 2, username: "Gosho", displayName: "Gogata", "username":"Novo" }
  // Така ще пренапишем само username na "Novo"

  return response.sendStatus(200);
});

// Delete Request

app.delete("/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(404);

  const userIndex = users.findIndex((user) => user.id === parsedId) 
  if(userIndex === -1) return response.sendStatus(404);

  /* Трием целия обект Пр: 
    http://localhost:3000/users/2
    Трием целия обект от users със индекс 2
  */
  users.splice(userIndex, 1);

  return response.sendStatus(200)
});
