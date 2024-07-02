import { getToken } from "@/services";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";

/******************** action ********************/
/************* used "/in stylesPage/Backgrounds" *************/
export const action = async ({ request }: ActionFunctionArgs) => {
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const bio = formData.get("bio") as string;
  const backgroundId = formData.get("backgroundId");
  const backgroundStyle = formData.get("backgroundStyle");
  const bgId = Number(backgroundId);

  if (!bgId || !backgroundStyle) {
    console.log("error at saving data");
    throw new Error("Failed to save data"); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
  }

  if (bio.trim() === "") {
    return json({ error: "Field required." });
  }

  const urlBio = `${process.env.API_BASE}/user/home-page/store`;

  /* ******************************************* MEJORAR MANEJO DE ERRORES ********************************************/
  try {
    const responseBio = await fetch(urlBio, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        background_id: bgId,
        bio: bio,
        style: `${backgroundStyle}`,
      }),
    });

    if (!responseBio.ok) {
      console.log("error at saving bio or bg");
      throw new Error("Failed to save data"); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
    }
    await responseBio.json();
    return json({ message: "Succeed at saving data" });
  } catch (error) {
    console.log(error);
    return json({ error: "Failed to save data, try again later." });
  }
};
