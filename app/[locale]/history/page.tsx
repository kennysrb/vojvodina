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
  const base = rootMetadata(locale, "/history");
  const t = await getTranslations({ locale, namespace: "history" });
  return { ...base, title: t("title"), description: t("heroDescription") };
}

const TROPHIES = [
  {
    category: { en: "National Championships", sr: "Nacionalna takmičenja" },
    total: 8,
    rows: [
      { competition: { en: "Championship of SR Yugoslavia", sr: "Prvenstvo SR Jugoslavije" }, count: 6, years: [1998, 1999, 2000, 2001, 2002, 2003] },
      { competition: { en: "Championship of Serbia & Montenegro", sr: "Prvenstvo Srbije i Crne Gore" }, count: 1, years: [2004] },
      { competition: { en: "Championship of Serbia", sr: "Prvenstvo Srbije" }, count: 1, years: [2022] },
    ],
  },
  {
    category: { en: "Regional Competitions", sr: "Regionalna takmičenja" },
    total: 1,
    rows: [
      { competition: { en: "Pannonian League", sr: "Panonska liga" }, count: 1, years: [2009] },
    ],
  },
];

const MILESTONES = [
  { value: "1957", label: { en: "Founded", sr: "Osnovani" } },
  { value: "9×", label: { en: "National champions", sr: "Prvaci države" } },
  { value: "2022", label: { en: "Last title", sr: "Poslednja titula" } },
];

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("history");
  const l = locale as "en" | "sr";

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("heroDescription")} image="/images/hero-bg-history.png" size="lg" objectPosition="center 70%" />

      {/* Milestone strip */}
      <div className="border-b border-surface-700/60 bg-surface-800/40">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-3 divide-x divide-surface-700/60">
            {MILESTONES.map((m) => (
              <div key={m.value} className="py-8 px-6 flex flex-col items-center gap-1">
                <span className="font-display text-4xl md:text-5xl text-vojvodina-red">{m.value}</span>
                <span className="font-heading text-xs uppercase tracking-[0.2em] text-surface-300">{m.label[l]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-container px-6 py-20 space-y-24">

        {/* Prose */}
        <Reveal>
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-surface-50 font-medium border-l-2 border-vojvodina-red pl-6">
              {t("p1")}
            </p>
            <p className="text-base leading-relaxed text-surface-200 pl-6">{t("p2")}</p>
            <p className="text-base leading-relaxed text-surface-200 pl-6">{t("p3")}</p>
            <div className="ml-6 rounded-xl border border-vojvodina-red/30 bg-vojvodina-red/5 px-6 py-5">
              <p className="text-base leading-relaxed text-surface-100">{t("p4")}</p>
            </div>
          </div>
        </Reveal>

        {/* Trophies */}
        <Reveal>
          <div className="space-y-6">
            <div className="flex items-end gap-4">
              <h2 className="font-display text-5xl md:text-6xl uppercase text-surface-50">{t("trophiesTitle")}</h2>
              <span className="mb-1.5 font-heading text-sm uppercase tracking-[0.2em] text-surface-300">
                {locale === "sr" ? "9 ukupno" : "9 total"}
              </span>
            </div>

            <div className="rounded-xl border border-surface-700 overflow-hidden divide-y divide-surface-700">
              {TROPHIES.map((group) => (
                <div key={group.category.en}>
                  {/* Category header */}
                  <div className="grid grid-cols-[1fr_80px_1fr] items-center bg-vojvodina-dark px-6 py-4 gap-4">
                    <span className="font-heading text-xs uppercase tracking-[0.25em] text-vojvodina-light/80">
                      {group.category[l]}
                    </span>
                    <span className="flex items-center justify-center">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-vojvodina-red text-vojvodina-light font-display text-lg">
                        {group.total}
                      </span>
                    </span>
                    <span />
                  </div>

                  {/* Competition rows */}
                  <div className="divide-y divide-surface-700/50">
                    {group.rows.map((row) => (
                      <div
                        key={row.competition.en}
                        className="grid grid-cols-[1fr_80px_1fr] items-center px-6 py-4 gap-4 bg-surface-900/30 hover:bg-surface-800/50 transition-colors"
                      >
                        <span className="pl-4 text-sm text-surface-100 border-l border-vojvodina-red/30">
                          {row.competition[l]}
                        </span>
                        <span className="text-center font-heading text-base text-vojvodina-red">
                          {row.count}×
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {row.years.map((y) => (
                            <span
                              key={y}
                              className="inline-block rounded-md bg-vojvodina-red/15 text-vojvodina-red px-2.5 py-1 text-xs font-heading tracking-wider"
                            >
                              {y}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </>
  );
}
