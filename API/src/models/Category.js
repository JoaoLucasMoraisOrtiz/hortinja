const Database = require('./Database')

class Category extends Database {
    constructor(params = {}) {
        super()
        this.collection = 'category'
    }
}

module.exports = Category