require("dotenv").config(); // To load all env variables into process.env
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const connectDb = require("./config/db");
const morganLogging = require("./middleware/morgan");
const xssReqSanitizer = require("./middleware/xss");
const app = express();

//connect Database
connectDb();

app.use(cors()); // To enable cors
app.use(morganLogging(process.env.MORGAN_FORMAT)); // Morgan transactional logging
app.use(express.json()); // To parse json request body
app.use(express.urlencoded({ extended: true })); // To parse urlencoded request body
app.use(helmet()); // To add secure headers
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true })); // To add secure headers
app.use(xssReqSanitizer()); // To sanitize request for xss request attacks

//Define Routes
app.use(process.env.CONTEXT_ROOT, require("./routes/users"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API is running on PORT ${PORT}`));
