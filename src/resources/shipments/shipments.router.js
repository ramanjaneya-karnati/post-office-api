import { Router } from 'express'
import controllers from './shipments.controllers'

const router = Router()

// /shipments/list
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/shipments/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
