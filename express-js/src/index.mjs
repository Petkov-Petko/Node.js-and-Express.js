import express, { request, response } from "express";

const app = express();

app.use(express.json())

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
    const newUser = {id:users[users.length - 1].id + 1, ...body}
    users.push(newUser)
    return response.send(newUser) 
})

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
    return response.send(findUser.username);
  } // Ако сложим 3 след users/ ще ни даде Huliq
});
