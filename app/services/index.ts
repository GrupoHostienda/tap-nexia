import { sessionStorage } from "@/utils/session.server";

//si no estoy autenticado me redirecciona a /login
export const getToken = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  return authToken;
};
