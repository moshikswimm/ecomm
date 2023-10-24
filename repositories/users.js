const crypto = require('crypto')

const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt)

class UsersRepository extends Repository{

    
        const buff = await scrypt(attrs.password, salt, 64)
        const record = {
            ...attrs,
            password: `${buff.toString('hex')}.${salt}`
        }
        records.push(record)

        await this.writeAll(records)
        return record
    }


    async comparePass(saved, supplied){
        //saved = hashed.salt
        // supplied = passwd by the user

module.exports = new UsersRepository('users.json')
