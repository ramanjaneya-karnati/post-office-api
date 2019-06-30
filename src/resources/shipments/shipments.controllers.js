import { crudControllers } from '../../utils/crud'
import { Shipments } from './shipments.model'

export default crudControllers(Shipments, 'shipments')
