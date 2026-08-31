import { prisma } from "../lib/prisma.js"
import type { ChatLog } from "@prisma/client"

export interface ChatbotResponse {
  answer: string
  source: "rule-based" | "gemini" | "fallback"
}

export class ChatbotService {
  async processMessage(sessionId: string, message: string): Promise<ChatbotResponse> {
    const answer: string = "Terima kasih telah menghubungi SMK Muhammadiyah 1 Sukoharjo. Silakan ajukan pertanyaan seputar PPDB, BLUD, atau jurusan."
    const source: "rule-based" | "gemini" | "fallback" = "rule-based"

    await prisma.chatLog.create({
      data: {
        sessionId,
        message,
        answer,
        source
      }
    })

    return { answer, source }
  }
}

export const chatbotService: ChatbotService = new ChatbotService()
