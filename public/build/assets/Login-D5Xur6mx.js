import{T as p,o as f,f as b,a as o,u as e,b as s,w as i,e as _,F as g,Z as h,d as m,i as n}from"./app-CbG_GS4Z.js";import{_ as d}from"./InputError-BgezJrZe.js";import{s as w}from"./button.esm-RneWkM_M.js";import{s as u}from"./inputtext.esm-DHAKrWh8.js";import{s as x}from"./checkbox.esm-DPxvCfK-.js";const v={class:"h-screen grid place-items-center bg-[#F5ECEB]"},y=s("img",{alt:"Image",class:"bg-login absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.1] w-full h-full object-cover z-0"},null,-1),V={class:"surface-card p-4 shadow-2 border-round w-full max-w-xl relative z-10"},B={class:"text-center mb-5"},k=s("img",{alt:"Image",height:"50",class:"bg-login-logo mb-3 mx-auto"},null,-1),C=s("div",{class:"text-900 text-3xl font-medium mb-3"}," Bienvenidos a la red seguridad ",-1),E=s("span",{class:"text-600 font-medium line-height-3"},"¿No tienes una cuenta?",-1),F=s("label",{for:"email",class:"block text-900 font-medium mb-2"},"Email",-1),N=s("label",{for:"password",class:"block text-900 font-medium mb-2"},"Contraseña",-1),q={class:"flex align-items-center justify-between mb-6"},I={class:"flex align-items-center"},U=s("label",{for:"remember"},"Recordarme",-1),H={__name:"Login",props:{canResetPassword:{type:Boolean},status:{type:String}},setup($){const t=p({email:"",password:"",remember:!1}),c=()=>{t.post(route("login"),{onFinish:()=>t.reset("password")})};return(r,l)=>(f(),b(g,null,[o(e(h),{title:"Welcome"}),s("div",v,[y,s("div",V,[s("div",B,[k,C,E,o(e(n),{href:r.route("register"),class:"font-medium no-underline ml-2 text-blue-500 cursor-pointer"},{default:i(()=>[m(" Crear una ")]),_:1},8,["href"])]),s("form",{onSubmit:_(c,["prevent"])},[s("div",null,[F,o(e(u),{id:"email",type:"email",class:"w-full mb-3 styles-input",modelValue:e(t).email,"onUpdate:modelValue":l[0]||(l[0]=a=>e(t).email=a),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),o(d,{class:"mt-2",message:e(t).errors.email},null,8,["message"])]),s("div",null,[N,o(e(u),{id:"password",type:"password",class:"w-full mb-3 styles-input",modelValue:e(t).password,"onUpdate:modelValue":l[1]||(l[1]=a=>e(t).password=a),required:"",autocomplete:"current-password"},null,8,["modelValue"]),o(d,{class:"mt-2",message:e(t).errors.password},null,8,["message"])]),s("div",q,[s("div",I,[o(e(x),{id:"remember",name:"remember",binary:!0,modelValue:e(t).remember,"onUpdate:modelValue":l[2]||(l[2]=a=>e(t).remember=a),class:"mr-2"},null,8,["modelValue"]),U]),o(e(n),{href:r.route("password.request"),class:"font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"},{default:i(()=>[m(" ¿Has olvidado tu contraseña? ")]),_:1},8,["href"])]),o(e(w),{type:"submit",label:"Iniciar sesión",icon:"pi pi-user",class:"w-full styles-btn"})],32)])])],64))}};export{H as default};
