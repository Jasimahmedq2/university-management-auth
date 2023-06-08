import express from 'express'
import validateRequest from '../../middleware/validateRequest'
// import { UserController } from './user.controller';

import { AcademicSemesterController } from './semester.controller'
import { AcademicSemesterValidation } from './semester.validation'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

export const AcademicSemesterRoutes = router
