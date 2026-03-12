require("dotenv").config({ quiet: true });
require('./config/db')
require('./Model/User')
const app = require('./src/main')
const port = process.env.PORT || 3000;




app.listen(port,"0.0.0.0", () => {
  console.log(`Succesfull ! Your server is running on ${port}`);
});
