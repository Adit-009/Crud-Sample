require("dotenv").config({ quiet: true });
require('./config/db')
const app = require('./src/main')
const port = process.env.PORT || 3000;




app.listen(port, () => {
  console.log(`Succesfull ! Your server is running on ${port}`);
});
