import type { Request, Response } from "express"
import { chatbotService, type ChatbotResponse } from "../services/chatbot.service.js"
import type { ApiResponse } from "@mutuharjo/shared"

export class ChatbotController {
  async ask(
    req: Request,
    res: Response<ApiResponse<ChatbotResponse>>
  ): Promise<Response<ApiResponse<ChatbotResponse>>> {
    try {
      const sessionId: string = typeof req.body.sessionId === "string" ? req.body.sessionId : "anonymous"
      const message: string = typeof req.body.message === "string" ? req.body.message : ""

      if (!message.trim()) {
        return res.status(400).json({
          success: false,
          error: "Pesan tidak boleh kosong"
        })
      }

      const result: ChatbotResponse = await chatbotService.processMessage(sessionId, message)

      return res.status(200).json({
        success: true,
        data: result,
        message: "Berhasil mendapatkan jawaban chatbot"
      })
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : "Terjadi kesalahan server"
      return res.status(500).json({
        success: false,
        error: errorMessage
      })
    }
  }
}

export const chatbotController: ChatbotController = new ChatbotController()
