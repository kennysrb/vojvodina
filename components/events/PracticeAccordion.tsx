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

export default function PracticeAccordion({ rows, locale }: { rows: PracticeRow[]; locale: Locale }) {
  const t = useTranslations("events");
  const [openGroup, setOpenGroup] = useState<AgeGroup | null>("hockey-school");
  const todayKey = JS_DAY_TO_KEY[new Date().getDay()];

  const grouped = AGE_GROUP_ORDER.reduce((acc, g) => {
    acc[g] = rows.filter((r) => r.ageGroup === g);
    return acc;
  }, {} as Record<AgeGroup, PracticeRow[]>);

  return (
    <div className="space-y-2">
      {AGE_GROUP_ORDER.map((group) => {
        const sessions = grouped[group];
        if (!sessions.length) return null;
        const isOpen = openGroup === group;
        const noteText = sessions
          .map((r) => (r.notes ? pickLocale(r.notes, locale) : ""))
          .find((n) => n.length > 0) ?? null;

        return (
          <div key={group} className="rounded-xl border border-surface-700 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenGroup(isOpen ? null : group)}
              className="w-full flex items-center justify-between px-5 py-4 bg-surface-800/50 hover:bg-surface-800 transition-colors cursor-pointer"
            >
              <span className="font-heading text-sm uppercase tracking-[0.2em] text-vojvodina-red">
                {t(`ageGroups.${group}`)}
              </span>
              <span
                className={cn(
                  "inline-block w-0 h-0 border-l-4 border-r-4 border-t-[6px] border-l-transparent border-r-transparent border-t-surface-400 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {isOpen && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-surface-700">
                    <thead className="bg-surface-800">
                      <tr>
                        <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-[0.2em] text-vojvodina-red">
                          {t("table.day")}
                        </th>
                        <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-[0.2em] text-vojvodina-red">
                          {t("table.time")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-700/60">
                      {sessions.map((r) => {
                        const isToday = r.dayOfWeek === todayKey;
                        return (
                          <tr key={r._id} className={isToday ? "bg-vojvodina-red/10" : ""}>
                            <td className="px-4 py-4 font-heading uppercase tracking-widest text-sm text-surface-50">
                              {t(`days.${r.dayOfWeek}`)}
                              {isToday && (
                                <span className="ml-2 rounded-full bg-vojvodina-red text-vojvodina-light px-2 py-0.5 text-[10px] uppercase tracking-widest">
                                  {t("today")}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4 text-surface-50">
                              {r.startTime} – {r.endTime}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {noteText && (
                  <div className="px-5 py-3 border-t border-surface-700/60 bg-vojvodina-red/5 flex items-start gap-2">
                    <span className="text-vojvodina-red text-sm mt-0.5">ℹ</span>
                    <p className="text-sm text-surface-50">{noteText}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
