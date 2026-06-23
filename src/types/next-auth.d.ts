import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: "ADMIN" | "TECHNICIAN" | "CUSTOMER";
      title?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "TECHNICIAN" | "CUSTOMER";
    title?: string;
  }
}
