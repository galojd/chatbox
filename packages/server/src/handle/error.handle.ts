import { Response } from 'express'

export const handleErrorResponse = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    console.log(error)

    res.status(400).json({
      ok: false,
      error: error.message
    })
  }
}
