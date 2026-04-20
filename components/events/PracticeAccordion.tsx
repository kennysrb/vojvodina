"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { pickLocale } from "@/lib/sanity/types";
import type { Locale } from "@/i18n/routing";
import type { PracticeRow } from "./PracticeTable";

const AGE_GROUP_ORDER = ["hockey-school", "u8", "u10", "u12", "u14", "juniors", "seniors"] as const;
type AgeGroup = (typeof AGE_GROUP_ORDER)[number];

const JS_DAY_TO_KEY: Record<number, string> = {
  0: "sun", 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri", 6: "sat",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 text-surface-400 transition-transform duration-300 ease-in-out", open && "rotate-180")}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-0.5 text-vojvodina-red"
    >
      <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7.5 6.5v4M7.5 4.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function PracticeAccordion({ rows, locale }: { rows: PracticeRow[]; locale: Locale }) {
  const t = useTranslations("events");
  const [openGroup, setOpenGroup] = useState<AgeGroup | null>("hockey-school");
  const todayKey = JS_DAY_TO_KEY[new Date().getDay()];

  const grouped = AGE_GROUP_ORDER.reduce((acc, g) => {
    acc[g] = rows.filter((r) => r.ageGroup === g);
    return acc;
  }, {} as Record<AgeGroup, PracticeRow[]>);

  return (
    <div className="rounded-xl border border-surface-700 overflow-hidden divide-y divide-surface-700">
      {AGE_GROUP_ORDER.map((group) => {
        const sessions = grouped[group];
        if (!sessions.length) return null;
        const isOpen = openGroup === group;
        const noteText = sessions
          .map((r) => (r.notes ? pickLocale(r.notes, locale) : ""))
          .find((n) => n.length > 0) ?? null;

        return (
          <div key={group}>
            <button
              type="button"
              onClick={() => setOpenGroup(isOpen ? null : group)}
              className="w-full flex items-center justify-between px-5 py-4 bg-surface-800/40 hover:bg-surface-800/80 transition-colors duration-150 cursor-pointer"
            >
              <span className="font-heading text-sm uppercase tracking-[0.2em] text-vojvodina-red">
                {t(`ageGroups.${group}`)}
              </span>
              <ChevronIcon open={isOpen} />
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="overflow-x-auto border-t border-surface-700/60">
                  <table className="min-w-full divide-y divide-surface-700/60">
                    <thead className="bg-surface-800/60">
                      <tr>
                        <th className="px-5 py-3 text-left font-heading text-xs uppercase tracking-[0.2em] text-vojvodina-red">
                          {t("table.day")}
                        </th>
                        <th className="px-5 py-3 text-left font-heading text-xs uppercase tracking-[0.2em] text-vojvodina-red">
                          {t("table.time")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-700/40">
                      {sessions.map((r) => {
                        const isToday = r.dayOfWeek === todayKey;
                        return (
                          <tr key={r._id} className={isToday ? "bg-vojvodina-red/10" : ""}>
                            <td className="px-5 py-3.5 font-heading uppercase tracking-widest text-sm text-surface-50">
                              {t(`days.${r.dayOfWeek}`)}
                              {isToday && (
                                <span className="ml-2 rounded-full bg-vojvodina-red text-vojvodina-light px-2 py-0.5 text-[10px] uppercase tracking-widest">
                                  {t("today")}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 text-surface-50 tabular-nums">
                              {r.startTime} – {r.endTime}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {noteText && (
                  <div className="px-5 py-3 border-t border-surface-700/60 bg-vojvodina-red/5 flex items-start gap-2.5">
                    <InfoIcon />
                    <p className="text-sm text-surface-100">{noteText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
