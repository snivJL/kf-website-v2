'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion';
import { sendContactEmail } from '@/app/actions/send-contact-email';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { ContactUsPage } from '@/lib/sanity/types';

const formSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Please enter a subject'),
  message: z.string().min(1, 'Please enter your message'),
});

export type ContactFormData = z.infer<typeof formSchema>;

export default function ContactUs({
  contactUsSection,
}: {
  contactUsSection: ContactUsPage;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    startTransition(() => {
      sendContactEmail(data)
        .then(() => {
          toast.success(contactUsSection.successToast);
          reset();
        })
        .catch((err) => {
          console.error(err);
          toast.error(contactUsSection.errorToast);
        });
    });
  };

  return (
    <motion.section
      className="flex min-h-[calc(100vh-96px)] items-center justify-center py-[clamp(4rem,8vh,10rem)]"
      id="contact-us"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <div className="grid w-full max-w-7xl grid-cols-1 items-stretch gap-12 px-6 md:grid-cols-2 md:px-12">
        {/* LEFT: Intro and Contact Info */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <h2 className="mb-6 text-4xl font-bold">
              {contactUsSection.title}
            </h2>
            <p className="text-muted-foreground prose-lg mb-12">
              {contactUsSection.description}
            </p>
          </div>
          <div className="text-muted-foreground space-y-2 pb-2 text-sm">
            <p>
              <strong className="text-foreground">
                {contactUsSection.phoneLabel}
              </strong>{' '}
              {contactUsSection.phoneNumber || 'N/A'}
            </p>
            <p>
              <strong className="text-foreground">
                {contactUsSection.emailLabel}
              </strong>{' '}
              <a
                className="underline"
                href={`mailto:${contactUsSection.emailAddress}`}
              >
                {contactUsSection.emailAddress || 'N/A'}
              </a>
            </p>
          </div>
        </div>

        <Card className="h-full p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-col gap-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Input placeholder="First Name" {...register('firstName')} />
                {errors.firstName && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </div>
              <div>
                <Input placeholder="Last Name" {...register('lastName')} />
                {errors.lastName && (
                  <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <Input type="email" placeholder="Email" {...register('email')} />
              {errors.email && (
                <motion.p
                  className="mt-1 text-sm text-red-500"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div>
              <Input placeholder="Subject" {...register('subject')} />
              {errors.subject && (
                <motion.p
                  className="mt-1 text-sm text-red-500"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.subject.message}
                </motion.p>
              )}
            </div>

            <div className="flex-1">
              <Textarea
                rows={6}
                placeholder="Type your message here."
                {...register('message')}
              />
              {errors.message && (
                <motion.p
                  className="mt-1 text-sm text-red-500"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-accent hover:bg-accent/80 mt-auto w-full"
              disabled={isPending}
            >
              {isPending
                ? contactUsSection.sendingButtonText
                : contactUsSection.submitButtonText}
            </Button>
          </form>
        </Card>
      </div>
    </motion.section>
  );
}
