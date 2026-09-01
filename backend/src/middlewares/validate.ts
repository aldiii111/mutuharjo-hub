import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"
import type { ApiResponse } from "@mutuharjo/shared"

export function validate(schema: ZodSchema) {
    return (req: Request, res: Response<ApiResponse<null>>, next: NextFunction):
        void | Response => {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            const issue = result.error.issues[0]
            const errorMessage = issue ? issue.message : "Data input tidak valid"
            return res.status(400).json({
                success: false,
                error: errorMessage,
            })
        }
        req.body = result.data
        next()
    }
}