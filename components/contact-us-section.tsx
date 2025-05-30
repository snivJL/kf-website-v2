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
import { InlineWidget } from 'react-calendly';
import AnimatedSection from './animated-section';

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
    <AnimatedSection
      className="min-h-[calc(100dvh-96px)] px-6 py-24 md:px-12"
      id="contact-us"
      variants={fadeIn}
    >
      <div className="mx-auto w-full max-w-7xl space-y-12">
        {/* Top: Title & Description */}
        <div className="text-center md:text-left">
          <h2 className="mb-6 text-4xl font-bold">{contactUsSection.title}</h2>
          <p className="prose-lg text-muted-foreground">
            {contactUsSection.description}
          </p>
        </div>

        {/* Bottom: 2 Columns Side-by-Side */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Calendly */}
          <Card className="h-full p-6">
            <div className="h-[400px] w-full overflow-hidden rounded-md">
              <InlineWidget
                url="https://calendly.com/thomas-korefocus/30min"
                styles={{ height: '100%', width: '100%' }}
                pageSettings={{
                  hideEventTypeDetails: true,
                  hideLandingPageDetails: true,
                }}
              />
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="h-full p-6">
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
                <Input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                />
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
      </div>
    </AnimatedSection>
  );
}
