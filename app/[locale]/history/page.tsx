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
    category: { en: "National Championships", sr: "Nacionalna Takmičenja" },
    total: 8,
    rows: [
      { competition: { en: "Championship of SR Yugoslavia", sr: "Prvenstvo SR Jugoslavije" }, count: 6, years: [1998, 1999, 2000, 2001, 2002, 2003] },
      { competition: { en: "Championship of Serbia & Montenegro", sr: "Prvenstvo Srbije i Crne Gore" }, count: 1, years: [2004] },
      { competition: { en: "Championship of Serbia", sr: "Prvenstvo Srbije" }, count: 1, years: [2022] },
    ],
  },
  {
    category: { en: "Regional Competitions", sr: "Regionalna Takmičenja" },
    total: 1,
    rows: [
      { competition: { en: "Pannonian League", sr: "Panonska Liga" }, count: 1, years: [2009] },
    ],
  },
];

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("history");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("heroDescription")} />

      <div className="mx-auto max-w-container px-6 py-20 space-y-20">

        {/* Prose */}
        <Reveal>
          <div className="grid md:grid-cols-[1fr_2px_1fr] gap-10 md:gap-16">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-surface-100 font-medium">{t("p1")}</p>
              <p className="leading-relaxed text-surface-200">{t("p2")}</p>
            </div>
            <div className="hidden md:block bg-surface-700/50 rounded-full" />
            <div className="space-y-6">
              <p className="leading-relaxed text-surface-200">{t("p3")}</p>
              <div className="rounded-xl border border-vojvodina-red/30 bg-vojvodina-red/5 px-5 py-4">
                <p className="leading-relaxed text-surface-100">{t("p4")}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Trophies */}
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl uppercase text-surface-50 mb-8">
            {t("trophiesTitle")}
          </h2>
          <div className="rounded-xl border border-surface-700 overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-surface-800 border-b border-surface-700">
                  <th className="px-6 py-3 text-left font-heading text-xs uppercase tracking-[0.2em] text-vojvodina-red">
                    {locale === "sr" ? "Takmičenje" : "Competition"}
                  </th>
                  <th className="px-6 py-3 text-center font-heading text-xs uppercase tracking-[0.2em] text-vojvodina-red w-24">
                    {locale === "sr" ? "Titule" : "Titles"}
                  </th>
                  <th className="px-6 py-3 text-left font-heading text-xs uppercase tracking-[0.2em] text-vojvodina-red">
                    {locale === "sr" ? "Godina" : "Year(s)"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {TROPHIES.map((group) => (
                  <>
                    {/* Category row */}
                    <tr key={group.category.en} className="bg-surface-800/60 border-t border-surface-700">
                      <td className="px-6 py-3 font-heading text-sm uppercase tracking-[0.15em] text-surface-50" colSpan={1}>
                        {group.category[locale as "en" | "sr"]}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-vojvodina-red text-vojvodina-light font-heading text-sm font-bold">
                          {group.total}
                        </span>
                      </td>
                      <td className="px-6 py-3" />
                    </tr>
                    {/* Competition rows */}
                    {group.rows.map((row) => (
                      <tr key={row.competition.en} className="border-t border-surface-700/50 hover:bg-surface-800/30 transition-colors">
                        <td className="px-6 py-4 pl-10 text-surface-100 text-sm">
                          {row.competition[locale as "en" | "sr"]}
                        </td>
                        <td className="px-6 py-4 text-center text-surface-50 font-heading text-sm">
                          {row.count}×
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {row.years.map((y) => (
                              <span
                                key={y}
                                className="inline-block rounded-full bg-vojvodina-red/10 border border-vojvodina-red/20 text-vojvodina-red px-2.5 py-0.5 text-xs font-heading tracking-wider"
                              >
                                {y}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

      </div>
    </>
  );
}
