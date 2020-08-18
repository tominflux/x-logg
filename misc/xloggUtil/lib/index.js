const apiWrapperCoreFns = require("./apiWrapper/core")
const apiWrapperMongoFns = require("./apiWrapper/mongo")
const hashFns = require("./hash")
const lockArchetypeFns = require("./lock/archetype")
const lockItemFns = require("./lock/item")

module.exports = {
    ...apiWrapperCoreFns,
    ...apiWrapperMongoFns,
    ...hashFns,
    ...lockArchetypeFns,
    ...lockItemFns
}