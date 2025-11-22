import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(7000),

  JWT_SECRET: z.string().min(16),

  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().min(1),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().min(1),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.coerce.number().min(1),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.coerce.number().min(1),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  GMAIL_USER: z.string(),
  GMAIL_PASSWORD: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),

  EFI_BANK_API_KEY: z.string(),
  EFI_BANK_BASE_URL: z.string().url(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables', parsed.error.format())
  process.exit(1)
}

export const env = parsed.data
