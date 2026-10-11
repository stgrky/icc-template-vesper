import { Reveal } from "@/components/motion/Reveal";

type ClassType = { name: string; intensity?: number };
type Slot = {
  day: string;
  time: string;
  className: string;
  duration?: string;
  spaces?: string;
};

type Props = {
  heading?: string;
  intro?: string;
  note?: string;
  schedule: Slot[];
  classTypes?: ClassType[];
};

/**
 * The weekly schedule — Vesper's signature section.
 *
 * A yoga site answers three questions: what is it, when can I come, and what
 * does it cost. The middle one has no equivalent in any other template in the
 * rolodex, because a therapy practice books by appointment. Building it
 * properly is what makes this a different layout rather than a recolour.
 *
 * Grouped by day rather than listed by time. A visitor does not scan for
 * "7pm", they scan for "can I make Tuesday" — the day is the thing they are
 * matching against their own week, so the day is the unit.
 *
 * Intensity is drawn as filled candles rather than printed as a number. On a
 * dark ground lit by one warm source, reusing that light as the measure of
 * effort is the one place the metaphor earns its keep. `aria-label` carries
 * the same fact in words, so nothing depends on seeing it.
 */
export function WeeklySchedule({ heading, intro, note, schedule, classTypes = [] }: Props) {
  // Preserve the order days appear in the data rather than imposing a
  // Monday-first week: a teacher who only runs Thursday and Sunday should get
  // two columns in that order, not a grid with five empty ones.
  const days: string[] = [];
  for (const slot of schedule) {
    if (!days.includes(slot.day)) days.push(slot.day);
  }

  const intensityOf = (name: string) =>
    classTypes.find((c) => c.name === name)?.intensity ?? 0;

  return (
    <section className="border-t border-[var(--color-subtle)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          {heading ? (
            <Reveal>
              <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--color-foreground)] md:text-5xl">
                {heading}
              </h2>
            </Reveal>
          ) : null}
          {intro ? (
            <Reveal delay={0.08}>
              <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-muted)]">
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div
          className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[var(--color-subtle)] sm:grid-cols-2 lg:grid-cols-5"
          // The gap-px over a subtle background draws every divider in one
          // pass, so columns of unequal length still read as one table.
        >
          {days.map((day, dayIndex) => {
            const slots = schedule.filter((s) => s.day === day);
            return (
              <Reveal key={day} delay={0.04 * dayIndex} className="h-full">
                <div className="flex h-full flex-col bg-[var(--color-background)] p-6">
                  <h3 className="font-serif text-xl font-normal tracking-wide text-[var(--color-foreground)]">
                    {day}
                  </h3>
                  <ul className="mt-5 flex flex-1 flex-col gap-6">
                    {slots.map((slot) => {
                      const level = intensityOf(slot.className);
                      return (
                        <li key={`${slot.day}-${slot.time}`}>
                          <p className="font-serif text-2xl font-light text-[var(--color-accent)] [font-variant-numeric:tabular-nums]">
                            {slot.time}
                          </p>
                          <p className="mt-1.5 text-[15px] font-medium text-[var(--color-foreground)]">
                            {slot.className}
                          </p>
                          <p className="mt-0.5 text-[13px] text-[var(--color-muted)]">
                            {[slot.duration, slot.spaces].filter(Boolean).join(" · ")}
                          </p>
                          {level > 0 ? (
                            <span
                              className="mt-2.5 flex gap-1"
                              aria-label={`Intensity ${level} of 3`}
                            >
                              {[1, 2, 3].map((n) => (
                                <span
                                  key={n}
                                  aria-hidden
                                  className={`h-1 w-5 rounded-full ${
                                    n <= level
                                      ? "bg-[var(--color-accent)]"
                                      : "bg-[var(--color-subtle)]"
                                  }`}
                                />
                              ))}
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {note ? (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[var(--color-muted)]">
              {note}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
