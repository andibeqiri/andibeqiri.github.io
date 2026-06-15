import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect }) => {
  return redirect("/og-default.svg", 302);
};
