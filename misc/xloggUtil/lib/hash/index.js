const bcrypt = require("bcrypt")

const hashPassword = async (password) => {
    const hashedPass = await bcrypt.hash(password, 8)
    return hashedPass
}

const checkPassword = async (password, hashedPass) => {
    const match = await bcrypt.compare(password, hashedPass)
    return match
}

exports.hashPassword = hashPassword
exports.checkPassword = checkPassword