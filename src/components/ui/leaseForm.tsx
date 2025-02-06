'use client';
import { delay } from '@/lib/utils';
import { formSchema } from '@/lib/validate';
import { isValidPromoCode } from '@/utils/generatePromoCode';
import { CaretRight } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import { z } from 'zod';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Label } from './label';

const LeaseForm = () => {
  const [error, setError] = useState<Record<string, string[] | undefined>>({});
  const router = useRouter();

  const validatePromoCode = async (_: unknown, formData: FormData) => {
    const formValues = {
      firstName: formData.get('firstName') as string,
      surName: formData.get('surName') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      promoCode: formData.get('promoCode') as string,
      agree: (formData.get('agree') as unknown) !== null,
    };

    try {
      const result = await formSchema.parseAsync(formValues);
      console.log(result);
      if (result) {
        setError({});
        await delay(5000);

        const isPromoCodeValid = await isValidPromoCode(formValues.promoCode);

        console.log(isPromoCodeValid);
        if (isPromoCodeValid !== true) {
          const error = new z.ZodError([]);
          error.addIssue({
            code: z.ZodIssueCode.custom,
            message: isPromoCodeValid as string,
            path: ['promoCode'],
          });
          throw error;
        }

        router.push('/success');
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors = e.flatten().fieldErrors;
        setError(fieldErrors);
        console.log(fieldErrors);
      }
    }

    return {
      result: error ? 'Not valid' : 'Valid',
      data: formValues,
    };
  };

  const [state, action, isPending] = useActionState(validatePromoCode, null);

  return (
    <div>
      <h2 className="pb-6 text-3xl text-slate-900 first-letter:uppercase">
        Get a car leasing offer
      </h2>
      <p className="pb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac neque
        est. Praesent condimentum libero ut bibendum pretium. Maecenas libero dolor,
        aliquam a ullamcorper vitae, sollicitudin et nunc. Fusce ac congue tellus
      </p>
      <form action={action} className="[&>div]:mb-4">
        <div className="relative flex flex-col gap-4 md:flex-row">
          <div className="w-full flex-1">
            <Label htmlFor="firstName">First name</Label>
            <Input
              name="firstName"
              required
              placeholder="Enter first name"
              defaultValue={state?.data.firstName}
              className={`${error.firstName ? 'border-red-800 bg-red-200/30' : ''}`}
            />
            {error.firstName && (
              <p className="text-sm text-red-800 peer-invalid:visible">
                {error.firstName[0]}
              </p>
            )}
          </div>
          <div className="w-full flex-1">
            <Label htmlFor="surName">Surname</Label>
            <Input
              name="surName"
              required
              placeholder="Enter surname"
              defaultValue={state?.data.surName}
              className={`${error.surName ? 'border-red-800 bg-red-200/30' : ''}`}
            />
            {error.surName && (
              <p className="text-sm text-red-800 peer-invalid:visible">
                {error.surName[0]}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            defaultValue={state?.data.email}
            className={`${error.email ? 'border-red-800 bg-red-200/30' : ''}`}
          />
          {error.email && (
            <p className="text-sm text-red-800 peer-invalid:visible">
              {error.email[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input
            name="phoneNumber"
            type="tel"
            placeholder="Enter Phone number"
            defaultValue={state?.data.phoneNumber}
            className={`${error.phoneNumber ? 'border-red-800 bg-red-200/30' : ''}`}
          />
          {error.phoneNumber && (
            <p className="text-sm text-red-800 peer-invalid:visible">
              {error.phoneNumber[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="promoCode">Promo code</Label>
          <Input
            name="promoCode"
            placeholder="Enter Promo code"
            defaultValue={state?.data.promoCode}
            className={`${error.promoCode ? 'border-red-800 bg-red-200/30' : ''}`}
          />
          {error.promoCode && (
            <p className="text-sm text-red-800 peer-invalid:visible">
              {error.promoCode[0]}
            </p>
          )}
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox name="agree" />
          <div className="grid gap-1.5">
            <label
              htmlFor="agree"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
            {error.agree && (
              <p className="text-sm text-red-800 peer-invalid:visible">
                {error.agree[0]}
              </p>
            )}
          </div>
        </div>
        <Button
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-orange-400 to-orange-700 px-8 py-6 font-bold uppercase shadow-md focus:ring-2 focus:ring-orange-400 md:w-48"
        >
          {isPending ? 'Getting offer...' : 'Get offer'}

          <CaretRight weight="bold" />
        </Button>
      </form>
    </div>
  );
};

export default LeaseForm;
