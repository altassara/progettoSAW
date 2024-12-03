import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import connectDB from "~/server/utils/db";
import { UserModel } from "~/server/models/user";

connectDB();

export default NuxtAuthHandler({
    // a) Never hardcode your secret in your code!! and b) use a secure secret, `test-123` is **not** secure!!
    secret: process.env.AUTH_SECRET ?? "test-123",
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID ?? "Ov23lirYC0j1hMipL7IF",
            clientSecret:
                process.env.GITHUB_CLIENT_SECRET ??
                "400a05950fb3ad33fac5d57c4892749b8dc10ffa",
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "(hint: a@b.com)",
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "(hint: hunter2)",
                },
            },
            async authorize(credentials: any) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
                const user = await UserModel.findOne({
                    email: credentials.email,
                });

                if (
                    user &&
                    credentials?.email === user.email &&
                    credentials?.password === user.password
                ) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                }

                console.error(
                    "Warning: Malicious login attempt registered, bad credentials provided",
                );

                // If you return null then an error will be displayed advising the user to check their details.
                return null;

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            },
        }),
    ],
    pages: {
        signIn: "/login", // Percorso alla tua pagina personalizzata di login
    },
      callbacks: {
        async signIn({ user, account, profile }) {
          if (account?.provider === 'github') {
            const existingUser = await UserModel.findOne({ email: user.email });
      
            if (!existingUser) {
              // Creazione di un nuovo utente nel DB
              const newUser = new UserModel({
                email: user.email,
                name: user.name ?? profile?.name,
                verified: true,
              });
              await newUser.save();
            }
          }
          return true;
        },
        async redirect({ url, baseUrl }) {
            // Controlla se l'url richiesto è valido e non causa un ciclo
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return baseUrl;
        },
    },
});
