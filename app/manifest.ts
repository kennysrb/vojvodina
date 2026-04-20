import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vojvodina HC",
    short_name: "Vojvodina",
    description: "Vojvodina hockey club — Vojvodina HC",
    start_url: "/",
    display: "standalone",
    background_color: "#373435",
    theme_color: "#ed3237",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
