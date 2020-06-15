const crypto = require('crypto')
const util = require('util')
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt)

class UsersRepository extends Repository{

    async create(attrs) {
        const records = await this.getAll()
        attrs.id = this.newId()
        const salt = crypto.randomBytes(8).toString('hex')
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
        const [hashed ,salt] = saved.split('.')
        const hashBuff = await scrypt(supplied, salt, 64)
        return hashed === hashBuff.toString('hex')

    }
}

module.exports = new UsersRepository('users.json')