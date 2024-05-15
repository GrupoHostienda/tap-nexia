//import React from "react";
import BackOfficeMenu from "@/components/BackOffice/BackOfficeMenu";
import CardBackOffice, { Card } from "@/components/BackOffice/CardBackOffice";
import PreviewBackOffice from "@/components/BackOffice/PreviewBackOffice";
import Pricing from "@/components/Pricing/Pricing";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { sessionStorage } from "@/utils/session.server";

//import { GlobalStateProvider } from "@/components/Context/GlobalContext";
import data from "data.json";
import { useEffect, useState } from "react";

export function meta() {
  return [
    {
      title: "Back Office - Page",
    },
    {
      name: "description",
      content: "Back Office - Page",
    },
  ];
}

type OutletContextProps = {
  state: { items: [] };
  dispatch: React.Dispatch<React.SetStateAction<{}>>;
}

// const [linkList, setLinkList] = useState([])

export const loader = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");
  
  const links = await fetch(`${process.env.API_BASE}/user/links`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    }
  });
  
  if (!authToken) {
    return redirect("/login");
  }
  try {
    
    if (!links.ok) {
      throw new Error("Failed to fetch data");
    }
    const response = await links.json()
    
    return json({ links: response});
  } catch (error) {
    return json({ error: error?.toString() });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");
  console.log(authToken)
  console.log(title)
  //campos no vacios
  if (title.trim() === "" || link.trim() === "") {
    return json({ error: "All fields are required." });
  }
  try{
  const response = await fetch(`${process.env.API_BASE}/user/addLink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      link_type_id: 1,
      title: title,
      url: link,
      style: []
    }),
  });
  if (!response) {
    throw new Error("Failed to fetch data");
  }
  console.log(response.status)
  const data = await response.json();
  console.log(data)
  return json({ data });
  } catch (error) {
    return json({ error: error?.toString() });
  }
  // return null
};


type DataType = {
  links: [{ tittle: string; link: string; id: number; isHidden: number }];
};
export default function LayoutBackOffice() {
  const { state, dispatch } =
  useOutletContext<OutletContextProps>();
  const data = useLoaderData<DataType>()
  const {links} = data
  console.log(links)

  // const addValue = (links:any) => {
  //   links.map(link => {
  //     const newItem: Item = {
  //       id: link.id,
  //       title: link.tittle,
  //       url: link.link,
  //     };
  //     dispatch({type: 'addItem', payload: newItem});

  //   })};
  //   useEffect(()=>addValue(links));
  //   console.log("Estos son los items: "+state.items);
 
  return (
    <>
    
      <div className="absolute top-0 w-full lg:h-[100%] bg-slate-200 left-0 grid lg:grid-cols-[60%_30%] grid-cols-1 lg:gap-10 gap-2 overflow-hidden">
        <div className="w-full h-screen pt-7 px-7 flex flex-col gap-2">
          <BackOfficeMenu />
          
          <div></div>
          <div className="flex flex-col gap-4 p-3 overflow-y-scroll h-screen hidden-scrollbar">
            {links.map((link, index) => {
              
              return (
                <div key={index}>
                  <CardBackOffice link={link} />
                </div>
              );
            })}
          </div>
        </div>
        {/* Preview de elementos */}
        <div className="w-full h-screen flex items-center justify-center">
          <PreviewBackOffice data={links} />
        </div>
      </div>
    </>
  );
}
