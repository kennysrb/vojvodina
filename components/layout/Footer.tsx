import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const tNav = useTranslations("nav");
  const tF = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-surface-700/60 bg-surface-900">
      <div className="mx-auto max-w-container px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl text-surface-50">
            CONES <span className="text-vojvodina-light">BELGRADE</span>
          </p>
          <p className="mt-3 text-surface-200 text-sm leading-relaxed">
            {tF("tagline")}
          </p>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-vojvodina-red mb-3">
            {tF("quickLinks")}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-vojvodina-red" href="/">
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-vojvodina-red" href="/news">
                {tNav("news")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-vojvodina-red" href="/events">
                {tNav("events")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-vojvodina-red mb-3">
            {tF("contact")}
          </p>
          <p className="text-sm text-surface-200">{tF("address")}</p>
          <p className="mt-2 text-sm text-surface-200">hello@cones.rs</p>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-vojvodina-red mb-3">
            {tF("follow")}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                className="hover:text-vojvodina-red"
                href="https://instagram.com/cones_belgrade011/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="hover:text-vojvodina-red"
                href="hhttps://facebook.com/icehockeybelgrade"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="hover:text-vojvodina-red"
                href="https://youtube.com/@conesbelgrade"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface-700/60 py-4 text-center text-xs text-surface-300">
        © {year} Cones Belgrade. {tF("rights")}
      </div>
    </footer>
  );
}
