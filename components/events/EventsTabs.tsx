"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/i18n/routing";
import EventCard, { type EventItem } from "./EventCard";
import PracticeAccordion from "./PracticeAccordion";
import type { PracticeRow } from "./PracticeTable";

type Tab = "upcoming" | "schedule" | "past";

export default function EventsTabs({
  upcoming,
  past,
  schedule,
  initialTab = "upcoming",
}: {
  upcoming: EventItem[];
  past: EventItem[];
  schedule: PracticeRow[];
  initialTab?: Tab;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("events");
  const [tab, setTab] = useState<Tab>(initialTab);
  const tabs: Tab[] = ["upcoming", "schedule", "past"];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10 border-b border-surface-700/60">
        {tabs.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={cn(
              "px-5 py-3 font-heading uppercase tracking-[0.2em] text-xs border-b-2 -mb-px transition-colors cursor-pointer",
              tab === k ? "border-vojvodina-red text-vojvodina-red" : "border-transparent text-surface-200 hover:text-surface-50"
            )}
          >
            {t(`tabs.${k}`)}
          </button>
        ))}
      </div>

      {tab === "upcoming" && (
        <div className="grid gap-6">
          {upcoming.length === 0
            ? <p className="text-surface-200 py-12 text-center">{t("empty")}</p>
            : upcoming.map((e, i) => <EventCard key={e._id} item={e} locale={locale} index={i} />)
          }
        </div>
      )}

      {tab === "schedule" && (
        <div className="space-y-8">
          <PracticeAccordion rows={schedule} locale={locale} />
          <div className="rounded-xl border border-vojvodina-red/30 bg-vojvodina-red/5 p-6 flex flex-col sm:flex-row gap-6">
            <div className="flex items-start gap-3 flex-1">
              <span className="mt-0.5 text-vojvodina-red shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 1.5L11.39 6.26L16.5 7.01L12.75 10.64L13.68 15.74L9 13.27L4.32 15.74L5.25 10.64L1.5 7.01L6.61 6.26L9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <p className="font-heading text-sm uppercase tracking-[0.2em] text-vojvodina-red mb-1">{t("newMembers.firstMonthTitle")}</p>
                <p className="text-sm text-surface-50">{t("newMembers.firstMonthDesc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 flex-1">
              <span className="mt-0.5 text-vojvodina-red shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <p className="font-heading text-sm uppercase tracking-[0.2em] text-vojvodina-red mb-1">{t("newMembers.equipmentTitle")}</p>
                <p className="text-sm text-surface-50">{t("newMembers.equipmentDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "past" && (
        <div className="grid gap-6 md:grid-cols-2">
          {past.length === 0
            ? <p className="text-surface-200 py-12 text-center md:col-span-2">{t("empty")}</p>
            : past.map((e, i) => <EventCard key={e._id} item={e} locale={locale} showRsvp={false} index={i} />)
          }
        </div>
      )}
    </>
  );
}
