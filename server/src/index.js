const mongoose = require("mongoose");
const colors = require("colors");

const app = require("./app");
const utils = require("./utils");
const to = utils.to;

const port = process.env.PORT || 5000;

const runApp = async (app) => {

  console.log("Connecting to database...");

  let [err, res] = await to(
    mongoose.connect(process.env.MONGO_CREDENTIALS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  );

  // If an error occurred, cancel server
  if(err) {
    console.log('Error connecting to database'.red);
    console.error(err);
    return;
  }

  // If successful, execute server
  if(res) {
    console.log('Successfully connected to database'.green)
   
    app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
    });
  }
};

runApp(app);