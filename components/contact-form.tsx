'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useTransition } from 'react';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export type ContactFormData = z.infer<typeof formSchema>;

type ContactFormProps = {
  onSendEmail: (data: ContactFormData) => Promise<void>;
};

export function ContactForm({ onSendEmail }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    console.log('ContactForm onSendEmail', onSendEmail);
  }, [onSendEmail]);
  const [isPending, startTransition] = useTransition();
  const [isSent, setIsSent] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    startTransition(() => {
      onSendEmail(data)
        .then(() => {
          reset();
          setIsSent(true);
        })
        .catch((err) => console.error(err));
    });
  };

  return (
    <AnimatePresence>
      {isSent ? (
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto w-full max-w-md space-y-6"
        >
          <p className="text-center text-lg font-semibold">
            Thank you for your interest!
          </p>
          <p className="text-center text-sm text-gray-500">
            We will get back to you soon.
          </p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-md space-y-6"
        >
          <div className="space-y-2">
            <h2 className="pb-2 font-semibold">
              To get in touch, please enter your information below:
            </h2>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} disabled={isPending} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Sending...' : 'Submit'}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
