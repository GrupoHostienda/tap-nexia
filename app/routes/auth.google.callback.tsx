import { authenticator } from "@/utils/auth.server";
import { SocialsProvider } from "remix-auth-socials";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    // successRedirect: "/",
    //failureRedirect: "/login",
  });
};
