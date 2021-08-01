const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log(
    "Please provide a password, name & number argument: node mongo.js {password} {name} {phone number}"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const databaseName = "phonebook";

const url = `mongodb+srv://fullstackopen:${password}@cluster0.vepkp.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Instance = mongoose.model("Instance", phoneSchema);

const instance = new Instance({ name: name, number: number });

instance.save().then((result) => {
  console.log(`Successfully added.  Name: ${name} | Number: ${number}`);
  Instance.find({}).then((persons) => {
    console.log("Phonebook:");
    persons.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
});
