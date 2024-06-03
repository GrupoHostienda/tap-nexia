import { redirect } from "@remix-run/node";
import { sessionStorage } from "@/utils/session.server";

//si no estoy autenticado me redirecciona a /login
export const getTokenIfConnected = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  if (!authToken) {
    return redirect("/login");
  }

  return authToken;
};
