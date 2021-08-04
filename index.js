const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Instance = require("./models/instance");

app.use(express.json());
app.use(morgan("tiny"));
morgan.token("url", (request, response) => {
  return JSON.stringify(request.body || {});
});
app.use(cors());
app.use(express.static("build"));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.get("/api/persons", (request, response) => {
  Instance.find({}).then((result) => {
    console.log(result);
    response.json(result);
  });
});

app.get("/info", (request, response) => {
  Instance.find({}).then((result) => {
    response.send(
      `<p>Phonebook has information for ${
        result.length
      } people.</p><p>${Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Instance.findById(id)
    .then((result) => {
      console.log(result);
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Instance.findByIdAndRemove(id).then((result) => {
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "Name is missing." });
  }
  if (!body.number) {
    return response.status(400).json({ error: "Phone Number is missing." });
  }

  const instance = new Instance({ name: body.name, number: body.number });
  instance.save().then((result) => {
    console.log("Phone Number Saved.");
    response.json(result);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on: ${PORT}`);
});
