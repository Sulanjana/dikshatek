export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/","/product", "/productVariant", "/productCategory"],
};
