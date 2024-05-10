import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { sessionStorage } from "@/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  //campos no vacios
  if (title.trim() === "" || link.trim() === "") {
    return json({ error: "All fields are required." });
  }
  console.log(title, link);
  console.log(authToken);

  const response = await fetch(`${process.env.API_BASE}/user/addLink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      link_type_id: 1,
      title: title,
      url: link,
      style: [],
    }),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    //return json({ error: data.error });
    return json({ error: data });
  }
  return data;
};

function NewLinkMenu() {
  return (
    <div>
      <div className="bg-black opacity-50 w-full h-screen fixed top-0 left-0 z-40"></div>
      <div className="absolute top-10 w-full flex justify-center items-center">
        <Form
          method="POST"
          className="bg-white rounded-3xl p-4 flex flex-col gap-4 w-[30%] z-50"
        >
          <div className="grid grid-cols-[20%_80%]">
            <label
              className="bg-gray-500 rounded-tl-xl rounded-bl-xl p-2"
              htmlFor="title"
            >
              Titulo
            </label>
            <input
              className="p-2 border-b border-gray-500"
              name="title"
              type="text"
              id="title"
            />
          </div>
          <div className="grid grid-cols-[20%_80%]">
            <label
              className="bg-gray-500 rounded-tl-xl rounded-bl-xl p-2"
              htmlFor="link"
            >
              link
            </label>
            <input
              className="p-2 border-b border-gray-500"
              name="link"
              type="text"
              id="link"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-700 text-white text-xl rounded-xl p-2 hover:bg-blue-600"
            >
              Add link
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default NewLinkMenu;
