
//

const wrapApiMethod = (method, dataApi) => {
    return (...params) => method(...params, dataApi)
}

const wrapAllMethods = (objOfMethods, dataApi) => {
    let objOfWrappedMethods = {}
    for (const key in objOfMethods) {
        const method = objOfMethods[key]
        const wrappedMethod = wrapApiMethod(method, dataApi)
        objOfWrappedMethods = {
            ...objOfWrappedMethods,
            [key]: wrappedMethod
        }
    }
    return {...objOfWrappedMethods}
}

//

const genCoreApi = (coreMethods, dataApi) => {
    const allWrappedMethods = wrapAllMethods(coreMethods, dataApi)
    return allWrappedMethods
}

exports.genCoreApi = genCoreApi