export const SITE = {
  website: "https://andibeqiri.github.io/",
  author: "Andi Beqiri",
  profile: "https://andibeqiri.github.io/",
  desc: "Notes and writing by Andi Beqiri.",
  title: "Andi's blog",
  ogImage: "og-default.svg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/andibeqiri/andibeqiri.github.io/edit/main/",
  },
  dynamicOgImage: false,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "UTC", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
