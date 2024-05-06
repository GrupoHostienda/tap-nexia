import{r as m,j as e}from"./jsx-runtime-ByGpHSPZ.js";import{b as h,c as y,O as f,d as g,i as j}from"./index-Dakp_wjs.js";import{a as w,_ as b,M as S,b as v,S as N,L as k}from"./components-Ccifui0g.js";import{u as E}from"./index-Lukm6YUc.js";import{m as d}from"./motion-Bkk8oeq9.js";/**
 * @remix-run/react v2.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let x="positions";function R({getKey:t,...l}){let{isSpaMode:c}=w(),n=h(),s=y();E({getKey:t,storageKey:x});let r=m.useMemo(()=>{if(!t)return null;let o=t(n,s);return o!==n.key?o:null},[]);if(c)return null;let i=((o,p)=>{if(!window.history.state||!window.history.state.key){let a=Math.random().toString(32).slice(2);window.history.replaceState({key:a},"")}try{let u=JSON.parse(sessionStorage.getItem(o)||"{}")[p||window.history.state.key];typeof u=="number"&&window.scrollTo(0,u)}catch(a){console.error(a),sessionStorage.removeItem(o)}}).toString();return m.createElement("script",b({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${i})(${JSON.stringify(x)}, ${JSON.stringify(r)})`}}))}function _({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(S,{}),e.jsx(v,{})]}),e.jsxs("body",{style:{fontFamily:"system-ui, sans-serif"},className:" min-h-screen bg-center bg-no-repeat bg-cover flex flex-col justify-between gap-4",children:[e.jsx("div",{className:" flex-1",children:t}),e.jsx(R,{}),e.jsx(N,{})]})]})}function H(){const t={items:[]},l=(s,r)=>{switch(r.type){case"addItem":return{...s,items:[...s.items,r.payload]};case"updateItem":return{...s,items:s.items.map(i=>i.id===r.payload.id?r.payload:i)};case"deleteItem":return{...s,items:s.items.filter(i=>i.id!==r.payload)};default:return s}},[c,n]=m.useReducer(l,t);return e.jsx(f,{context:{state:c,dispatch:n}})}function J(){const t=g();return j(t)?e.jsxs("div",{children:[e.jsxs("h1",{children:[t.status," ",t.statusText]}),e.jsx("p",{children:t.data})]}):t instanceof Error?e.jsxs("div",{className:"  min-h-screen grid md:grid-cols-7 bg-gray-50",children:[e.jsxs("div",{className:" rounded-md max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 flex flex-col gap-8",children:[e.jsx(d.h1,{initial:{opacity:0,y:-100},animate:{opacity:1,y:0},className:" text-[2.5rem] leading-none sm:text-5xl lg:text-6xl font-extrabold text-center gradient-text",children:"There was an error"}),e.jsxs(d.p,{initial:{opacity:0,y:100},animate:{opacity:1,y:0},className:" text-center ",children:[" ",e.jsx("strong",{children:"Error:"})," ",t.message]}),e.jsx(d.div,{initial:{opacity:0,y:100},animate:{opacity:1,y:0},className:" py-3",children:e.jsx(k,{to:"/",className:" bg-blue-600 block text-white rounded-full py-3 px-10 hover:bg-blue-700 cursor-pointer transition text-center ",children:"Go to Homepage"})})]}),e.jsx("div",{className:" md:bg-gray-800 min-h-screen hidden md:block md:col-span-2"}),e.jsx("button",{className:"p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700",children:e.jsx("p",{className:"w-7 h-7",children:"?"})})]}):e.jsx("h1",{children:"Unknown Error"})}export{J as ErrorBoundary,_ as Layout,H as default};
