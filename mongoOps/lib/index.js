const { connect } = require("./connect");
const { 
    getMongoCollections, 
    createMongoCollection, 
    deleteMongoCollection,
    insertIntoCollection,
    findInCollection,
    updateInCollection,
    deleteFromCollection
} = require("./operations");


module.exports = {
    connect,
    getMongoCollections,
    createMongoCollection,
    deleteMongoCollection,
    insertIntoCollection,
    findInCollection,
    updateInCollection,
    deleteFromCollection
}