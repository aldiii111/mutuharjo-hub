import { prisma } from "../lib/prisma.js"
import { matchFAQ } from "../lib/faq-data.js"
import { GoogleGenerativeAI } from "@google/generative-ai"

export interface ChatbotResponse {
  answer: string
  source: "rule-based" | "gemini" | "fallback"
}

export class ChatbotService {
  async processMessage(sessionId: string, message: string): Promise<ChatbotResponse> {
    const faqAnswer: string | null = matchFAQ(message)

    let answer: string
    let source: "rule-based" | "gemini" | "fallback"

    if (faqAnswer) {
      answer = faqAnswer
      source = "rule-based"
    } else {
      const apiKey: string | undefined = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_AI_KEY
      if (apiKey) {
        try {
          const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey)
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
          const systemPrompt: string = `Anda adalah asisten AI resmi SMK Muhammadiyah 1 Sukoharjo (Mutuharjo Hub). Jawablah pertanyaan pengguna secara ramah, informatif, dan relevan dengan sekolah kejuruan berbasis Islam.\n\nPertanyaan: ${message}`

          const result = await model.generateContent(systemPrompt)
          const responseText: string = result.response.text()
          if (responseText && responseText.trim().length > 0) {
            answer = responseText.trim()
            source = "gemini"
          } else {
            answer = "Maaf, saya belum dapat memahami pertanyaan tersebut. Silakan ajukan pertanyaan seputar pendaftaran PPDB, jurusan, atau layanan BLUD."
            source = "fallback"
          }
        } catch (err: unknown) {
          console.warn("Gemini API call failed:", err instanceof Error ? err.message : err)
          answer = "Terima kasih telah menghubungi SMK Muhammadiyah 1 Sukoharjo. Silakan ajukan pertanyaan seputar PPDB, jurusan, atau produk BLUD."
          source = "fallback"
        }
      } else {
        answer = "Terima kasih telah menghubungi SMK Muhammadiyah 1 Sukoharjo. Silakan ajukan pertanyaan seputar PPDB, jurusan, atau produk BLUD."
        source = "fallback"
      }
    }

    await prisma.chatLog.create({
      data: {
        sessionId,
        message,
        answer,
        source,
      },
    })

    return { answer, source }
  }
}

export const chatbotService: ChatbotService = new ChatbotService()
