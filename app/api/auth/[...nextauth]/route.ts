import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        // 1. Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // 2. Credentials Provider (Admin logic)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const ADMIN_EMAIL = process.env.ADMIN_EMAIL
                const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

                if (
                    credentials?.email === ADMIN_EMAIL &&
                    credentials?.password === ADMIN_PASSWORD
                ) {
                    return { id: "1", name: "Admin Malik", email: ADMIN_EMAIL, role: "admin" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.role = (user as any).role || "user";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };