require('dotenv').config()


//////////
//////////

console.log("Loading dependencies...")

//
const express = require('express')
//
const genUserloggMongoApi = require("@x-logg/userlogg-mongo")
const genUserloggApi = require("userlogg")
const genUserloggRestApi = require("@x-logg/userlogg-express-rest")
//
const genUserloggAuthMiddleware = require("@x-logg/userlogg-auth")
//
const genCataloggMongoApi = require("@x-logg/catalogg-mongo")
const genCataloggApi = require("catalogg")
const genCataloggRestApi = require("@x-logg/catalogg-express-rest")
//
const genActionloggMongoApi = require("@x-logg/actionlogg-mongo")
const genActionloggApi = require("actionlogg")
const genActionloggRestApi = require("@x-logg/actionlogg-express-rest")


//////////////////
//CONFIGURE APIS//
//& MIDDLEWARES //
//////////////////


console.log("Configuring APIs and middlewares...")

const connection = process.env.MONGO_CONNECTION
const database = process.env.MONGO_DATABASE

//Step 1. Configure Userlogg Core + Mongo API.
const userloggMongoApi = genUserloggMongoApi(
    connection, database
)
const userloggApi = genUserloggApi(userloggMongoApi)

//Step 2. Configure Userlogg Auth Middleware
const userloggAuth = genUserloggAuthMiddleware(
    userloggApi, process.env.JWT_KEY
)

//Step 3. Configure Userlogg REST API + secure
//        with auth middleware.
const userloggRestApi = express.Router()
userloggRestApi.use(userloggAuth.adminAuth)
userloggRestApi.use(genUserloggRestApi(userloggApi))

//Step 4. Configure Catalogg APIs
const cataloggMongoApi = genCataloggMongoApi(
    connection, database
)
const cataloggApi = genCataloggApi(cataloggMongoApi)
const cataloggRestApi = express.Router()
cataloggRestApi.use(userloggAuth.adminAuth)
cataloggRestApi.use(genCataloggRestApi(cataloggApi))

//Step 5. Configure Actionlogg APIs
const actionloggMongoApi = genActionloggMongoApi(
    connection, database
)
const actionloggApi = genActionloggApi(actionloggMongoApi)
const actionloggRestApi = express.Router()
actionloggRestApi.use(userloggAuth.adminAuth)
actionloggRestApi.use(genActionloggRestApi(actionloggApi))


//////////
//////////


console.log("Preparing routes...")

//Create server.
const app = express()
const port = 3000

//Middlewares
app.use("/", userloggAuth.api)

//REST Modules
app.use("/api", userloggRestApi)
app.use("/api", cataloggRestApi)
app.use("/api", actionloggRestApi)

//Start server.
app.listen(
    port,
    () => console.log(
        `X-logg server listening at http://localhost:${port}`
    )
)