const { genAdminAuthToken } = require("../../../util/admin")


const postLogin = async (req, res, next) => {
    try {
        const username = req.params.aid
        const password = req.body.password
        //
        const hashedPass = password 
        //
        const hashedAdmin = await req.userlogg.readAdmin(username)
        if (
            !hashedAdmin
        ) {
            return res.status(401).send({
                error: (
                    `Login failed.`
                )
            })
        }
        //
        const token = await genAdminAuthToken(username, req.userlogg)
        //
        res.send({
            admin: hashedAdmin,
            token
        })
    } catch (err) {
        res.status(400).send(err)
    }
}


//////////////
//////////////


const serveAdminLoginApi = async (router) => {
    router.post("/admin/login/:aid", postLogin)
}


exports.serveAdminLoginApi = serveAdminLoginApi