const fs = require('fs')
const crypto = require('crypto')
const util = require('util')

const scrypt = util.promisify(crypto.scrypt)

class usersRepository{

    constructor(filename){
        if (!filename){
            throw new Error('Filename is requiered')
        }
        this.filename = filename

        try{
            // using sync beacuse happends once and inside the constructor
            fs.accessSync(this.filename)
        }
        catch(err){
            // creating the file
            fs.writeFileSync(this.filename, '[]')
        }
    }

    async getAll() {

        return JSON.parse(
            await fs.promises.readFile(this.filename, { encoding: 'utf8'})
            )
    }

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

    async writeAll(records) {
        await fs.promises.writeFile(this.filename,
             JSON.stringify(records, null,2))
    }

    async comparePass(saved, supplied){
        //saved = hashed.salt
        // supplied = passwd by the user
        const [hashed ,salt] = saved.split('.')
        const hashBuff = await scrypt(supplied, salt, 64)
        return hashed === hashBuff.toString('hex')

    }

    newId() {
        return crypto.randomBytes(4).toString('hex')
    }

    async getOne(id) {
        const records = await this.getAll()
        return records.find(record => record.id == id)
    }

    async delete(id) {
        const records = await this.getAll()
        const filteredRec = records.filter(rec => rec.id !== id)
        this.writeAll(filteredRec)
    }

    async update(id, attrs) {
        const records = await this.getAll()
        const record = records.find(rec => rec.id === id)
        
        if (!record) {
            throw new Error('no user with such id')
        }

        Object.assign(record, attrs)

        await this.writeAll(records)
    }

    async getOneBy(filters) {
        const records = await this.getAll()
        for (let rec of records){
            let found = true
            for (let key in filters){
                if (rec[key] !== filters[key]){
                    found = false
                    break
                }
            }

            if (found) {
                return rec
            }
        }
    }
}

module.exports = new usersRepository('users.json')