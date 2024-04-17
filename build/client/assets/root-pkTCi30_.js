import{r as i,j as e}from"./jsx-runtime-Dslbdtkn.js";import{u as f,e as x,f as y,g as h,h as S,O as g,M as j,L as w,S as M}from"./components-D4VHOdRu.js";import"./index-B_WZbPg-.js";/**
 * @remix-run/react v2.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function b({getKey:t,...l}){let{isSpaMode:c}=f(),o=x(),u=y();h({getKey:t,storageKey:a});let m=i.useMemo(()=>{if(!t)return null;let s=t(o,u);return s!==o.key?s:null},[]);if(c)return null;let p=((s,d)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[d||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",S({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${p})(${JSON.stringify(a)}, ${JSON.stringify(m)})`}}))}function N({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(j,{}),e.jsx(w,{})]}),e.jsxs("body",{style:{fontFamily:"system-ui, sans-serif"},className:" min-h-screen bg-center bg-no-repeat bg-cover flex flex-col justify-between gap-4",children:[e.jsx("div",{className:" flex-1",children:t}),e.jsx(b,{}),e.jsx(M,{})]})]})}function O(){return e.jsx(g,{})}export{N as Layout,O as default};
