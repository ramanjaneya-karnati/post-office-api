import { Router } from 'express'
import controllers from './postoffice.controllers'

const router = Router()

// /api/postoffice
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/postoffice/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
