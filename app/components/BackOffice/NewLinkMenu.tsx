import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useNavigation } from "@remix-run/react"
import { useState } from "react";


function NewLinkMenu({isVisible}: {isVisible: boolean}){


  const [visible, setVisibility] = useState(isVisible)
  
  return <div className={`${!visible? '':'hidden'}`}>
  <div className="bg-black opacity-50 w-full h-screen fixed top-0 left-0 z-40 overflow-hidden" onClick={()=>setVisibility(!visible)}></div>
  <div className="absolute top-10 w-full flex justify-center items-center">
    <Form method="post" className="bg-white rounded-3xl p-4 flex flex-col gap-4 w-[30%] z-50">
      <div className="grid grid-cols-[20%_80%]">
      <label className="bg-gray-500 rounded-tl-xl rounded-bl-xl p-2" htmlFor="title">Titulo</label>
      <input className="p-2 border-b border-gray-500" name="title" type="text" id="title"/>
      </div>
      <div className="grid grid-cols-[20%_80%]">
      <label className="bg-gray-500 rounded-tl-xl rounded-bl-xl p-2" htmlFor="link">link</label>
      <input className="p-2 border-b border-gray-500" name="link" type="text" id="link"/>
      </div>
      <div>
        <button type="submit" className="bg-blue-700 text-white text-xl rounded-xl p-2 hover:bg-blue-600">Add link</button>
      </div>
    </Form>
  </div>
  </div>
}

export default NewLinkMenu;