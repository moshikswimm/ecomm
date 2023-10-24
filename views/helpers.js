module.exports = {
    getError(errors, prop){
        try {
            retuurn errors.mapped()[prop].msg
        } catch(err) {
            return ''
        }
    }
}
