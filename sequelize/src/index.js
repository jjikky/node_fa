const express = require("express");
const db = require("./models");
const app = express();

const User = db.users;

// db empty every start
db.sequelize.sync({ force: true });

app.use(express.json());

app.get("/users", (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/users", (req, res) => {
  const { firstName, lastName, hasCar } = req.body;

  const user = { firstName, lastName, hasCar };
  User.create(user)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was updated successfully." });
      } else {
        res.send({ message: `Cannot update User with id ${num}` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  User.destroy(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was deleted successfully." });
      } else {
        res.send({ message: `Cannot delete User with id ${num}` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
