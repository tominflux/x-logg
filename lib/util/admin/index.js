const {
    createItem
} = require("aarketype")
const {
    lockItem
} = require("@x-logg/util")
const jwt = require('jsonwebtoken')



const genAdminAuthToken = async (username, userloggApi) => {
    //Read admin item.
    const admin = await userloggApi.readAdmin(username)
    //Generate token.
    const token = jwt.sign(
        { identifier: admin.identifier.data },
        process.env.JWT_KEY
    )
    //Update admin in userlogg.
    userloggApi.updateAdmin(
        username,
        null,
        token
    )
    //Return token
    return token
}

exports.genAdminAuthToken = genAdminAuthToken