import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordTypeToggle = ()=>{
    const [visible, setVisible] = useState(false)
    const setVisibility = ()=>{
        setVisible(!visible);
    }

    const icon = <span onClick={setVisibility} className="absolute top-[39%] right-[10%] opacity-60 cursor-pointer">
        {visible ? <FaEye/> : <FaEyeSlash/>}
    </span>
        

    const inputType = visible ? "text" : "password";

    return [inputType,icon]
}

export default PasswordTypeToggle