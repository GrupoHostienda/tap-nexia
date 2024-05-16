import { Form, useNavigation } from "@remix-run/react";
import { BsThreeDotsVertical } from "react-icons/bs";

import type { PreviewProps, UserType } from "@/types";
import { useState } from "react";

function Preview({ data, user }: { data: PreviewProps[]; user: UserType }) {
  const navigation = useNavigation();
  const isSubmittingDelete =
    !(navigation.state === "idle") && navigation.formMethod === "DELETE";
  const [linkId, setLinkId] = useState(0); //for showing user deleting message

  return (
    <div className="flex self-center bg-black rounded-2xl w-64 h-[28rem] p-3">
      <div className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-500 rounded-2xl p-3 flex flex-col gap-4 justify-start overflow-y-scroll hidden-scrollbar">
        {/* Foto de perfil */}
        <div className="size-16 rounded-full bg-gray-700 self-center"></div>

        {/* Nombre de usuario y mensaje de biografia */}
        <div className="text-center">
          <h1 className="font-bold">{user.email}</h1>
          <p className="text-gray-500 text-sm">{user.username}</p>
        </div>

        {/* Links en linea */}
        <div className="flex flex-col gap-3">
          {data.map((dataLink, index) => {
            return (
              <div
                className={`flex justify-between items-center ${dataLink.style?.class}`}
                key={index}
              >
                {isSubmittingDelete && dataLink.id === linkId ? (
                  <p>Deleting...</p>
                ) : (
                  <p>{dataLink.title}</p>
                )}
                <div className=" cursor-pointer">
                  <Form method="delete" action={`/styles`}>
                    <input type="hidden" name="link-id" value={dataLink.id} />
                    <button onClick={() => setLinkId(dataLink.id)}>
                      <BsThreeDotsVertical />
                    </button>
                  </Form>
                </div>
              </div>
            );
          })}
        </div>
        {/* ******************************************************** */}
      </div>
    </div>
  );
}

export default Preview;
