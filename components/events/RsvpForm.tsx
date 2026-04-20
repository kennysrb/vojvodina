"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { rsvpSchema } from "@/lib/validation/rsvp";

type Status = "idle" | "sending" | "success" | "error";

export default function RsvpForm() {
  const t = useTranslations("rsvpForm");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setFieldErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      role: String(fd.get("role") ?? "player"),
      age: String(fd.get("age") ?? ""),
      experience: String(fd.get("experience") ?? ""),
      message: String(fd.get("message") ?? ""),
      locale,
    };
    const parsed = rsvpSchema.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(
        Object.fromEntries(
          Object.entries(parsed.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0]])
        )
      );
      setStatus("error");
      return;
    }
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="mt-20 rounded-xl border border-surface-700 bg-surface-800/60 p-8 md:p-12">
      <header className="max-w-xl">
        <h2 className="font-display text-4xl md:text-5xl text-surface-50">{t("title")}</h2>
        <p className="mt-2 text-surface-200">{t("description")}</p>
      </header>
      <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
        <Input label={t("name")} name="name" required error={fieldErrors.name} />
        <Input label={t("email")} name="email" type="email" required error={fieldErrors.email} />
        <Input label={t("phone")} name="phone" type="tel" error={fieldErrors.phone} />
        <Select label={t("role")} name="role" required error={fieldErrors.role} defaultValue="player">
          <option value="player">{t("roles.player")}</option>
          <option value="parent">{t("roles.parent")}</option>
        </Select>
        <Input label={t("age")} name="age" type="number" min={3} max={99} error={fieldErrors.age} />
        <Select label={t("experience")} name="experience" error={fieldErrors.experience} defaultValue="">
          <option value="" disabled>{t("experienceLevels.placeholder")}</option>
          <option value="none">{t("experienceLevels.none")}</option>
          <option value="beginner">{t("experienceLevels.beginner")}</option>
          <option value="intermediate">{t("experienceLevels.intermediate")}</option>
          <option value="advanced">{t("experienceLevels.advanced")}</option>
        </Select>
        <div className="md:col-span-2">
          <Textarea label={t("message")} name="message" rows={4} error={fieldErrors.message} />
        </div>
        <div className="md:col-span-2 flex items-center gap-4">
          <Button type="submit" disabled={status === "sending"}>{t("submit")}</Button>
          {status === "success" && <span className="text-sm text-vojvodina-red">{t("success")}</span>}
          {status === "error" && <span className="text-sm text-red-400">{t("error")}</span>}
        </div>
      </form>
    </section>
  );
}
