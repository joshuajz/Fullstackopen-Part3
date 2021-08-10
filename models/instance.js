const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URL;

console.log("Connecting to: ", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

const instanceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minLength: 5 },
  number: { type: String, required: true },
});

instanceSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    returnedObject.number = returnedObject.number;
  },
});

instanceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Instance", instanceSchema);
