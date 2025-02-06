import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  surName: z.string().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  promoCode: z
    .string()
    .length(9, {
      message: 'Promo code must be at 9 digits long',
    })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Promo code must be a number only (0-9)',
    }),
  agree: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
});
