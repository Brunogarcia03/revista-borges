// src/middleware.ts
import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  if (!context.url.pathname.startsWith("/keystatic")) {
    return next();
  }

  const auth = context.request.headers.get("authorization");

  const USER = import.meta.env.KEYSTATIC_USER;
  const PASS = import.meta.env.KEYSTATIC_PASS;

  if (!auth) {
    return new Response("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Keystatic"',
      },
    });
  }

  const [, encoded] = auth.split(" ");
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(":");

  if (user !== USER || pass !== PASS) {
    return new Response("Forbidden", { status: 403 });
  }

  return next();
};
