import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  console.log("MIDDLEWARE URL:", context.url.toString());
  console.log(
    "x-forwarded-host:",
    context.request.headers.get("x-forwarded-host"),
  );
  console.log(
    "x-forwarded-proto:",
    context.request.headers.get("x-forwarded-proto"),
  );

  const isOAuthRoute =
    context.url.pathname.includes("/github/oauth/") ||
    context.url.pathname.includes("/github/login");

  if (isOAuthRoute) {
    console.log("OAUTH ROUTE DETECTED");
    const forwardedHost = context.request.headers.get("x-forwarded-host");
    const forwardedProto = context.request.headers.get("x-forwarded-proto");

    if (forwardedHost && forwardedProto) {
      const correctUrl = new URL(context.url);
      correctUrl.protocol = forwardedProto + ":";
      correctUrl.host = forwardedHost;

      const newRequest = new Request(correctUrl.toString(), {
        method: context.request.method,
        headers: context.request.headers,
        body: context.request.body,
        // @ts-ignore
        duplex: "half",
      });

      context.request = newRequest;
    }
  }

  return next();
};
