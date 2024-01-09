import http from "http";
import url from "url";
const data = [
  {
    id: 1,
    userName: "Dung",
    email: "dung@123",
    address: "Thanh Hoa",
    age: 24,
  },
  {
    id: 2,
    userName: "Dung",
    email: "dung@123",
    address: "Thanh Hoa",
    age: 15,
  },
  {
    id: 3,
    userName: "Dung",
    email: "dung@123",
    address: "Thanh Hoa",
    age: 19,
  },
];

function extractParamsFromPath(path) {
  const matches = path.match(/\/users\/update\/(\d+)/) || [];
  const userId = matches[1] || null;
  return userId;
}

const app = http.createServer((req, res) => {
  let { query, pathname: path } = url.parse(req.url, true);
  const userId = extractParamsFromPath(path);
  let { userName, email, address, age } = query;

  console.log(userId, path);
  switch (path || path.toLocaleLowerCase()) {
    case "/users":
      res.end(JSON.stringify(data));
      break;
    case "/users/old":
      const old = data.filter((i) => i.age > 15);
      res.end(JSON.stringify(old));
      break;
    case "/users/add-random":
      const newData = [...data];
      newData.push(req.body);
      res.end(JSON.stringify(newData));
      break;
    case "/users/add":
      let id = Math.floor(Math.random() * 1000);
      const newUser = { id, userName, email, address, age };
      data.push(newUser);
      res.end(JSON.stringify(data));
      break;

    case `/users/update/${userId}`:
      const userIndex = data.findIndex((user) => user.id === parseInt(userId));
      if (userIndex !== -1) {
        if (userName) {
          data[userIndex].userName = userName;
        }
        if (email) {
          data[userIndex].email = email;
        }
        if (address) {
          data[userIndex].address = address;
        }
        if (userName) {
          data[userIndex].age = age;
        }
        res.end(JSON.stringify(data[userIndex]));
      } else {
        res.end("User not found");
      }
      break;

    default:
      res.end("404 not found");
      break;
  }
});

app.listen(8080, () => {
  console.log("Server is running!");
});
