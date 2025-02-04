import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  surName: z.string().min(2, {
    message: 'Sur name must be at least 2 characters.',
  }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phoneNumber: z.number().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  promoCode: z.string().min(9, {
    message: 'Promo code must be at least 9 characters.',
  }),
  agree: z.boolean(),
  //   agree: z.ch boolean().refine((value) => value === true, {
  //     message: 'You must agree to the terms and conditions',
  //   }),
});
