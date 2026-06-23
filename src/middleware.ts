import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/invoices/:path*",
    "/expenses/:path*",
    "/jobs/:path*",
    "/customers/:path*",
    "/technicians/:path*",
    "/team/:path*",
    "/reports/:path*",
    "/appointments/:path*",
    "/account/:path*",
  ],
};
