import { NextAuthOptions } from "next-auth";
import RedditProvider from "next-auth/providers/reddit";

export const authOptions: NextAuthOptions = {
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: "permanent",
        },
      },
    }),
  ],
};
