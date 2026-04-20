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
  const t = await getTranslations({ locale, namespace: "hockey" });
  return rootMetadata(locale, "/hockey", { title: t("title"), description: t("heroDescription") });
}

export default async function HockeyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hockey");

  const equipmentReqs = t.raw("equipmentReqs") as string[];
  const skatesPoints = t.raw("skatesPoints") as string[];
  const glovesPoints = t.raw("glovesPoints") as string[];
  const helmetSteps = t.raw("helmetSteps") as string[];
  const stickPoints = t.raw("stickPoints") as string[];
  const additionalItems = t.raw("additionalItems") as string[];
  const facts = t.raw("facts") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("heroDescription")}
        image="/images/hero-bg.jpg"
        size="md"
        objectPosition="center 35%"
      />

      {/* ── RULES ─────────────────────────────────────────────────────── */}
      <section id="rules" className="mx-auto max-w-container px-6 py-20">
        <Reveal>
          <div className="space-y-6 max-w-3xl">
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-vojvodina-red">
              {t("rulesEyebrow")}
            </p>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-surface-50">
              {t("rulesTitle")}
            </h2>
            <div className="rounded-xl border border-surface-700 bg-surface-900/30 px-8 py-10 text-center text-surface-400 text-sm tracking-wide">
              {t("rulesPlaceholder")}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── EQUIPMENT ─────────────────────────────────────────────────── */}
      <section id="equipment" className="border-t border-surface-700/60 py-20">
        <div className="mx-auto max-w-container px-6">
          <Reveal>
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-vojvodina-red mb-4">
              {t("equipmentEyebrow")}
            </p>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-surface-50 mb-12">
              {t("equipmentTitle")}
            </h2>
          </Reveal>

          {/* Two-column: image placeholder left, content right */}
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">
            {/* Sticky image placeholder */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl border-2 border-dashed border-surface-600 bg-surface-800/30 flex flex-col items-center justify-center gap-4 text-surface-500 aspect-[3/4]">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="font-heading text-xs uppercase tracking-[0.2em] text-center px-4">
                  {t("equipmentImageAlt")}
                </span>
              </div>
            </div>

            {/* Equipment content */}
            <div className="space-y-10">
              {/* Requirements */}
              <div className="rounded-xl border border-vojvodina-red/20 bg-vojvodina-red/5 px-6 py-6 space-y-3">
                <p className="font-heading text-sm uppercase tracking-[0.15em] text-vojvodina-red">
                  {t("equipmentReqsTitle")}
                </p>
                <ul className="space-y-2">
                  {equipmentReqs.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-surface-100">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vojvodina-red" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="pt-2 text-sm text-surface-300">{t("equipmentBasicIntro")}</p>
              </div>

              {/* Skates */}
              <EquipmentItem number={1} title={t("skatesTitle")}>
                <BulletList items={skatesPoints} />
              </EquipmentItem>

              {/* Gloves */}
              <EquipmentItem number={2} title={t("glovesTitle")}>
                <p className="text-sm leading-relaxed text-surface-200 mb-3">{t("glovesBody1")}</p>
                <p className="text-sm leading-relaxed text-surface-200 mb-4">{t("glovesBody2")}</p>
                <BulletList items={glovesPoints} />
              </EquipmentItem>

              {/* Helmet */}
              <EquipmentItem number={3} title={t("helmetTitle")}>
                <p className="text-sm leading-relaxed text-surface-200 mb-4">{t("helmetBody")}</p>
                <ol className="space-y-2 list-none">
                  {helmetSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-surface-100">
                      <span className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-vojvodina-red/20 text-vojvodina-red font-heading text-xs">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </EquipmentItem>

              {/* Stick */}
              <EquipmentItem number={4} title={t("stickTitle")}>
                <p className="text-sm leading-relaxed text-surface-200 mb-4">{t("stickBody")}</p>
                <BulletList items={stickPoints} />
              </EquipmentItem>

              {/* Puck */}
              <EquipmentItem number={5} title={t("puckTitle")}>
                <p className="text-sm leading-relaxed text-surface-200">{t("puckBody")}</p>
              </EquipmentItem>

              {/* Additional */}
              <div className="rounded-xl border border-surface-700 bg-surface-900/20 px-6 py-6 space-y-4">
                <h3 className="font-display text-2xl uppercase text-surface-50">
                  {t("additionalTitle")}
                </h3>
                <p className="text-sm text-surface-300">{t("additionalIntro")}</p>
                <ul className="space-y-2">
                  {additionalItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-surface-100">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vojvodina-red/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="pt-2 border-t border-surface-700/60 text-sm italic text-surface-300">
                  {t("additionalClosing")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERESTING FACTS ─────────────────────────────────────────── */}
      <section id="facts" className="border-t border-surface-700/60 py-20">
        <div className="mx-auto max-w-container px-6 space-y-10">
          <Reveal>
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-vojvodina-red mb-4">
              {t("factsEyebrow")}
            </p>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-surface-50">
              {t("factsTitle")}
            </h2>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {facts.map((fact, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-surface-700 bg-surface-900/30 px-6 py-5 flex gap-4 hover:bg-surface-800/40 transition-colors"
                >
                  <span className="shrink-0 font-display text-4xl leading-none text-vojvodina-red/30 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-surface-200">{fact}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function EquipmentItem({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-surface-700 bg-surface-900/20 overflow-hidden">
      <div className="flex items-center gap-4 px-6 py-4 bg-vojvodina-dark border-b border-surface-700">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-vojvodina-red font-display text-sm text-vojvodina-light shrink-0">
          {number}
        </span>
        <h3 className="font-display text-xl uppercase text-surface-50">{title}</h3>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-surface-100">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vojvodina-red" />
          {item}
        </li>
      ))}
    </ul>
  );
}
