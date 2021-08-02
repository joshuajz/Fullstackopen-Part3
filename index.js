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

app.get("/api/persons", (request, response) => {
  Instance.find({}).then((result) => {
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

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Instance.find({ id: id }).then((result) => {
    if (result.length === 1) {
      response.json(result[0]);
    } else {
      response.send(
        "<h1>404</h1><p>Error!  That note id could not be found in the dataset.</p>"
      );
    }
  });
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
