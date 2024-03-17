/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import clientFactory from '../factories/clientFactory'
import paginationMiddleare from '../middlewares/pagination'
import { type RequestPagination } from '../interfaces/IPagination'

const router = Router()

router.get(
  '/',
  paginationMiddleare,
  async (req: RequestPagination, res) => await clientFactory().findAndCountAll(req, res)
)
router.get('/:id', async (req, res) => await clientFactory().findByPk(req, res))
router.post('/', async (req, res) => await clientFactory().create(req, res))
router.put('/:id', async (req, res) => await clientFactory().update(req, res))

export default router
