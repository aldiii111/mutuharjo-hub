import "dotenv/config"
import "./types/session.types.js"
import express from "express"
import cors from "cors"
import session from "express-session"
import connectPgSimple from "connect-pg-simple"
import { apiRouter } from "./routes/index.js"
import { globalErrorHandler } from "./middlewares/error-handler.js"

const app = express()
const PORT = Number(process.env.PORT) || 5000

const allowedOrigins = [
  process.env.CORS_ORIGIN ?? "http://localhost:3000",
  "http://ppdb.localhost:3000",
]

app.use(
  cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
        callback(null, true)
        return
      }
      callback(new Error("CORS not allowed"))
    },
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PgStore = connectPgSimple(session)

app.use(
  session({
    store: new PgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET ?? "fallback-secret-ganti-di-env",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
)

app.use("/api", apiRouter)

app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log(`[Mutuharjo API] Server running on http://localhost:${PORT}`)
})
