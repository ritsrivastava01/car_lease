'use client';
import { formSchema } from '@/lib/validate';
import { CaretRight } from '@phosphor-icons/react';
import { useActionState, useState } from 'react';
import { z } from 'zod';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Label } from './label';

const LeaseForm = () => {
  const [error, setError] = useState<Record<string, string | null>>({});
  const validatePromoCode = async (_: unknown, formData: FormData) => {
    const formValues = {
      firstName: formData.get('firstName') as string,
      surName: formData.get('surName') as string,
      email: formData.get('email') as string,
      phoneNumber: Number(formData.get('phoneNumber') as unknown),
      promoCode: formData.get('promoCode') as string,
      agree: formData.get('termsAndCond') as unknown as boolean,
    };

    console.log(formValues);
    try {
      const result = await formSchema.parseAsync(formValues);
      console.log(result);
      setError({});
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors = e.flatten().fieldErrors;
        setError(fieldErrors as unknown as Record<string, string | null>);
        console.log(e.flatten().fieldErrors);
      }
    }

    // const promoCode = formData.get('promoCode') as string;
    // const result = await isValidPromoCode(promoCode);
    return {
      result: error ? 'Not valid' : 'Valid',
      data: formValues,
    };
  };
  const [state, action, isPending] = useActionState(validatePromoCode, null);
  return (
    <div>
      <h2 className="pb-6 text-3xl text-slate-900 first-letter:uppercase">
        get a car leasing offer
      </h2>
      <p className="pb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac neque
        est. Praesent condimentum libero ut bibendum pretium. Maecenas libero dolor,
        aliquam a ullamcorper vitae, sollicitudin et nunc. Fusce ac congue tellus
      </p>
      <form action={action} className="[&>div]:mb-4">
        <div className="relative flex flex-col gap-4 md:flex-row">
          <div className="w-full flex-1">
            <Label htmlFor="name">First name</Label>
            <Input
              name="firstName"
              required
              placeholder="Enter first name"
              defaultValue={state?.data.firstName}
            />

            {error.firstName && (
              <p className="text-sm text-red-800 peer-invalid:visible">
                {error.firstName}
              </p>
            )}
          </div>
          <div className="w-full flex-1">
            <Label htmlFor="name">Surname</Label>
            <Input
              name="surName"
              required
              placeholder="Enter surname"
              defaultValue={state?.data.surName}
            />
            {error.surName && (
              <p className="text-sm text-red-800 peer-invalid:visible">
                {error.surName}
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
          />
          {error.email && (
            <p className="text-sm text-red-800 peer-invalid:visible">
              {error.email}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Phone number</Label>
          <Input
            name="phoneNumber"
            type="tel"
            placeholder="Enter Phone number"
            defaultValue={state?.data.phoneNumber}
          />
          {error.phoneNumber && (
            <p className="text-sm text-red-800 peer-invalid:visible">
              {error.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Promo code</Label>
          <Input
            name="promoCode"
            placeholder="Enter Promo code"
            defaultValue={state?.data.promoCode}
          />
          {error.promoCode && (
            <p className="text-sm text-red-800 peer-invalid:visible">
              {error.promoCode}
            </p>
          )}
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox name="terms1AndCond" />
          <div className="grid gap-1.5">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
            {error.agree && (
              <p className="text-sm text-red-800 peer-invalid:visible">
                {error.agree}
              </p>
            )}
          </div>
        </div>
        <Button
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-[#ee8902] to-[#ee4e13] px-8 py-6 font-bold uppercase focus:ring-2 focus:ring-orange-400 md:w-auto"
        >
          Get offer
          <CaretRight weight="bold" />
        </Button>
      </form>
    </div>
  );
};

export default LeaseForm;
