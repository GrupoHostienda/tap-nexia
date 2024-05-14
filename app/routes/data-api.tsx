import { useLoaderData, useFetcher } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { sessionStorage } from "@/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const urlParams = new URL(request.url).searchParams;
  const type = urlParams.get("type") || "links"; // default a "links" si no se especifica

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const authToken = session.get("authToken");

  const url = `${process.env.API_BASE}/${type}`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return json(data);
  } catch (error) {
    return json({ error: error?.toString() });
  }
};

function ApiData() {
  const data = useLoaderData();
  const fetcher = useFetcher();

  //console.log(data);
  //console.log(fetcher);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.load(`/data-api?type=${e.target.value}`);
  };

  return (
    <div className=" p-4 max-w-[700px] border-2 m-2 rounded-md">
      <h1 className=" border-b-2 mb-4 uppercase font-bold text-center">
        API data
      </h1>
      <select
        className=" bg-gray-300 px-4 py-1 rounded-md"
        defaultValue="links"
        onChange={handleChange}
      >
        <option value="backgrounds">Backgrounds</option>
        <option value="links">Links</option>
        <option value="user">User</option>
        <option value="user/links">User Links</option>
        <option value="user/update">User Update</option>
      </select>
      <pre>{JSON.stringify(fetcher.data || data, null, 2)}</pre>
    </div>
  );
}

export default ApiData;
