import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "@mutuharjo/shared"

export function globalErrorHandler(
  err: unknown,
  _req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction
): void {
  const message =
    err instanceof Error ? err.message : "Terjadi kesalahan pada server."

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500

  if (process.env.NODE_ENV !== "production") {
    console.error("[ERROR]", err)
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  })
}
