import{A as tt}from"./ApplicationLogo-BA4xlCG4.js";import{S as pe,V as Se,h,q as P,o as d,f as M,b as u,r as B,K as xe,W as Me,a as H,w as g,n as T,I as ve,c as $,u as i,i as fe,X as _e,j as Y,m as J,d as te,t as me,H as re,Y as De,k as de,$ as se,g as K,F as We,v as Ne,L as nt,a0 as Ee,a1 as at,a2 as O,a3 as R,z as ze,a4 as it}from"./app-CbG_GS4Z.js";import{s as ot}from"./button.esm-RneWkM_M.js";const rt={class:"relative"},lt={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:String,default:"py-1 bg-white"}},setup(e){const t=e,n=c=>{o.value&&c.key==="Escape"&&(o.value=!1)};pe(()=>document.addEventListener("keydown",n)),Se(()=>document.removeEventListener("keydown",n));const a=h(()=>({48:"w-48"})[t.width.toString()]),l=h(()=>t.align==="left"?"ltr:origin-top-left rtl:origin-top-right start-0":t.align==="right"?"ltr:origin-top-right rtl:origin-top-left end-0":"origin-top"),o=P(!1);return(c,r)=>(d(),M("div",rt,[u("div",{onClick:r[0]||(r[0]=m=>o.value=!o.value)},[B(c.$slots,"trigger")]),xe(u("div",{class:"fixed inset-0 z-40",onClick:r[1]||(r[1]=m=>o.value=!1)},null,512),[[Me,o.value]]),H(ve,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"opacity-0 scale-95","enter-to-class":"opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-95"},{default:g(()=>[xe(u("div",{class:T(["absolute z-50 mt-2 rounded-md shadow-lg",[a.value,l.value]]),style:{display:"none"},onClick:r[2]||(r[2]=m=>o.value=!1)},[u("div",{class:T(["rounded-md ring-1 ring-black ring-opacity-5",e.contentClasses])},[B(c.$slots,"content")],2)],2),[[Me,o.value]])]),_:3})]))}},Pe={__name:"DropdownLink",props:{href:{type:String,required:!0}},setup(e){return(t,n)=>(d(),$(i(fe),{href:e.href,class:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},{default:g(()=>[B(t.$slots,"default")]),_:3},8,["href"]))}},ke={__name:"ResponsiveNavLink",props:{href:{type:String,required:!0},active:{type:Boolean}},setup(e){const t=e,n=h(()=>t.active?"block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out":"block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");return(a,l)=>(d(),$(i(fe),{href:e.href,class:T(n.value)},{default:g(()=>[B(a.$slots,"default")]),_:3},8,["href","class"]))}};var st=function(t,n){var a=De(t),l=a.collapsed,o=a.relative,c=a.width,r=a.widthCollapsed,m=a.rtl,w=P(null),j=P(l.value),D=P(null),b=at({item:null,rect:{top:0,height:0,padding:[0,0],maxHeight:0,maxWidth:0,dropup:0},timeout:null}),I=h(function(){return b.item}),y=h(function(){return b.rect}),L=P(""),S=function(f){j.value=f},C=function(f){D.value=f},v=function(f){var x=f.item,A=f.itemEl;X();var G=A.children[0],V=k(G);Z(x),le(V)},k=function(f){var x=f.getBoundingClientRect(),A=x.top,G=x.bottom,V=x.height,ie=w.value.getBoundingClientRect(),q=ie.left,he=ie.right,N=w.value.firstElementChild.getBoundingClientRect(),ge=N.bottom,be=N.height,ue=f.offsetParent,F=ue.offsetTop,ce=ue.getBoundingClientRect(),ye=ce.top,we=ce.height,p=window.innerHeight,s=window.innerWidth,E=0,Q=s,U=parseInt(c.value)-parseInt(r.value);if(o.value){var z=w.value.parentElement;p=z.clientHeight,s=z.clientWidth,E=z.getBoundingClientRect().top,Q=z.getBoundingClientRect().right}var oe=m.value?s-(Q-q):Q-he;U=oe<=U?oe:U;var $e=window.getComputedStyle(f),Je=$e.paddingLeft,Ke=$e.paddingRight,Xe=parseInt(Je),Ge=parseInt(Ke),Qe=A-ye,Ze=ge-A-(be-(we+F)),Ce=p-(G-E),Le=Math.min(window.innerHeight,window.innerHeight-E,p,p+E),et=Le-(Math.max(G,0)-Math.max(E,0)),Ae=et<Le*.25?Ze:0;return Ce=Ae?A-E:Ce,{top:Qe,height:V,padding:[Xe,Ge],maxWidth:U,maxHeight:Ce,dropup:Ae}},W=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:800;if(I.value){if(X(),f){Z(null);return}b.timeout=setTimeout(function(){Z(null)},x)}},X=function(){b.timeout&&clearTimeout(b.timeout)},Z=function(f){b.item=f},le=function(f){Object.keys(b.rect).forEach(function(x){b.rect[x]=f[x]})},ne=function(){var f=window.location.pathname+window.location.search+window.location.hash;L.value=f},ae=function(f,x){n("item-click",f,x)};return O("vsmProps",t),O("getSidebarRef",w),O("getIsCollapsed",j),O("getActiveShow",D),O("getMobileItem",I),O("getMobileItemRect",y),O("getCurrentRoute",L),O("updateIsCollapsed",S),O("updateActiveShow",C),O("setMobileItem",v),O("unsetMobileItem",W),O("clearMobileItemTimeout",X),O("onRouteChange",ne),O("emitItemClick",ae),{getSidebarRef:w,getIsCollapsed:j,getActiveShow:D,getMobileItem:I,getMobileItemRect:y,getCurrentRoute:L,updateIsCollapsed:S,updateActiveShow:C,setMobileItem:v,unsetMobileItem:W,clearMobileItemTimeout:X,updateCurrentRoute:ne,onItemClick:ae}},Oe=function(){return{getSidebarProps:R("vsmProps"),getSidebarRef:R("getSidebarRef"),getIsCollapsed:R("getIsCollapsed"),getActiveShow:R("getActiveShow"),getMobileItem:R("getMobileItem"),getMobileItemRect:R("getMobileItemRect"),getCurrentRoute:R("getCurrentRoute"),updateIsCollapsed:R("updateIsCollapsed"),updateActiveShow:R("updateActiveShow"),setMobileItem:R("setMobileItem"),unsetMobileItem:R("unsetMobileItem"),clearMobileItemTimeout:R("clearMobileItemTimeout"),onRouteChange:R("onRouteChange"),emitItemClick:R("emitItemClick")}};function Be(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),n.push.apply(n,a)}return n}function ee(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Be(Object(n),!0).forEach(function(a){ut(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Be(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function Ie(e){"@babel/helpers - typeof";return Ie=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ie(e)}function ut(e,t,n){return t=dt(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ct(e,t){if(typeof e!="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function dt(e){var t=ct(e,"string");return typeof t=="symbol"?t:String(t)}function vt(e,t){var n=e.matched,a=n.length,l=n[a-1],o=t.matched;if(!l||!o.length)return-1;var c=o.findIndex(Te.bind(null,l));if(c>-1)return c;var r=He(n[a-2]);return a>1&&He(l)===r&&o[o.length-1].path!==r?o.findIndex(Te.bind(null,n[a-2])):c}function ft(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!pt(e[n],t[n]))return!1;return!0}function mt(e,t){var n=function(){var c=t[a],r=e[a];if(typeof c=="string"){if(c!==r)return{v:!1}}else if(!Array.isArray(r)||r.length!==c.length||c.some(function(m,w){return m!==r[w]}))return{v:!1}};for(var a in t){var l=n();if(Ie(l)==="object")return l.v}return!0}function He(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function Te(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function pt(e,t){return Array.isArray(e)?je(e,t):Array.isArray(t)?je(t,e):e===t}function je(e,t){return Array.isArray(t)?e.length===t.length&&e.every(function(n,a){return n===t[a]}):e.length===1&&e[0]===t}function ht(e){var t=_e().appContext.config.globalProperties.$router,n=Oe(),a=n.getSidebarProps,l=n.getIsCollapsed,o=n.getActiveShow,c=n.getMobileItem,r=n.getMobileItemRect,m=n.getCurrentRoute,w=n.updateActiveShow,j=n.setMobileItem,D=n.unsetMobileItem,b=n.clearMobileItemTimeout,I=n.emitItemClick,y=R("emitScrollUpdate"),L=P(!1),S=P(!1),C=h(function(){return k(e.item)||W(e.item.child)}),v=h(function(){return k(e.item,!0)}),k=function(s,E){if(s.isActive&&typeof s.isActive=="function"){var Q=s.isActive(s);if(typeof Q=="boolean")return Q}if(!s.href||s.external)return!1;if(t){var U=t.resolve(s.href),z=t.currentRoute.value,oe=vt(U,z);return E||s.exact?oe>-1&&oe===z.matched.length-1&&ft(z.params,U.params):oe>-1&&mt(z.params,U.params)}else return s.href===m.value},W=function p(s){return s?s.some(function(E){return k(E)||p(E.child)}):!1},X=function(s){(!e.item.href||e.item.disabled)&&(s.preventDefault(),e.item.disabled)||(_(s,s.currentTarget.parentElement),N.value&&(!e.item.href||C.value)&&(V.value=!V.value),I(s,e.item))},Z=function(s){e.item.disabled||(s.stopPropagation(),S.value=!0)},le=function(s){s.stopPropagation(),S.value=!1},ne=function(s){e.item.disabled||(a.disableHover?F.value&&N.value&&b():(b(),_(s,s.currentTarget)))},ae=function(){a.disableHover&&!N.value||F.value&&D(!1,a.disableHover?void 0:300)},_=function(s,E){F.value||l.value&&setTimeout(function(){q.value&&(F.value||j({item:e.item,itemEl:E})),s.type==="click"&&!N.value&&D(!1,q.value?void 0:300)},0)},f=function(s){s.style.height=s.scrollHeight+"px"},x=function(s){s.style.height="auto",l.value||y()},A=function(s){if(l.value&&q.value){s.style.display="none";return}s.style.height=s.scrollHeight+"px"},G=function(){l.value||y()},V=h({get:function(){return N.value?l.value&&q.value?ie.value:a.showChild?!0:a.showOneChild&&q.value?e.item.id===o.value:L.value:!1},set:function(s){a.showOneChild&&q.value&&w(s?e.item.id:null),L.value=s}}),ie=h(function(){return l.value&&q.value?F.value:S.value}),q=h(function(){return e.level===1}),he=h(function(){return l.value?e.item.hidden&&e.item.hiddenOnCollapse===void 0?!0:e.item.hiddenOnCollapse===!0:e.item.hidden===!0}),N=h(function(){return!!(e.item.child&&e.item.child.length>0)}),ge=h(function(){return["vsm--link","vsm--link_level-".concat(e.level),{"vsm--link_mobile":F.value,"vsm--link_hover":ie.value,"vsm--link_active":C.value,"vsm--link_disabled":e.item.disabled,"vsm--link_open":V.value},e.item.class]}),be=h(function(){var p=e.item.href?e.item.href:"#",s=e.item.external?"_blank":"_self",E=e.item.disabled?-1:null,Q=v.value?"page":null,U=N.value?!0:null,z=N.value?V.value:null;return ee({href:p,target:s,tabindex:E,"aria-current":Q,"aria-haspopup":U,"aria-expanded":z},e.item.attributes)}),ue=h(function(){return["vsm--item",{"vsm--item_mobile":F.value}]}),F=h(function(){var p;return e.item.id===((p=c.value)===null||p===void 0?void 0:p.id)}),ce=h(function(){return ee(ee({position:"absolute","max-height":"".concat(r.value.maxHeight,"px"),width:"".concat(r.value.maxWidth,"px"),"overflow-y":"auto"},r.value.dropup?{bottom:"".concat(r.value.dropup,"px")}:{top:"".concat(r.value.top+r.value.height,"px")}),a.rtl?{right:a.widthCollapsed}:{left:a.widthCollapsed})}),ye=h(function(){return ee(ee({position:"absolute",top:"".concat(r.value.top,"px")},a.rtl?{right:a.widthCollapsed}:{left:a.widthCollapsed}),{},{width:"".concat(r.value.maxWidth,"px"),height:"".concat(r.value.height,"px"),"padding-left":"".concat(r.value.padding[0],"px"),"padding-right":"".concat(r.value.padding[1],"px"),"z-index":"20"})}),we=h(function(){return ee(ee({position:"absolute",top:"".concat(r.value.top,"px")},a.rtl?{right:"0px"}:{left:"0px"}),{},{width:"".concat(r.value.maxWidth+parseInt(a.widthCollapsed),"px"),height:"".concat(r.value.height,"px"),"z-index":"10"})});return Ee(function(){return C.value},function(){C.value&&(V.value=!0)},{immediate:!0}),{active:C,exactActive:v,show:V,hover:ie,isFirstLevel:q,isHidden:he,hasChild:N,linkClass:ge,linkAttrs:be,itemClass:ue,isMobileItem:F,mobileItemDropdownStyle:ce,mobileItemStyle:ye,mobileItemBackgroundStyle:we,onLinkClick:X,onMouseOver:Z,onMouseOut:le,onMouseEnter:ne,onMouseLeave:ae,onExpandEnter:f,onExpandAfterEnter:x,onExpandBeforeLeave:A,onExpandAfterLeave:G}}const gt=["href","onClick"],bt={compatConfig:{MODE:3,inheritAttrs:!1}};var Ve=Object.assign(bt,{__name:"SidebarMenuLink",props:{item:{type:Object,required:!0}},setup(e){const t=e,n=_e().appContext.config.globalProperties.$router,a=h(()=>!!(!t.item.href||t.item.external||!n));return(l,o)=>{const c=ze("router-link");return i(a)?(d(),M("a",Y(J({key:0},l.$attrs)),[B(l.$slots,"default")],16)):(d(),$(c,{key:1,custom:"",to:l.$attrs.href},{default:g(({href:r,navigate:m})=>[u("a",J(l.$attrs,{href:r,onClick:m}),[B(l.$slots,"default")],16,gt)]),_:3},8,["to"]))}}});Ve.__file="src/components/SidebarMenuLink.vue";const yt={compatConfig:{MODE:3}};var qe=Object.assign(yt,{__name:"SidebarMenuIcon",props:{icon:{type:[String,Object],default:""}},setup(e){const t=e,n=h(()=>({class:["vsm--icon",typeof t.icon=="object"?t.icon.class:t.icon],"aria-hidden":!0,...t.icon.attributes}));return(a,l)=>typeof e.icon=="object"&&e.icon.text?(d(),$(re(e.icon.element?e.icon.element:"i"),Y(J({key:0},i(n))),{default:g(()=>[te(me(e.icon.text),1)]),_:1},16)):typeof e.icon=="object"?(d(),$(re(e.icon.element?e.icon.element:"i"),Y(J({key:1},i(n))),null,16)):(d(),M("i",Y(J({key:2},i(n))),null,16))}});qe.__file="src/components/SidebarMenuIcon.vue";const wt={compatConfig:{MODE:3}};var Fe=Object.assign(wt,{__name:"SidebarMenuBadge",props:{badge:{type:Object,default:()=>{}}},setup(e){const t=e,n=h(()=>({class:["vsm--badge",t.badge.class],...t.badge.attributes}));return(a,l)=>e.badge.text?(d(),$(re(e.badge.element?e.badge.element:"span"),Y(J({key:0},i(n))),{default:g(()=>[te(me(e.badge.text),1)]),_:1},16)):(d(),$(re(e.badge.element?e.badge.element:"span"),Y(J({key:1},i(n))),null,16))}});Fe.__file="src/components/SidebarMenuBadge.vue";const Ct={key:0},kt={class:"vsm--dropdown"},xt={compatConfig:{MODE:3}};var Ue=Object.assign(xt,{__name:"SidebarMenuItem",props:{item:{type:Object,required:!0},level:{type:Number,default:1}},setup(e){const t=e,{getSidebarProps:n,getIsCollapsed:a}=Oe(),{linkComponentName:l}=De(n),{show:o,hover:c,isFirstLevel:r,isHidden:m,hasChild:w,linkClass:j,linkAttrs:D,itemClass:b,isMobileItem:I,mobileItemStyle:y,mobileItemDropdownStyle:L,mobileItemBackgroundStyle:S,onLinkClick:C,onMouseOver:v,onMouseOut:k,onMouseEnter:W,onMouseLeave:X,onExpandEnter:Z,onExpandAfterEnter:le,onExpandBeforeLeave:ne,onExpandAfterLeave:ae}=ht(t);return(_,f)=>{const x=ze("sidebar-menu-item",!0);return e.item.component&&!i(m)?(d(),M("li",Ct,[(d(),$(re(e.item.component),Y(de(e.item.props)),null,16))])):e.item.header&&!i(m)?(d(),M("li",J({key:1,class:["vsm--header",e.item.class]},e.item.attributes),me(e.item.header),17)):i(m)?K("v-if",!0):(d(),M("li",J({key:2,class:i(b),onMouseover:f[0]||(f[0]=(...A)=>i(v)&&i(v)(...A)),onMouseout:f[1]||(f[1]=(...A)=>i(k)&&i(k)(...A))},nt(i(a)&&i(r)?{mouseenter:i(W),mouseleave:i(X)}:{},!0)),[(d(),$(re(i(l)?i(l):Ve),J({item:e.item,class:i(j)},i(D),{onClick:i(C)}),{default:g(()=>[i(a)&&i(r)?(d(),$(ve,{key:0,name:"slide-animation"},{default:g(()=>[i(c)?(d(),M("div",{key:0,class:"vsm--mobile-bg",style:se(i(S))},null,4)):K("v-if",!0)]),_:1})):K("v-if",!0),e.item.icon?(d(),$(qe,{key:1,icon:e.item.icon},null,8,["icon"])):K("v-if",!0),u("div",{class:T(["vsm--title",i(a)&&i(r)&&!i(I)&&"vsm--title_hidden"]),style:se(i(I)&&i(y))},[u("span",null,me(e.item.title),1),e.item.badge?(d(),$(Fe,{key:0,badge:e.item.badge},null,8,["badge"])):K("v-if",!0),i(w)?(d(),M("div",{key:1,class:T(["vsm--arrow",{"vsm--arrow_open":i(o)}])},[B(_.$slots,"dropdown-icon",Y(de({isOpen:i(o)})))],2)):K("v-if",!0)],6)]),_:3},16,["item","class","onClick"])),i(w)?(d(),$(ve,{key:0,appear:i(I),name:"expand",onEnter:i(Z),onAfterEnter:i(le),onBeforeLeave:i(ne),onAfterLeave:i(ae)},{default:g(()=>[i(o)?(d(),M("div",{key:0,class:T(["vsm--child",i(I)&&"vsm--child_mobile"]),style:se(i(I)&&i(L))},[u("ul",kt,[(d(!0),M(We,null,Ne(e.item.child,A=>(d(),$(x,{key:A.id,item:A,level:e.level+1},{"dropdown-icon":g(({isOpen:G})=>[B(_.$slots,"dropdown-icon",Y(de({isOpen:G})))]),_:2},1032,["item","level"]))),128))])],6)):K("v-if",!0)]),_:3},8,["appear","onEnter","onAfterEnter","onBeforeLeave","onAfterLeave"])):K("v-if",!0)],16))}}});Ue.__file="src/components/SidebarMenuItem.vue";const Mt={compatConfig:{MODE:3}};var Re=Object.assign(Mt,{__name:"SidebarMenuScroll",setup(e){const{getIsCollapsed:t}=Oe(),n=P(null),a=P(null),l=P(null);let o=0,c=!1;const r=P(!1),m=()=>{n.value&&it(()=>{S()})},w=()=>{requestAnimationFrame(m)},j=v=>{const k=Math.abs(a.value.getBoundingClientRect().y-v.clientY),W=l.value.offsetHeight/2;C(k-W)},D=v=>{v.stopImmediatePropagation(),c=!0,window.addEventListener("mousemove",b),window.addEventListener("mouseup",I),o=l.value.offsetHeight-(v.clientY-l.value.getBoundingClientRect().y)},b=v=>{if(!c)return;const k=v.clientY-a.value.getBoundingClientRect().y,W=l.value.offsetHeight-o;r.value=!0,C(k-W)},I=v=>{c=!1,o=0,r.value=!1,window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",I)},y=v=>{r.value=!0},L=v=>{r.value=!1},S=()=>{const v=n.value.clientHeight*100/n.value.scrollHeight,k=v<100?v:0,W=n.value.scrollTop*100/n.value.clientHeight||0;l.value.style.height=`${k}%`,l.value.style.transform=`translateY(${W}%)`},C=v=>{const k=v*100/a.value.offsetHeight;n.value.scrollTop=k*n.value.scrollHeight/100};return Ee(()=>t.value,()=>{m()}),pe(()=>{m(),window.addEventListener("resize",m)}),Se(()=>{window.removeEventListener("resize",m)}),O("emitScrollUpdate",m),(v,k)=>(d(),M("div",{class:"vsm--scroll-wrapper",onMousemove:y,onMouseleave:L},[u("div",{ref_key:"scrollRef",ref:n,class:"vsm--scroll",onScroll:w},[B(v.$slots,"default")],544),H(ve,{persisted:""},{default:g(()=>[xe(u("div",{ref_key:"scrollBarRef",ref:a,class:"vsm--scroll-bar",onMousedown:j},[u("div",{ref_key:"scrollThumbRef",ref:l,class:"vsm--scroll-thumb",onMousedown:D},null,544)],544),[[Me,r.value]])]),_:1})],32))}});Re.__scopeId="data-v-402f9588";Re.__file="src/components/SidebarMenuScroll.vue";const It={class:"vsm--wrapper"},St=u("span",{class:"vsm--arrow_default"},null,-1),_t=["aria-label"],Et=u("span",{class:"vsm--toggle-btn_default"},null,-1),Ot={compatConfig:{MODE:3}};var Ye=Object.assign(Ot,{__name:"SidebarMenu",props:{menu:{type:Array,required:!0},collapsed:{type:Boolean,default:!1},width:{type:String,default:"290px"},widthCollapsed:{type:String,default:"65px"},showChild:{type:Boolean,default:!1},theme:{type:String,default:void 0,validator:e=>["","white-theme"].includes(e)},showOneChild:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},relative:{type:Boolean,default:!1},hideToggle:{type:Boolean,default:!1},disableHover:{type:Boolean,default:!1},linkComponentName:{type:String,default:void 0}},emits:{"item-click"(e,t){return!!(e&&t)},"update:collapsed"(e){return typeof e=="boolean"}},setup(e,{expose:t,emit:n}){const a=e,{getSidebarRef:l,getIsCollapsed:o,updateIsCollapsed:c,unsetMobileItem:r,updateCurrentRoute:m}=st(a,n),w=h(()=>{let y=0;function L(S){function C(){return`${Date.now()+""+y++}`}return S.map(v=>({id:C(),...v,...v.child&&{child:L(v.child)}}))}return L(a.menu)}),j=h(()=>o.value?a.widthCollapsed:a.width),D=h(()=>["v-sidebar-menu",o.value?"vsm_collapsed":"vsm_expanded",a.theme&&`vsm_${a.theme}`,a.rtl&&"vsm_rtl",a.relative&&"vsm_relative"]),b=()=>{r(),c(!o.value),n("update:collapsed",o.value)};return Ee(()=>a.collapsed,y=>{r(),c(y)}),_e().appContext.config.globalProperties.$router||(pe(()=>{m(),window.addEventListener("hashchange",m)}),Se(()=>{window.removeEventListener("hashchange",m)})),t({onRouteChange:m}),(y,L)=>(d(),M("div",{ref_key:"sidebarMenuRef",ref:l,class:T([i(D)]),style:se({"max-width":i(j)})},[u("div",It,[B(y.$slots,"header"),H(Re,null,{default:g(()=>[u("ul",{class:"vsm--menu",style:se({width:i(j)})},[(d(!0),M(We,null,Ne(i(w),S=>(d(),$(Ue,{key:S.id,item:S},{"dropdown-icon":g(({isOpen:C})=>[B(y.$slots,"dropdown-icon",Y(de({isOpen:C})),()=>[St])]),_:2},1032,["item"]))),128))],4)]),_:3}),B(y.$slots,"footer")]),e.hideToggle?K("v-if",!0):(d(),M("button",{key:0,class:"vsm--toggle-btn","aria-label":e.collapsed?"Expand sidebar":"Collapse sidebar",onClick:b},[B(y.$slots,"toggle-icon",{},()=>[Et])],8,_t))],6))}});Ye.__file="src/components/SidebarMenu.vue";const Rt={class:"flex justify-center h-16 w-full"},$t={class:"flex"},Lt={class:"shrink-0 flex items-center"},At={class:"bg-white border-b h-[8vh] border-gray-100"},Pt={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full"},Bt={class:"flex justify-between h-full py-3"},Ht=u("div",{class:"flex"},null,-1),Tt={class:"hidden sm:flex sm:items-center sm:ml-6"},jt={class:"ml-3 relative"},Dt=u("div",{class:"block px-4 py-2 text-xs text-gray-400"}," Manage Account ",-1),Wt={class:"-mr-2 flex items-center sm:hidden"},Nt={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},zt={class:"pt-2 pb-3 space-y-1"},Vt={class:"pt-4 pb-1 border-t border-gray-200"},qt=u("div",{class:"px-4"},[u("div",{class:"font-medium text-base text-gray-800"}),u("div",{class:"font-medium text-sm text-gray-500"})],-1),Ft={class:"mt-3 space-y-1"},Kt={__name:"AuthenticatedLayout",props:{height:{type:String,required:!1}},setup(e){P(JSON.parse(localStorage.getItem("alertCount")||"0"));const t=[{href:"/link-types",title:"Link type",icon:{element:"span",class:"pi pi-fw pi-map-marker"}},{href:"/link-schemas",title:"Link schema",icon:{element:"span",class:"pi pi-fw pi-map-marker"}}],n=P(!1),a=P(JSON.parse(localStorage.getItem("collapse")||"false")),l=o=>{a.value=o,localStorage.setItem("collapse",JSON.stringify(o))};return pe(()=>{const o=localStorage.getItem("collapse");o&&(a.value=JSON.parse(o))}),(o,c)=>(d(),M("div",null,[H(i(Ye),{menu:t,"onUpdate:collapsed":l,collapsed:a.value,linkComponentName:i(fe),widthCollapsed:"100px",class:"!bg-#1e1e21"},{header:g(()=>[u("div",Rt,[u("div",$t,[u("div",Lt,[H(i(fe),{href:o.route("linkType")},{default:g(()=>[H(tt,{class:"block h-9 w-auto fill-current text-gray-800"})]),_:1},8,["href"])])])])]),"toggle-icon":g(()=>[u("i",{class:T(["pi pi-fw pi-angle-double-left",{"pi-angle-double-left":a.value,"pi-angle-double-right":!a.value}])},null,2)]),_:1},8,["collapsed","linkComponentName"]),u("div",{class:T(["min-h-screen bg-fondo-primary transition",{"pl-[100px]":a.value,"pl-[290px]":!a.value}])},[u("nav",At,[u("div",Pt,[u("div",Bt,[Ht,u("div",Tt,[u("div",jt,[H(lt,{align:"right",width:"48",triggerClass:"flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"},{trigger:g(()=>[H(i(ot),{class:"!bg-black [&>span]:text-white",icon:"pi pi-user",severity:"danger",text:"",raised:"",rounded:"","aria-label":"User"})]),content:g(()=>[Dt,H(Pe,{href:o.route("profile.edit")},{default:g(()=>[te(" Profile ")]),_:1},8,["href"]),H(Pe,{href:o.route("logout"),method:"post",as:"button"},{default:g(()=>[te(" Log Out ")]),_:1},8,["href"])]),_:1})])]),u("div",Wt,[u("button",{onClick:c[0]||(c[0]=r=>n.value=!n.value),class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"},[(d(),M("svg",Nt,[u("path",{class:T({hidden:n.value,"inline-flex":!n.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),u("path",{class:T({hidden:!n.value,"inline-flex":n.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),u("div",{class:T([{block:n.value,hidden:!n.value},"sm:hidden"])},[u("div",zt,[H(ke,{href:o.route("linkType"),active:o.route().current("linkType")},{default:g(()=>[te(" Items ")]),_:1},8,["href","active"])]),u("div",Vt,[qt,u("div",Ft,[H(ke,{href:o.route("profile.edit")},{default:g(()=>[te(" Profile ")]),_:1},8,["href"]),H(ke,{href:o.route("logout"),method:"post",as:"button"},{default:g(()=>[te(" Log Out ")]),_:1},8,["href"])])])],2)]),u("main",{class:T({"h-[92vh]":!e.height,"h-full":e.height})},[B(o.$slots,"default")],2)],2)]))}};export{Kt as _};
