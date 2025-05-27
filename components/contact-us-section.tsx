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

const formSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Please enter a subject'),
  message: z.string().min(1, 'Please enter your message'),
});

export type ContactFormData = z.infer<typeof formSchema>;

export default function ContactUs() {
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
          toast.success('Message sent successfully');
          reset();
        })
        .catch((err) => {
          console.error(err);
          toast.error('Something went wrong. Please try again.');
        });
    });
  };

  return (
    <motion.section
      className="h-full min-h-[calc(100dvh-var(--navbar-height))] scroll-mt-24 py-[clamp(3rem,5vw,6rem)]"
      id="faq"
      initial={'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <div className="grid h-full grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:px-12">
        <div>
          <h2 className="mb-4 text-4xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground mb-8">
            We are available for questions, feedback, or collaboration
            opportunities. Let us know how we can help!
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Phone:</strong> (123) 34567890
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a className="underline" href="mailto:email@example.com">
                email@example.com
              </a>
            </p>
          </div>
        </div>

        <Card className="space-y-4 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

            <div>
              <Textarea
                rows={4}
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
              className="bg-accent hover:bg-accent/80 w-full cursor-pointer"
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Card>
      </div>
    </motion.section>
  );
}
