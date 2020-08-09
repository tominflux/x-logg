const lockArchetypeFns = require("./lock/archetype")
const lockItemFns = require("./lock/item")

module.exports = {
    ...lockArchetypeFns,
    ...lockItemFns
}