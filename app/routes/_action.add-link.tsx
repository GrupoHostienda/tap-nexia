import { getToken } from "@/services";
import { validateUrl } from "@/utils/helpers";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";

/******************** action ********************/
/************* used "/in styles" *************/
export const action = async ({ request }: ActionFunctionArgs) => {
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }

  const formData = await request.formData();
  //const socialType = formData.get("social-type") as string; //select
  const socialLink = formData.get("social-link") as string; //input

  const data = Object.fromEntries(formData);
  const socialLinks = Object.keys(data)
    .filter((key) => key.startsWith("social-links-"))
    .map((key) => {
      const value = data[key];
      if (typeof value !== "string") {
        throw new Error(`Expected value for ${key} to be a string`);
      }
      return JSON.parse(value);
    });
  const filteredSocialLinks = socialLinks.filter((link) => link.url !== "");

  if (socialLink !== "") {
    for (const link of filteredSocialLinks) {
      if (!validateUrl(link.url)) {
        return json({ error: `Invalid URL in ${link.type}: ${link.url}` });
      }
    }
  }

  const urlSocials = `${process.env.API_BASE}/user/social-media/store`;

  /* ******************************************* MEJORAR MANEJO DE ERRORES ********************************************/
  try {
    const response = await fetch(urlSocials, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ social_media: filteredSocialLinks }),
    });

    if (!response.ok) {
      console.log(response);
      return json({ error: "Failed to save data " });
    }

    return json({ message: "succeded at saving data" });
  } catch (error) {
    return json({ error: error?.toString() });
  }
};
