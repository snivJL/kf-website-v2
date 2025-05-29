import { cn } from '@/lib/utils';

const items = [
  {
    title: 'CRM that powers progress, not friction',
    problem: [
      'CRMs are cluttered with limited, messy, and outdated data - hard to trust, harder to use',
      'They demand continuous upkeep, pulling teams away from revenue-driving work',
    ],
    solution: [
      'AI auto-enriches your CRM with fresh, reliable data - automatically sourced and pulled from your internal systems and trusted external platforms',
      'No manual work. No outdated info. Just clean, ready-to-use insights',
      'Your team stays focused on what matters: driving revenue, not fixing data',
    ],
    shortText: 'See how automation keeps your CRM clean.',
    testimonial:
      '“Before Korefocus, we lost valuable insights every day—internal intel from meetings that never made it into the CRM due to time constraints and system limitations. I spent nearly an hour daily trying to structure notes and delegate CRM entry, but much of the nuance got lost, and the CRM couldn’t handle unstructured data or updates from external sources.” – Alex P.',
    tagline: 'CRM, solved.',
  },
  {
    title: 'Agile automation for decisive action',
    problem: [
      'Chasing follow-ups, syncing with teammates, and managing to-dos is mind-numbing and time-sucking',
      'These repetitive tasks fundamentally drain your focus and stall real progress',
    ],
    solution: [
      'AI drafts your content and takes action - like chasing follow-ups or sending updates',
      'Emails, memos, and decks? All of this is now pre-filled, formatted, and fast',
      'In the end, you get work flows without the manual grind, so that you focus on outcomes, not tasks',
    ],
    shortText: 'Watch automation speed up your work.',
    testimonial: '“Our team works faster than ever.” – Jamie L.',
    tagline: 'Focus on outcomes.',
  },
  {
    title: 'Decisions in motion, not in slides',
    problem: [
      'Insights buried in scattered reports, clunky tools, and slow, error-prone analysis steal your time.',
      'Taking action should be easier, but it’s not. And decisions always get delayed',
    ],
    solution: [
      'AI automates the hard parts - collecting, analyzing, and structuring your data behind the scenes',
      'It delivers polished dashboards, pre-filled decks, and smart assistants (all tailored to your needs) to guide your decisions',
      'What used to take hours now happens in seconds. Just insight, action, and results',
    ],
    shortText: 'Move from slides to real-time insight.',
    testimonial: '“We decide faster, with confidence.” – Morgan K.',
    tagline: 'Act on insight.',
  },
];

export default function HomeHighlights() {
  return (
    <section
      id="highlights"
      className="container mx-auto snap-y snap-mandatory space-y-4 overflow-y-auto px-4 py-12"
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            'grid items-center gap-12 md:grid-cols-12',
            i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''
          )}
          style={{ minHeight: 'calc(100vh - 96px)' }}
        >
          {/* Left column */}
          <div className="flex flex-col space-y-6 md:col-span-5">
            <h3 className="pb-8 text-2xl font-bold md:text-3xl">
              {item.title}
            </h3>
            <p className="prose prose-xl bg-primary rounded-lg p-8 font-semibold text-white">
              We now have a dynamic, enriched and structured view of our
              collective company knowledge, without any manual input
            </p>
            <div className="space-y-2 pb-4">
              <ul className="space-y-2 pl-6">
                {item.problem.map((line) => (
                  <li className="-ml-1" key={line}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <ul className="space-y-2 pl-6">
                {item.solution.map((line) => (
                  <li className="-ml-1" key={line}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-center justify-center px-4 md:col-span-7">
            <p className="text-center text-lg font-semibold">
              {item.shortText}
            </p>
            <div className="relative my-6 aspect-video w-full overflow-hidden rounded-xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/kf-ai-connecting-people.mp4" type="video/mp4" />
                <source src="/kf-ai-connecting-people.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <blockquote className="text-center text-base text-gray-600 italic">
              {item.testimonial}
            </blockquote>
            <p className="text-accent font-semibold">{item.tagline}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
