import express from 'express';
import validateRequest from '../../middleware/validateRequest';
// import { UserController } from './user.controller';

import { AcademicSemesterController } from './semester.controller';
import { AcademicSemesterValidation } from './semester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/', AcademicSemesterController.getAllSemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoutes = router;
