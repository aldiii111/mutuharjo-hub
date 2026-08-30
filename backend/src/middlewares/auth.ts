import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "@mutuharjo/shared"

export function requireAdminSession(
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction
): void {
  if (!req.session.adminId) {
    res.status(401).json({
      success: false,
      error: "Akses ditolak. Silakan login terlebih dahulu.",
    })
    return
  }
  next()
}
