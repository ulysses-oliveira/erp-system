import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    email: z.email('Invalid email format'),
    password: z.string().min(8),
  }),
})

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30).optional(),
    email: z.email('Invalid email format').optional(),
    password: z.string().min(8).optional(),
  }),
})

export const getUserSchema = z.object({
  params: z.object({
    userId: z.uuid('Invalid user ID format'),
  }),
})

export const deleteUserSchema = getUserSchema

export const listUsersSchema = {}
