// this contains all basic CRUD endpoints on a schema
// the schema is supplied by injection
class CrudController {
    constructor(model) {
        this.model = model
    }

    // we HAVE to use lambda functions here, as they have
    // lexical scope for 'this'
    create = async (req, res, next) => {
        try {
            const entity = new this.model(req.body)
            await entity.save()
            res.status(201).json({id: entity.id})
        } catch (err) {
            next(err)
        }
    }

    getAll = async (req, res, next) => {
        try {
            const entities = await this.model.find()
            res.status(200).send(entities)
        } catch (err) {
            next(err)
        }
    }

    getOne = async (req, res, next) => {
        try {
            const entity = await this.model.findById(req.params.id)
            res.status(200).send(entity)
        } catch (err) {
            next(err)
        }
    }

    update = async (req, res, next) => {
        try {
            await this.model.findByIdAndUpdate(req.params.id, req.body)
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }

    delete = async (req, res, next) => {
        try {
            // this happens in two steps to make mongoose middleware run
            const entity = await this.model.findById(req.params.id)
            await entity.delete()
            res.status(204).end()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = CrudController