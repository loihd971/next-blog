import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import User from "@/models/User";
import dbConnect from "@/services/mongo";
import { toast } from "react-toastify";
import { OAuthConfig } from "next-auth/providers";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../utils/mongodb";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ] as (OAuthConfig<GoogleProfile> | OAuthConfig<GithubProfile>)[],

  callbacks: {
    async signIn({ account, profile }: any) {
      dbConnect();
      if (account.provider === "google") {
        const { name, picture, email, provider } = profile;

        const body = {
          ...User.collection,
          name,
          email,
          avatar: picture,
          follower: [],
          roles: 1,
          fromGoogle: true,
        };

        try {
          const isExistUser = await User.find({ provider, email, name });
          if (isExistUser.length > 0) {
          } else {
            await User.create(body);
            toast.success(JSON.stringify("Login successfully"));
          }
        } catch (error) {
          toast.error(JSON.stringify(error));
        }
      }
      return true;
    },
    async session({ session, token, user }: any) {
      dbConnect();

      try {
        const isExistUser = await User.find({ email: session.user.email });

        if (isExistUser) {
          session.user.role = isExistUser[0].role;
          session.user.id = isExistUser[0]._id;
        }
      } catch (error: any) {
        toast.error(error);
      }
      session.accessToken = token.accessToken;

      return session;
    },
  },
};
export default NextAuth(authOptions);
