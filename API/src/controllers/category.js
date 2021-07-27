const httpStatus = require('http-status')
const { Category } = require('../models')
const { safeObjectId } = require('../helpers')

const methods = {
    async list(request, response) {
        const category = new Category()

        try {
            const categorys = await category.list({ deletedAt: { $exists: false } })

            response.status(httpStatus.OK).json(categorys)
        } catch(error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async create(request, response) {
        const { name } = request.body

        const category = new Category()

        if (!name) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'you need to write the categority name' })
        }

        try {
            const insertedObject = await category.insertOne({ name, createdAt: Date.now(), updatedAt: Date.now() })

            response.status(httpStatus.CREATED).json(insertedObject)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async show(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)

        const category = new Category()

        try {
            const categoryToReturn = await category.findOne({  _id: convertedObjectId  })
            
            response.status(httpStatus.OK).json(categoryToReturn)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async update(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)
        const { name } = request.body

        if (!name) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'you need to write the categority name' })
        }

        const category = new Category()

        try {
            const updatedObject = await category.updateOne({ _id: convertedObjectId }, { name, updatedAt: Date.now() })
            
            response.status(httpStatus.OK).json(updatedObject)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async destroy(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)

        const category = new Category()

        try {
            const destroyedObject = await category.updateOne({ _id: convertedObjectId }, { deletedAt: Date.now() })
            
            response.status(httpStatus.NO_CONTENT).json()
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}

module.exports = methods