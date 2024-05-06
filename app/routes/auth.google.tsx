import { authenticator } from "@/utils/auth.server.js";
import { SocialsProvider } from "remix-auth-socials";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    // successRedirect: "/",
    //failureRedirect: "/login",
  });
};
