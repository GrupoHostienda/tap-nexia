import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordTypeToggle = ()=>{
    const [visible, setVisible] = useState(false)
    const setVisibility = ()=>{
        setVisible(!visible);
    }

    const icon = <span onClick={setVisibility} className="w-[10%] opacity-60 cursor-pointer px-3">
        {visible ? <FaEye/> : <FaEyeSlash/>}
    </span>
        

    const inputType = visible ? "text" : "password";

    return [inputType,icon]
}

export default PasswordTypeToggle