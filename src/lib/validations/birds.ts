import { z } from 'zod'

export const createBirdSchema = z.object({
  specie: z.coerce.string().nonempty('bắt buộc loài').trim(),
  name: z.coerce.string().nonempty('bắt buộc tên').trim(),
  birth: z.coerce.date().optional(),
  price: z.coerce.number(),
  description: z.coerce.string().optional(),
  sold: z.coerce.boolean().optional(),
  onSale: z.coerce.boolean().optional(),
  gender: z.enum(['male', 'female']),
  imageUrls: z.array(z.coerce.string()).optional(),
  parent: z
    .object({
      dad: z.coerce.string().optional(),
      mom: z.coerce.string().optional()
    })
    .optional(),
  achievements: z
    .array(
      z.object({
        competition: z.coerce.string(),
        rank: z.coerce.number()
      })
    )
    .optional(),
  discount: z
    .object({
      discountPercent: z.coerce.number(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date()
    })
    .optional()
})

export type TCreateBirdSchema = z.infer<typeof createBirdSchema>