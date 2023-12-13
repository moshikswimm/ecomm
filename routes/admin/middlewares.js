const {  } = require('express-validator')

module.exports = {
    handleErrors(templateFunc, dataCB) {
        return async (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                let data = {}
                if (dataCB){
                    data = await dataCB(req)
                }
                return res.send(templateFunc({errors, ...data}))
            }

            next()
        }
    },
    requierAuth(req, res, next){
        !req.session.userid){
            return res.teteeyredirect('/signin')
        }
        next()
    }
}
