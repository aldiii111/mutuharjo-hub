import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "@mutuharjo/shared"
import { findAdminByUsername } from "../services/auth.service.js"
import { verifyPassword } from "../lib/password.js"

export async function loginController(request: Request, response: Response<ApiResponse<{ username: string }>>, next: NextFunction) {
    try {
        const data = request.body;
        const admin = await findAdminByUsername(data.username)
        if (!admin) {
            return response.status(401).json({
                success: false,
                error: "Username atau password salah"
            })
        }
        const isPasswordValid = await verifyPassword(data.password, admin.passwordHash);
        if (!isPasswordValid) {
            return response.status(401).json({
                success: false,
                error: "Username atau password salah"
            })
        }
        request.session.adminId = admin.id;

        return response.status(200).json({
            success: true,
            data: { username: admin.username },
            message: "Login berhasil"
        })

    } catch (error) {
        next(error);
    }
}

export function logoutController(request: Request, response: Response<ApiResponse<null>>, next: NextFunction) {
    try {
        request.session.destroy((err) => {
            if (err) {
                return next(err)
            }
            return response.status(200).json({
                success: true,
                data: null,
                message: "Logout berhasil"
            })
        });

    } catch (error) {
        next(error)
    }
}
