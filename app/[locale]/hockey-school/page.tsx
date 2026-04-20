import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { rootMetadata } from "@/lib/seo/metadata";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = rootMetadata(locale, "/hockey-school");
  const t = await getTranslations({ locale, namespace: "school" });
  return { ...base, title: t("title"), description: t("heroDescription") };
}

const BENEFIT_ICONS: Record<string, React.ReactNode> = {
  motor: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v5l3 3" />
      <path d="M6.5 10.5C5 12 4 14 4 16a8 8 0 0 0 16 0c0-2-.9-4-2.5-5.5" />
    </svg>
  ),
  social: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  discipline: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  success: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  confidence: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};

export default async function HockeySchoolPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("school");

  const benefits = t.raw("benefits") as { icon: string; text: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("heroDescription")}
        image="/images/hero-bg.jpg"
        size="lg"
        objectPosition="center 40%"
      />

      <div className="mx-auto max-w-container px-6 py-20 space-y-24">
        {/* Intro prose */}
        <Reveal>
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-surface-50 font-medium border-l-2 border-vojvodina-red pl-6">
              {t("intro1")}
            </p>
            <p className="text-base leading-relaxed text-surface-200 pl-6">
              {t("intro2")}
            </p>
            <p className="text-base leading-relaxed text-surface-200 pl-6">
              {t("intro3")}
            </p>
          </div>
        </Reveal>

        {/* Benefits */}
        <Reveal>
          <div className="space-y-8">
            <h2 className="font-display text-5xl md:text-6xl uppercase text-surface-50">
              {t("benefitsTitle")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.icon}
                  className="flex items-start gap-4 rounded-xl border border-surface-700 bg-surface-900/30 px-6 py-5 hover:bg-surface-800/40 transition-colors"
                >
                  <span className="shrink-0 text-vojvodina-red mt-0.5">
                    {BENEFIT_ICONS[b.icon]}
                  </span>
                  <span className="text-sm leading-relaxed text-surface-100">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA callout */}
        <Reveal>
          <div className="max-w-3xl mx-auto rounded-xl border border-vojvodina-red/30 bg-vojvodina-red/5 px-8 py-10 space-y-4">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-vojvodina-red">
              {t("ctaTitle")}
            </h2>
            <p className="text-base leading-relaxed text-surface-100">
              {t("ctaText")}
            </p>
            <a
              href="/events#rsvp"
              className="inline-block mt-2 rounded-lg bg-vojvodina-red px-6 py-3 font-heading text-sm uppercase tracking-[0.2em] text-vojvodina-light transition-colors hover:bg-vojvodina-red/80"
            >
              {t("ctaButton")}
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
