import type { Request, Response } from "express"
import type { ApiResponse } from "@mutuharjo/shared"

interface HealthData {
  status: string
  timestamp: string
}

export function checkHealth(
  _req: Request,
  res: Response<ApiResponse<HealthData>>
): void {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    message: "Mutuharjo Hub API is running.",
  })
}
