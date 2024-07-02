import { getToken } from "@/services";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";

/******************** action ********************/
/************* used "/in stylesPage/AddImage" *************/
export const action = async ({ request }: ActionFunctionArgs) => {
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const img = formData.get("cover");

  console.log(img);

  const validImageTypes = ["image/jpeg", "image/png"];
  if (!(img instanceof File) || !validImageTypes.includes(img.type)) {
    return json({
      error: "No file uploaded or incorrect file type (jpg or png only).",
    });
  }
  //console.log(img);
  //console.log(img.name);

  const form = new FormData();
  form.append("cover", img);

  const url = `${process.env.API_BASE}/user/update`;

  /* ******************************************* MEJORAR MANEJO DE ERRORES ********************************************/
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: form,
    });

    if (!response.ok) {
      console.log("error at saving data");
      throw new Error("Failed to save data"); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
    }
    const r = await response.json();

    console.log(r);
    return json({ message: "Succeed at saving data" });
  } catch (error) {
    console.log(error);
    return json({ error: "Failed to save data, try again later." });
  }
};
