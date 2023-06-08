import httpStatus from 'http-status'
import ApiError from '../../../errors/apiError'
import { academicSemesterTitleCodeMapper } from './semester.constant'
import { IAcademicSemester } from './semester.interface'
import { AcademicSemester } from './semester.model'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

export const AcademicSemesterService = {
  createSemester,
}
