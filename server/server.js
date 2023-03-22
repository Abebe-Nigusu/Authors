
// 1. import all dependencies
const express = require("express")
const app = express()
require('dotenv').config();
const cors = require("cors")

require("./configs/mongoose.config")

// 2. configure express
// make sure these lines are above any app.get or app.post code blocks
app.use(cors())
app.use( express.json() ); // recognize JSON object
app.use( express.urlencoded({ extended: true }) ); //to recognize the incoming Req object as strings/arrays

require("./routes/authors.routes")(app)


// 4. listen on the port
app.listen(8000, ()=>console.log(`Listening on port: 8000`))