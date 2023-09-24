export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/add-post", "/discover", "/inbox", "/search", "/", "/setting"],
};
