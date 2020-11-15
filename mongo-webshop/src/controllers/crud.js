// this registers all basic CRUD endpoints on a schema
// the schema is supplied by injection
function registerCrud(router, model) {
    router.post('/', async function(req, res, next) {
        try {
            const entity = new model(req.body)
            await entity.save()
            res.status(201).json({id: entity.id})
        } catch (err) {
            next(err)
        }
    })

    router.get('/', async function(req, res, next) {
        try {
            const entities = await model.find()
            res.status(200).send(entities)
        } catch (err) {
            next(err)
        }
    })

    router.get('/:id', async function(req, res, next) {
        try {
            const entity = await model.findById(req.params.id)
            res.status(200).send(entity)
        } catch (err) {
            next(err)
        }
    })

    router.put('/:id', async function(req, res, next) {
        try {
            await model.findByIdAndUpdate(req.params.id, req.body)
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    })

    router.delete('/:id', async function(req, res, next) {
        try {
            // this happens in two steps to make mongoose middleware run
            const entity = await model.findById(req.params.id)
            await entity.delete()
            res.status(204).end()
        } catch(err) {
            next(err)
        }
    })
}

module.exports = registerCrud