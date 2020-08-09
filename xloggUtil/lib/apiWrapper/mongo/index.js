
//

const wrapApiMethod = (options, method) => {
    return (...params) => method(options, ...params)
}

const wrapAllMethods = (options, objOfMethods) => {
    let objOfWrappedMethods = {}
    for (const key in objOfMethods) {
        const method = objOfMethods[key]
        const wrappedMethod = wrapApiMethod(options, method)
        objOfWrappedMethods = {
            ...objOfWrappedMethods,
            [key]: wrappedMethod
        }
    }
    return {...objOfWrappedMethods}
}

//

const genMongoApi = (connection, database, mongoMethods) => {
    const options = { connection, database }
    const allWrappedMethods = wrapAllMethods(options, mongoMethods)
    return allWrappedMethods
}

exports.genMongoApi = genMongoApi