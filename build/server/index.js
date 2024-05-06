import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect, json } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, Link, useOutletContext, useActionData, useNavigation, useNavigate, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useReducer, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Authenticator } from "remix-auth";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import { FaBusinessTime, FaPalette, FaRegStar, FaRegEdit, FaBalanceScale, FaPlus, FaRegSave, FaEye, FaEyeSlash, FaMehBlank } from "react-icons/fa";
import { FaComputer, FaApple, FaXTwitter, FaFacebook, FaInstagram, FaSpotify } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { TbPerfume, TbPizza, TbHealthRecognition, TbMenu } from "react-icons/tb";
import { PiFlagBannerBold, PiAirplaneTiltBold } from "react-icons/pi";
import { LuLayoutGrid, LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { FiArchive } from "react-icons/fi";
import { RiLayoutTopLine, RiCloseFill, RiDragMove2Fill } from "react-icons/ri";
import { IoIosArrowForward, IoIosClose, IoMdLock } from "react-icons/io";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock, CiLogout } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { BsBoxArrowUp, BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Draggable from "react-draggable";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs(
      "body",
      {
        style: {
          fontFamily: "system-ui, sans-serif"
        },
        className: ` min-h-screen bg-center bg-no-repeat bg-cover flex flex-col justify-between gap-4`,
        children: [
          /* @__PURE__ */ jsx("div", { className: " flex-1", children }),
          /* @__PURE__ */ jsx(ScrollRestoration, {}),
          /* @__PURE__ */ jsx(Scripts, {})
        ]
      }
    )
  ] });
}
function App() {
  const initialState = {
    items: []
  };
  const reducer = (state2, action2) => {
    switch (action2.type) {
      case "addItem":
        return {
          ...state2,
          items: [...state2.items, action2.payload]
        };
      case "updateItem":
        return {
          ...state2,
          items: state2.items.map(
            (item) => item.id === action2.payload.id ? action2.payload : item
          )
        };
      case "deleteItem":
        return {
          ...state2,
          items: state2.items.filter((item) => item.id !== action2.payload)
        };
      default:
        return state2;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return /* @__PURE__ */ jsx(Outlet, { context: { state, dispatch } });
}
function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h1", { children: [
        error.status,
        " ",
        error.statusText
      ] }),
      /* @__PURE__ */ jsx("p", { children: error.data })
    ] });
  } else if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", { className: "  min-h-screen grid md:grid-cols-7 bg-gray-50", children: [
      /* @__PURE__ */ jsxs("div", { className: " rounded-md max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 flex flex-col gap-8", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: -100 },
            animate: { opacity: 1, y: 0 },
            className: " text-[2.5rem] leading-none sm:text-5xl lg:text-6xl font-extrabold text-center gradient-text",
            children: "There was an error"
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.p,
          {
            initial: { opacity: 0, y: 100 },
            animate: { opacity: 1, y: 0 },
            className: " text-center ",
            children: [
              " ",
              /* @__PURE__ */ jsx("strong", { children: "Error:" }),
              " ",
              error.message
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 100 },
            animate: { opacity: 1, y: 0 },
            className: " py-3",
            children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/",
                className: " bg-blue-600 block text-white rounded-full py-3 px-10 hover:bg-blue-700 cursor-pointer transition text-center ",
                children: "Go to Homepage"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: " md:bg-gray-800 min-h-screen hidden md:block md:col-span-2" }),
      /* @__PURE__ */ jsx("button", { className: "p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700", children: /* @__PURE__ */ jsx("p", { className: "w-7 h-7", children: "?" }) })
    ] });
  } else {
    return /* @__PURE__ */ jsx("h1", { children: "Unknown Error" });
  }
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cret1"],
    secure: process.env.NODE_ENV === "production"
  }
});
const authenticator = new Authenticator(sessionStorage);
async function handleSocialAuthCallback({
  profile
}) {
  let response = await fetch(`${process.env.API_BASE}/register/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: profile.displayName,
      email: profile.emails[0].value,
      password: profile.id
    })
  });
  let data2 = await response.json();
  if (response.ok) {
    console.log("User registered successfully.");
  } else if (!response.ok && (data2.message.includes("The email has already been taken.") || data2.message.includes("The username has already been taken."))) {
    console.log("User already exists. Attempting to log in.");
  } else {
    console.error("Registration error:", data2);
    throw new Error("Error registering the user.");
  }
  response = await fetch(`${process.env.API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: profile.emails[0].value,
      password: profile.id
    })
  });
  data2 = await response.json();
  if (!response.ok) {
    console.error("Login error:", data2);
    throw new Error("Error logging in the user.");
  }
  const session = await sessionStorage.getSession();
  session.set("authToken", data2.token);
  const cookieHeader = await sessionStorage.commitSession(session);
  return redirect("/", {
    headers: { "Set-Cookie": cookieHeader }
  });
}
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientID || !clientSecret) {
  throw new Error("Google client ID and secret must be defined");
}
authenticator.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      scope: ["openid email profile"],
      callbackURL: `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`
    },
    handleSocialAuthCallback
  )
);
const loader$3 = ({ request }) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    // successRedirect: "/",
    //failureRedirect: "/login",
  });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const name = "robert taylor";
const desc = "artist | dreamer | entrepreneur";
const avatar = "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg";
const links = [
  {
    title: "Portfolio",
    url: "https://www.google.com/"
  },
  {
    title: "My Store",
    url: "https://www.amazon.com/"
  },
  {
    title: "Record Request",
    url: "https://www.google.com/"
  },
  {
    title: "Contact Me",
    url: "https://www.google.com/"
  },
  {
    title: "favorite music video",
    url: "https://www.youtube.com/embed/hYT6ZLS5Xro"
  }
];
const socials$2 = [
  {
    title: "x",
    url: "https://twitter.com/"
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/"
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/"
  },
  {
    title: "spotify",
    url: "https://open.spotify.com/intl-es"
  }
];
const styles = {
  border: [
    {
      id: 1,
      "class": "rounded-none"
    },
    {
      id: 2,
      "class": "rounded-lg"
    },
    {
      id: 3,
      "class": "rounded-full"
    }
  ],
  softShadow: [
    {
      id: 1,
      "class": "shadow-md "
    },
    {
      id: 2,
      "class": "shadow-lg rounded-lg"
    },
    {
      id: 3,
      "class": "shadow-xl rounded-full"
    }
  ],
  hardShadow: [
    {
      id: 1,
      "class": "rounded-none"
    },
    {
      id: 2,
      "class": "rounded-lg"
    },
    {
      id: 3,
      "class": "rounded-full"
    }
  ]
};
const plans = {
  starter: {
    title: "Starter",
    isfor: "For growing influencers",
    items: [
      "Upgraded style options",
      "Monetization support affiliate marketing tools",
      "Scheduling",
      "Audience insights"
    ],
    price: "$3 EUR",
    payplan: "Per month, billed annually , or 4$ billed monthly"
  },
  pro: {
    title: "Pro",
    isfor: "For creators and businesses",
    items: [
      "Advanced customization of buttons, themes, and fonts",
      "Click, convesion, and revenue tracking",
      "Upgraded customer support",
      "Option to hide logo",
      "Social platform integrations to automatically display your latest-content",
      "Multiple admins"
    ],
    price: "Free for 30 days",
    payplan: "6$ per month, biled annually, or 6$ biled monthly"
  },
  premium: {
    title: "Premium",
    isfor: "For brands and businesses",
    items: [
      "Dedicated customer success manager with 1-1 onboarding",
      "Analitycs: Export lifetime data",
      "Access to exclusive webinars & best practice videos",
      "Premium support, response time 4 hours"
    ],
    price: "$18 EUR",
    payplan: "Per month, billed annually , or 22$ billed monthly"
  }
};
const categories = [
  {
    icon: "business",
    title: "Business"
  },
  {
    icon: "palette",
    title: "Influencer & Digital Creator"
  },
  {
    icon: "star",
    title: "Personal"
  },
  {
    icon: "edit",
    title: "Education"
  },
  {
    icon: "video",
    title: "Entertainment"
  },
  {
    icon: "perfume",
    title: "Fashion & Beauty"
  },
  {
    icon: "food",
    title: "Food & Beverage"
  },
  {
    icon: "balance",
    title: "Government & Politics"
  },
  {
    icon: "health",
    title: "Health & Wellness"
  },
  {
    icon: "banner",
    title: "Non-Profit"
  },
  {
    icon: "layout",
    title: "Other"
  },
  {
    icon: "computer",
    title: "Tech"
  },
  {
    icon: "airplane",
    title: "Travel & Tourism"
  }
];
const data = {
  name,
  desc,
  avatar,
  links,
  socials: socials$2,
  styles,
  plans,
  categories
};
const iconos = [
  { nombre: "business", componente: /* @__PURE__ */ jsx(FaBusinessTime, {}) },
  { nombre: "palette", componente: /* @__PURE__ */ jsx(FaPalette, {}) },
  { nombre: "star", componente: /* @__PURE__ */ jsx(FaRegStar, {}) },
  { nombre: "edit", componente: /* @__PURE__ */ jsx(FaRegEdit, {}) },
  { nombre: "video", componente: /* @__PURE__ */ jsx(GoVideo, {}) },
  { nombre: "perfume", componente: /* @__PURE__ */ jsx(TbPerfume, {}) },
  { nombre: "food", componente: /* @__PURE__ */ jsx(TbPizza, {}) },
  { nombre: "balance", componente: /* @__PURE__ */ jsx(FaBalanceScale, {}) },
  { nombre: "health", componente: /* @__PURE__ */ jsx(TbHealthRecognition, {}) },
  { nombre: "banner", componente: /* @__PURE__ */ jsx(PiFlagBannerBold, {}) },
  { nombre: "layout", componente: /* @__PURE__ */ jsx(LuLayoutGrid, {}) },
  { nombre: "computer", componente: /* @__PURE__ */ jsx(FaComputer, {}) },
  { nombre: "airplane", componente: /* @__PURE__ */ jsx(PiAirplaneTiltBold, {}) }
];
const SelectorIcono = ({ nombreIcono }) => {
  const iconoEncontrado = iconos.find((icono) => icono.nombre === nombreIcono);
  return /* @__PURE__ */ jsx(Fragment, { children: iconoEncontrado == null ? void 0 : iconoEncontrado.componente });
};
function meta$5() {
  return [
    {
      title: "Hostienda | starting form"
    },
    {
      name: "Starting form",
      content: "Starting form"
    }
  ];
}
const StartingForm = () => {
  const { categories: categories2 } = data;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[70%_30%] h-screen w-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "size-full flex flex-col gap-2 items-center justify-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 p-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-extrabold text-4xl", children: "Tell us about yourself" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Lorem ipsum dolor sit amet consectetur adipisicing elit." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx("p", { children: "Lorem ipsum dolor, sit amet consectetur adipisicing elit." }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap w-[600px]", children: categories2.map((categ, index) => {
          return /* @__PURE__ */ jsxs("button", { className: "border flex gap-2 items-center rounded-full py-2 px-4 hover:bg-slate-200 transition-colors", children: [
            /* @__PURE__ */ jsx(SelectorIcono, { nombreIcono: categ.icon }),
            categ.title
          ] });
        }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "w-full p-5 bg-gray-200 text-gray-400 rounded-full",
            disabled: true,
            children: "Continue"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center w-full p-4 border-2 bg-gradient-to-bl from-blue-800 to-blue-100" })
  ] }) });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StartingForm,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const action$3 = async ({ request }) => {
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    // successRedirect: "/",
    //failureRedirect: "/login",
  });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3
}, Symbol.toStringTag, { value: "Module" }));
function BackOfficeMenu() {
  const { state, dispatch } = useOutletContext();
  const addValue = () => {
    const newItem = {
      id: Date.now(),
      title: "",
      url: ""
    };
    dispatch({ type: "addItem", payload: newItem });
    console.log(state.items);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 border border-gray-400 w-52 rounded-full", children: [
      /* @__PURE__ */ jsx("button", { className: "bg-gray-950 text-white rounded-full p-3 px-5", children: "Links" }),
      /* @__PURE__ */ jsx("button", { className: "p-3  rounded-full", children: "Store" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: addValue,
          className: "flex justify-center items-center bg-violet-600 hover:bg-violet-500 text-white rounded-full w-full p-3",
          children: [
            /* @__PURE__ */ jsx(FaPlus, {}),
            /* @__PURE__ */ jsx("p", { children: "Add Link" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-3", children: [
        /* @__PURE__ */ jsxs("button", { className: "flex gap-2 justify-center items-center p-3 bg-slate-300 hover:bg-slate-400 border rounded-full", children: [
          /* @__PURE__ */ jsx(RiLayoutTopLine, {}),
          /* @__PURE__ */ jsx("p", { children: "Add Header" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex gap-2 justify-center items-center p-3 bg-slate-300 hover:bg-slate-400 border rounded-full", children: [
          /* @__PURE__ */ jsx(FiArchive, {}),
          "View archive",
          /* @__PURE__ */ jsx(IoIosArrowForward, {})
        ] })
      ] })
    ] })
  ] });
}
function CardBackOffice({ link }) {
  const [linkActivated, linkActive] = useState(false);
  const cardActive = () => {
    linkActive(!linkActivated);
    link.active = linkActivated;
  };
  const [inputEnabled, setInputEnabled] = useState(false);
  const toggleInput = (id) => {
    if (!inputEnabled) {
      setInputEnabled(!inputEnabled);
    } else {
      handleSaveEdit(id);
      setInputEnabled(!inputEnabled);
    }
  };
  const [editedItemUrl, setEditedItemUrl] = useState("");
  const [editedItemText, setEditedItemText] = useState("");
  const { state, dispatch } = useOutletContext();
  const handleSaveEdit = (id) => {
    dispatch({
      type: "updateItem",
      payload: {
        id,
        updatedData: {
          text: editedItemText,
          url: editedItemUrl
        }
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-3xl w-full grid grid-cols-[5%_70%_20%] gap-2 p-3 shadow-md", children: [
    /* @__PURE__ */ jsx("div", { className: "border-r self-center", children: /* @__PURE__ */ jsx(TbMenu, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-rows-[min-content_min-content_min-content] gap-3 p-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-wrap font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editedItemText,
            onChange: (e) => setEditedItemText(e.target.value),
            className: "border-none focus:border-none bg-transparent",
            placeholder: link.title,
            disabled: !inputEnabled
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => toggleInput(link.id),
            className: "opacity-50 hover:opacity-100 cursor-pointer",
            children: !inputEnabled ? /* @__PURE__ */ jsx(MdOutlineEdit, {}) : /* @__PURE__ */ jsx(FaRegSave, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex font-bold items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editedItemUrl,
            onChange: (e) => setEditedItemUrl(e.target.value),
            className: "border-none bg-transparent overflow-hidden",
            placeholder: link.url,
            disabled: !inputEnabled
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => toggleInput(link.id),
            className: "opacity-50 hover:opacity-100 cursor-pointer",
            children: !inputEnabled ? /* @__PURE__ */ jsx(MdOutlineEdit, {}) : /* @__PURE__ */ jsx(FaRegSave, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-start gap-3 p-3 text-gray-600", children: [
        /* @__PURE__ */ jsx(LuLayoutPanelLeft, { className: "hover:cursor-pointer" }),
        /* @__PURE__ */ jsx(GiRapidshareArrow, { className: "hover:cursor-pointer" }),
        /* @__PURE__ */ jsx(CiImageOn, { className: "hover:cursor-pointer" }),
        /* @__PURE__ */ jsx(CiStar, { className: "hover:cursor-pointer" }),
        /* @__PURE__ */ jsx(CiCalendar, { className: "hover:cursor-pointer" }),
        /* @__PURE__ */ jsx(CiLock, { className: "hover:cursor-pointer" }),
        /* @__PURE__ */ jsx(ImStatsBars2, { className: "hover:cursor-pointer" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-l p-2 flex justify-end", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-[min-content_1fr] grid-rows-3 lg:gap-y-4 items-center cursor-pointer self-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-bold flex justify-center size-max", children: /* @__PURE__ */ jsx(BsBoxArrowUp, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", onClick: cardActive, children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", className: "sr-only" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `block ${link.active ? `bg-green-400` : `bg-gray-600`} transition-colors w-14 h-8 rounded-full`
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `dot absolute ${link.active ? `right-2` : `left-1`} transition-all top-1 bg-white w-6 h-6 rounded-full`
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-2 text-xl flex justify-center lg:p-5 p-2 text-gray-700 hover:bg-gray-500 hover:text-white rounded-full transition-colors size-max", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => dispatch({ type: "deleteItem", payload: link.id }),
          children: /* @__PURE__ */ jsx(LuTrash2, {})
        }
      ) })
    ] }) })
  ] }) });
}
function PreviewBackOffice({ data: data2 }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "flex self-center bg-black rounded-2xl w-64 h-[28rem] p-3", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full bg-gradient-to-b from-blue-300 to-blue-500 rounded-2xl p-3 flex flex-col gap-4 justify-start overflow-y-scroll hidden-scrollbar", children: [
    /* @__PURE__ */ jsx("div", { className: "size-16 rounded-full bg-gray-700 self-center" }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-bold", children: "USER123@email.com" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "xdxdxd" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: data2.map((datos, index) => {
      return /* @__PURE__ */ jsxs(
        "a",
        {
          href: datos.url,
          className: "bg-white p-3 grid grid-cols-[80%_10%] gap-4 items-center text-sm rounded-xl shadow-md",
          children: [
            /* @__PURE__ */ jsx("p", { children: datos.title }),
            /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(BsThreeDotsVertical, {}) })
          ]
        },
        index
      );
    }) })
  ] }) }) });
}
const PriceCard = ({ plan }) => {
  const [checked, isChecked] = useState(false);
  const check = () => {
    isChecked(!checked);
  };
  console.log(plan);
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 grid-rows-[100px_263px_min-content] gap-3 h-full", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `${checked ? "bg-purple-900 text-white" : "text-black"} w-full h-[100px] flex justify-between px-6 items-center`,
        children: [
          plan.title == "Pro" && /* @__PURE__ */ jsx("div", { className: "bg-lime-400 text-black rounded-full absolute p-2 -top-4", children: "Try Pro for free" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl", children: plan.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: plan.isfor })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "input",
            {
              checked,
              className: "size-7 bg-transparent",
              type: "checkbox",
              onClick: check
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold", children: plan.isfor }),
      /* @__PURE__ */ jsx("ul", { className: "text-xs p-2 flex flex-col gap-2", children: plan.items.map((item, index) => {
        return /* @__PURE__ */ jsx("li", { children: item });
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: plan.price }),
      /* @__PURE__ */ jsx("p", { className: "text-xs", children: plan.payplan })
    ] })
  ] });
};
const PriceCard$1 = PriceCard;
const Pricing = () => {
  const { plans: plans2 } = data;
  const [visible, setVisibility] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: `${!visible ? "" : "hidden"}`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setVisibility(!visible),
        className: "text-gray-400 focus:outline-none hover:text-white absolute top-3 right-4 z-50",
        "aria-label": "Close sidebar",
        children: /* @__PURE__ */ jsx(IoIosClose, { className: "size-9" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-10 w-full px-[16%] z-50", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 grid-cols-1 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white h-[500px] w-72 rounded-lg border-2 border-purple-900", children: /* @__PURE__ */ jsx(PriceCard$1, { plan: plans2.starter }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white h-[500px] w-72 rounded-lg border-2 border-purple-900", children: /* @__PURE__ */ jsx(PriceCard$1, { plan: plans2.pro }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white h-[500px] w-72 rounded-lg border-2 border-purple-900", children: /* @__PURE__ */ jsx(PriceCard$1, { plan: plans2.premium }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-black opacity-50 w-full h-screen fixed top-0 left-0 z-40" })
  ] });
};
function meta$4() {
  return [
    {
      title: "Back Office - Page"
    },
    {
      name: "description",
      content: "Back Office - Page"
    }
  ];
}
function LayoutBackOffice() {
  const { state, dispatch } = useOutletContext();
  console.log(state);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Pricing, {}),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-0 w-full lg:h-[100%] bg-slate-200 left-0 grid lg:grid-cols-[60%_30%] grid-cols-1 lg:gap-10 gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full h-screen pt-7 px-7 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(BackOfficeMenu, {}),
        /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 p-3 overflow-y-scroll h-screen hidden-scrollbar", children: state.items.map((link, index) => {
          return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CardBackOffice, { link }) }, index);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx(PreviewBackOffice, { data: state.items }) })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LayoutBackOffice,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};
const PasswordTypeToggle = () => {
  const [visible, setVisible] = useState(false);
  const setVisibility = () => {
    setVisible(!visible);
  };
  const icon = /* @__PURE__ */ jsx(
    "span",
    {
      onClick: setVisibility,
      className: "w-[10%] opacity-60 cursor-pointer px-3",
      children: visible ? /* @__PURE__ */ jsx(FaEye, {}) : /* @__PURE__ */ jsx(FaEyeSlash, {})
    }
  );
  const inputType = visible ? "text" : "password";
  return [inputType, icon];
};
const Error$1 = ({ children }) => {
  return /* @__PURE__ */ jsx("p", { className: "text-white bg-red-500 p-2 text-center capitalize font-semibold rounded-md", children });
};
const Success = ({ children }) => {
  return /* @__PURE__ */ jsx("p", { className: "text-white bg-green-500 p-2 text-center capitalize font-semibold rounded-md", children });
};
function meta$3() {
  return [
    {
      title: "Hostienda | Register"
    },
    {
      name: "description",
      content: "Register Page"
    }
  ];
}
const loader$2 = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");
  if (authToken) {
    return redirect("/");
  }
  return null;
};
const action$2 = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
    return json({
      error: "Todos los campos son obligatorios.",
      message: ["Todos los campos son obligatorios."],
      success: false
    });
  }
  if (!validateEmail(email)) {
    return json({
      error: "formato de correo no válido.",
      message: ["formato de correo no válido."],
      success: false
    });
  }
  const response = await fetch(`${process.env.API_BASE}/register/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  const data2 = await response.json();
  if (!response.ok) {
    return json({ error: data2.error, message: data2.message, success: false });
  }
  return json({ error: "", message: [], success: true });
};
function RegisterPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.formAction === "/register";
  const isSubmittingWithGoogle = navigation.formAction === "/auth/google";
  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (actionData == null ? void 0 : actionData.error) {
      setErrorMessage(actionData.error);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 4e3);
      return () => clearTimeout(timer);
    }
    if (actionData == null ? void 0 : actionData.success) {
      setTimeout(() => {
        navigate("/login");
      }, 4e3);
    }
  }, [actionData, navigate]);
  return /* @__PURE__ */ jsxs("div", { className: " min-h-screen grid md:grid-cols-7 bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: " max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 ", children: [
      /* @__PURE__ */ jsxs(Form, { method: "post", noValidate: true, className: "grid grid-cols-1 gap-6", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: -100 },
            animate: { opacity: 1, y: 0 },
            className: " text-[2.5rem] whitespace-nowrap sm:text-5xl lg:text-6xl font-extrabold text-center px-2 pt-2 gradient-text",
            children: "Welcome"
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            className: " flex flex-col gap-3",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-sm text-center text-gray-500 font-medium", children: "Create your account" }),
              (actionData == null ? void 0 : actionData.success) && /* @__PURE__ */ jsx(Success, { children: "Registration successful!" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  formNoValidate: true,
                  type: "text",
                  placeholder: "Username",
                  className: "input z-10",
                  name: "username"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  formNoValidate: true,
                  type: "email",
                  placeholder: "Email",
                  className: "input z-10",
                  name: "email"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-200 rounded-md flex items-center w-full relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    formNoValidate: true,
                    type: `${PasswordInputType}`,
                    placeholder: "password",
                    className: "input relative w-full z-10",
                    name: "password"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: " absolute right-3 z-20", children: ToggleIcon })
              ] })
            ]
          }
        ),
        errorMessage && (actionData == null ? void 0 : actionData.message[0]) && /* @__PURE__ */ jsx(Error$1, { children: actionData == null ? void 0 : actionData.message[0] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: {
              delay: 0.15
            },
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "submit",
                value: isSubmitting ? "Loading..." : "Sign up",
                className: " bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 cursor-pointer transition z-10 w-full",
                disabled: isSubmitting
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.3
          },
          className: "flex flex-col gap-3 mt-3",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 font-medium", children: "OR" }),
            /* @__PURE__ */ jsx(Form, { method: "post", action: `/auth/${SocialsProvider.GOOGLE}`, children: /* @__PURE__ */ jsxs(
              "button",
              {
                disabled: isSubmittingWithGoogle,
                className: " w-full border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap",
                children: [
                  /* @__PURE__ */ jsx(FcGoogle, { className: "text-2xl" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: isSubmittingWithGoogle ? "Loading..." : "Continue with Google" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(Form, { children: [
              /* @__PURE__ */ jsxs("button", { className: " w-full border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap", children: [
                /* @__PURE__ */ jsx(FaApple, { className: "text-2xl" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Continue with Apple" })
              ] }),
              " "
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-gray-500 font-medium", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsx(Link, { className: "text-blue-600 text-sm tap", to: "/login", children: "Log in" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: " md:bg-gray-800 min-h-screen hidden md:block md:col-span-2" }),
    /* @__PURE__ */ jsx("button", { className: "p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700", children: /* @__PURE__ */ jsx("p", { className: "w-7 h-7", children: "?" }) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: RegisterPage,
  loader: loader$2,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const Iframe = ({ setIframeVisible, url }) => {
  const iframeRef = useRef(null);
  return /* @__PURE__ */ jsx(Draggable, { handle: ".handle", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: " absolute right-1/2 sm:right-0 lg:right-[-100px] translate-x-1/2 sm:translate-x-0 -bottom-[50px] w-[324px] h-[216px] sm:w-[405px] sm:h-[270px]", children: [
    /* @__PURE__ */ jsx(
      "iframe",
      {
        ref: iframeRef,
        id: "player",
        title: "video",
        style: { width: "100%", height: "100%" },
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        src: url
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setIframeVisible(false),
        className: "close flex items-center justify-center",
        children: /* @__PURE__ */ jsx(RiCloseFill, { className: " hover:scale-125 transition-all" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "handle flex items-center justify-center", children: /* @__PURE__ */ jsx(RiDragMove2Fill, { className: " hover:scale-125 transition-all" }) })
  ] }) }) });
};
const Iframe$1 = Iframe;
const LinkCard = ({
  label,
  url,
  setIframeVisible,
  iFrameVisible
}) => {
  return /* @__PURE__ */ jsx("div", { children: label === "favorite music video" ? /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "li",
      {
        className: "bg-slate-200 capitalize text-center text-slate-700 rounded-full px-4 py-2 hover:text-slate-200 hover:bg-transparent border border-slate-200 transition-all text-lg w-full",
        onClick: () => setIframeVisible(true),
        children: label
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: iFrameVisible && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.3 },
        exit: { y: 50, opacity: 0 },
        children: /* @__PURE__ */ jsx(Iframe$1, { setIframeVisible, url })
      }
    ) })
  ] }) : /* @__PURE__ */ jsx("li", { className: " bg-slate-200 capitalize text-center text-slate-700 rounded-full px-4 py-2 hover:text-slate-200 hover:bg-transparent border border-slate-200 transition-all", children: /* @__PURE__ */ jsx(
    "a",
    {
      target: "_blank",
      href: url,
      rel: "noreferrer",
      className: " text-lg block ",
      children: label
    }
  ) }) });
};
const LinkCard$1 = LinkCard;
const LinksContainer = ({
  setIframeVisible,
  iFrameVisible
}) => {
  const { links: links2 } = data;
  return /* @__PURE__ */ jsx("ul", { className: " flex flex-col gap-4 w-full ", children: links2.map((link, index) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    LinkCard$1,
    {
      label: link.title,
      url: link.url,
      setIframeVisible,
      iFrameVisible
    }
  ) }, index)) });
};
const SocialItem = ({ social, children }) => {
  return /* @__PURE__ */ jsx("li", { className: " hover:scale-125 transition-all cursor-pointer", children: /* @__PURE__ */ jsx("a", { href: social.url, children }) });
};
const SocialItem$1 = SocialItem;
const { socials: socials$1 } = data;
const SocialsContainer = () => {
  return /* @__PURE__ */ jsx("ul", { className: " flex justify-center gap-2 text-white text-2xl", children: socials$1.map((social, index) => {
    if (social.title.toLowerCase() === "x") {
      return /* @__PURE__ */ jsx(SocialItem$1, { social, children: /* @__PURE__ */ jsx(FaXTwitter, {}) }, index);
    }
    if (social.title.toLowerCase() === "facebook") {
      return /* @__PURE__ */ jsx(SocialItem$1, { social, children: /* @__PURE__ */ jsx(FaFacebook, {}) }, index);
    }
    if (social.title.toLowerCase() === "instagram") {
      return /* @__PURE__ */ jsx(SocialItem$1, { social, children: /* @__PURE__ */ jsx(FaInstagram, {}) }, index);
    }
    if (social.title.toLowerCase() === "spotify") {
      return /* @__PURE__ */ jsx(SocialItem$1, { social, children: /* @__PURE__ */ jsx(FaSpotify, {}) }, index);
    }
  }) });
};
const { socials } = data;
function SidebarContent() {
  const content = /* @__PURE__ */ jsx("div", { children: socials.map((link, index) => {
    if (link.title.toLowerCase() === "x") {
      return /* @__PURE__ */ jsxs(
        "a",
        {
          target: "_blank",
          rel: "noreferrer",
          href: link.url,
          className: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center",
          children: [
            /* @__PURE__ */ jsx(FaXTwitter, {}),
            "Find me in X"
          ]
        },
        index
      );
    }
    if (link.title.toLowerCase() === "facebook") {
      return /* @__PURE__ */ jsxs(
        "a",
        {
          target: "_blank",
          rel: "noreferrer",
          href: link.url,
          className: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center",
          children: [
            /* @__PURE__ */ jsx(FaFacebook, {}),
            "Find me in Facebook"
          ]
        },
        index
      );
    }
    if (link.title.toLowerCase() === "instagram") {
      return /* @__PURE__ */ jsxs(
        "a",
        {
          target: "_blank",
          rel: "noreferrer",
          href: link.url,
          className: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center",
          children: [
            /* @__PURE__ */ jsx(FaInstagram, {}),
            "Find me in Instagram"
          ]
        },
        index
      );
    }
    if (link.title.toLowerCase() === "spotify") {
      return /* @__PURE__ */ jsxs(
        "a",
        {
          target: "_blank",
          rel: "noreferrer",
          href: link.url,
          className: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center",
          children: [
            /* @__PURE__ */ jsx(FaSpotify, {}),
            "Find me in Spotify"
          ]
        },
        index
      );
    }
  }) });
  return content;
}
const Sidebar = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copy, setCopied] = useState("Copy");
  const [change, setSwitched] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const changeText = () => {
    setSwitched(true);
    navigator.clipboard.writeText("webpage url");
    setCopied("Copied");
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSwitched(false);
      setCopied("Copy");
    }, 3e3);
    return () => {
      clearTimeout(timeout);
    };
  }, [change]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed z-20 left-0 top-0 h-screen flex overflow-hidden transition-all duration-1000 transform ${isOpen ? " translate-x-0" : " -translate-x-full"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "z-20 bg-gray-800 w-64 pt-5 pb-4 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-white text-xl font-semibold", children: title }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: toggleSidebar,
                  className: "text-gray-400 focus:outline-none focus:text-white",
                  "aria-label": "Close sidebar",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "h-6 w-6",
                      fill: "none",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: /* @__PURE__ */ jsx("path", { d: "M6 18L18 6M6 6l12 12" })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("nav", { className: "mt-5", children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsx(SidebarContent, {}) }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 mx-2", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: changeText,
                  className: " grid grid-cols-6 gap-3 items-center cursor-pointer group border border-gray-600 py-1 px-2 rounded-lg w-full text-white bg-gray-600 hover:bg-gray-700 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(FaMehBlank, { className: "text-2xl text-green-700" }),
                    /* @__PURE__ */ jsx("span", { className: " col-span-3", children: " webpage url" }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        id: "url-for-copy",
                        className: `${change ? "text-green-500" : "text-gray-950"}  col-span-2 block group-active:scale-95 border border-transparent border-l-gray-500 border-dotted p-3 text-sm`,
                        children: copy
                      }
                    )
                  ]
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Form, { action: "/logout", method: "post", className: "px-2", children: /* @__PURE__ */ jsxs("button", { className: " w-full text-white px-2 py-1 bg-gray-600 hover:bg-gray-700 transition-colors rounded-md flex justify-center items-center gap-2 ", children: [
            /* @__PURE__ */ jsx(CiLogout, {}),
            " Log out"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed top-4 left-0 sm:left-4 z-10 flex-shrink-0 flex h-16 scale-75", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: toggleSidebar,
        className: "px-4 text-white hover:text-gray-600 focus:outline-none rounded-full hover:bg-gray-100 focus:text-gray-600 transition-colors",
        "aria-label": "Open sidebar",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "h-8 w-8",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", { d: "M4 6h16M4 12h16m-7 6h7" })
          }
        )
      }
    ) })
  ] });
};
function meta$2() {
  return [
    {
      title: "Hostienda | Homepage"
    },
    {
      name: "description",
      content: "Home page"
    }
  ];
}
const loader$1 = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");
  if (!authToken) {
    return redirect("/login");
  }
  return null;
};
function Index() {
  const [iFrameVisible, setIframeVisible] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: " bg-home min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-10 pt-20 max-w-3xl mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: " relative ", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            transition: {
              type: "tween",
              duration: 0.2
            },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: data.avatar,
                alt: "avatar",
                className: " bg-slate-100 rounded-[50%] w-24 h-24 object-cover mx-auto border-2 border-solid border-slate-200 "
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            className: "absolute bottom-0 right-0 text-4xl",
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 1 },
            transition: {
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7
            },
            children: "👋"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          className: " text-center capitalize text-slate-200",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "  text-3xl font-bold", children: data.name }),
            /* @__PURE__ */ jsx("p", { className: " text-lg ", children: data.desc })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.15 },
        children: /* @__PURE__ */ jsx(
          LinksContainer,
          {
            setIframeVisible,
            iFrameVisible
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.3 },
        className: " text-white  text-2xl text-center capitalize flex //flex-col justify-center gap-2 //mb-14",
        children: /* @__PURE__ */ jsx(SocialsContainer, {})
      }
    ),
    /* @__PURE__ */ jsx(Sidebar, { title: "Social Media" })
  ] }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
function meta$1() {
  return [
    {
      title: "Hostienda | Styles"
    },
    {
      name: "description",
      content: "Styles page"
    }
  ];
}
function Styles() {
  const { styles: styles2 } = data;
  return /* @__PURE__ */ jsxs("div", { className: " min-h-screen bg-slate-200 ", children: [
    /* @__PURE__ */ jsxs("div", { className: "py-4 max-w-3xl mx-auto px-4 sm:px-6 ", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Buttons" }),
      /* @__PURE__ */ jsxs("div", { className: " bg-white p-4 rounded-lg flex flex-col gap-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: " pb-2", children: "Border" }),
          /* @__PURE__ */ jsx("div", { className: " grid grid-cols-1  sm:grid-cols-3 gap-4 ", children: styles2.border.map((style, index) => {
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: ` border h-10 bg-black ${style.class} `
              },
              index
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: " pb-2", children: "Soft shadow" }),
          /* @__PURE__ */ jsx("div", { className: " grid grid-cols-1  sm:grid-cols-3 gap-6 sm:gap-4 ", children: styles2.softShadow.map((style, index) => {
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: ` border h-10 ${style.class} `
              },
              index
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: " pb-2", children: "Hard shadow" }),
          /* @__PURE__ */ jsx("div", { className: " grid grid-cols-1  sm:grid-cols-3 gap-4 ", children: styles2.hardShadow.map((style, index) => {
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: " relative z-0 h-10",
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `h-full w-full border bg-white ${style.class}`
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: ` h-full w-full bg-black absolute top-[0.30rem] left-[0.30rem] -z-10 ${style.class} `
                    }
                  )
                ]
              },
              index
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: " flex gap-3 items-center pb-2", children: [
            /* @__PURE__ */ jsx("p", { children: "Special" }),
            /* @__PURE__ */ jsxs("p", { className: " bg-black text-white px-2 rounded-md flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { children: "Upgrade" }),
              /* @__PURE__ */ jsx(IoMdLock, {})
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: " box01 h-10 bg-black" }),
            /* @__PURE__ */ jsx("div", { className: " box02 h-10 bg-black" }),
            /* @__PURE__ */ jsx("div", { className: "  h-10 bg-black rounded-l-full" }),
            /* @__PURE__ */ jsxs("div", { className: " h-10 relative", children: [
              /* @__PURE__ */ jsx("div", { className: " absolute top-1/2 -translate-y-1/2 h-[75%] w-full border border-black border-solid" }),
              /* @__PURE__ */ jsx("div", { className: " absolute left-1/2 -translate-x-1/2 w-[95%] h-full border border-black border-solid" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "  h-10 bg-black rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: " h-10 relative", children: [
              /* @__PURE__ */ jsx("div", { className: " absolute w-full h-full border border-black border-solid" }),
              /* @__PURE__ */ jsx("div", { className: " absolute -top-1 -left-1 bg-white w-2 h-2 border border-black border-solid" }),
              /* @__PURE__ */ jsx("div", { className: " absolute -top-1 -right-1 bg-white w-2 h-2 border border-black border-solid" }),
              /* @__PURE__ */ jsx("div", { className: " absolute -bottom-1 -left-1 bg-white w-2 h-2 border border-black border-solid" }),
              /* @__PURE__ */ jsx("div", { className: " absolute -bottom-1 -right-1 bg-white w-2 h-2 border border-black border-solid" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "py-4 max-w-3xl mx-auto px-4 sm:px-6 ", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Backgrounds" }),
      /* @__PURE__ */ jsx("div", { className: " bg-white p-4 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: " grid grid-cols-1  sm:grid-cols-3 gap-4 ", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: " h-[30rem] sm:h-80 bg-gray-300 rounded-md" }),
          /* @__PURE__ */ jsx("p", { className: " pt-2 text-center", children: "Flat Colour" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: " h-[30rem] sm:h-80 bg-home rounded-md" }),
          /* @__PURE__ */ jsx("p", { className: " pt-2 text-center", children: "Gradient" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " relative", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: " h-[30rem] sm:h-80 border border-black rounded-md",
              style: {
                backgroundImage: 'url("/no-image.svg")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "30%",
                opacity: "0.2"
              }
            }
          ),
          /* @__PURE__ */ jsx("p", { className: " pt-2 text-center", children: "Image" }),
          /* @__PURE__ */ jsxs("p", { className: " absolute top-3 right-3 bg-black text-white px-2 rounded-md flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { children: "Upgrade" }),
            /* @__PURE__ */ jsx(IoMdLock, {})
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Styles,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta() {
  return [
    {
      title: "Hostienda | Login"
    },
    {
      name: "description",
      content: "Login Page"
    }
  ];
}
const loader = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");
  if (authToken) {
    return redirect("/");
  }
  return null;
};
const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (email.trim() === "" || password.trim() === "") {
    return json({ error: "Todos los campos son obligatorios." });
  }
  if (!validateEmail(email)) {
    return json({
      error: "formato de correo no válido."
    });
  }
  const response = await fetch(`${process.env.API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data2 = await response.json();
  if (!response.ok) {
    return json({ error: data2.error });
  }
  const session = await sessionStorage.getSession();
  session.set("authToken", data2.token);
  const cookieHeader = await sessionStorage.commitSession(session);
  return redirect("/", {
    headers: {
      "Set-Cookie": cookieHeader
    }
  });
};
function LoginPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/login";
  const isSubmittingWithGoogle = navigation.formAction === "/auth/google";
  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (actionData == null ? void 0 : actionData.error) {
      setErrorMessage(actionData.error);
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 4e3);
      return () => clearTimeout(timer);
    }
  }, [actionData]);
  return /* @__PURE__ */ jsxs("div", { className: " min-h-screen grid md:grid-cols-7 bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: " max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 ", children: [
      /* @__PURE__ */ jsxs(Form, { method: "post", noValidate: true, className: "grid grid-cols-1 gap-6", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: -100 },
            animate: { opacity: 1, y: 0 },
            className: " text-[2.5rem] whitespace-nowrap sm:text-5xl lg:text-6xl font-extrabold text-center px-2 pt-2 gradient-text",
            children: "Welcome Back"
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            className: " flex flex-col gap-3",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-sm text-center text-gray-500 font-medium", children: "Log into your account" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  formNoValidate: true,
                  type: "email",
                  placeholder: "Email",
                  className: "input z-10",
                  name: "email"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-200 rounded-md flex items-center w-full relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    formNoValidate: true,
                    type: `${PasswordInputType}`,
                    placeholder: "password",
                    className: "input relative w-full z-10",
                    name: "password"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: " absolute right-3 z-20", children: ToggleIcon })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(Link, { className: "text-blue-600 text-sm z-10 tap", to: "#", children: "Forgot your password?" }),
                /* @__PURE__ */ jsx(Link, { className: "text-blue-600 text-sm tap", to: "#", children: "Forgot your username?" })
              ] })
            ]
          }
        ),
        errorMessage && (actionData == null ? void 0 : actionData.error) && ((actionData == null ? void 0 : actionData.error) === "Unauthorized" ? /* @__PURE__ */ jsx(Error$1, { children: "usuario no valido" }) : /* @__PURE__ */ jsx(Error$1, { children: actionData == null ? void 0 : actionData.error })),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: {
              delay: 0.15
            },
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "submit",
                value: isSubmitting ? "Loading..." : "Log in",
                className: " bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 cursor-pointer transition z-10 w-full",
                disabled: isSubmitting
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.3
          },
          className: "flex flex-col gap-3 mt-3",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 font-medium", children: "OR" }),
            /* @__PURE__ */ jsx(Form, { method: "post", action: `/auth/${SocialsProvider.GOOGLE}`, children: /* @__PURE__ */ jsxs(
              "button",
              {
                disabled: isSubmittingWithGoogle,
                className: " w-full border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap",
                children: [
                  /* @__PURE__ */ jsx(FcGoogle, { className: "text-2xl" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: isSubmittingWithGoogle ? "Loading..." : "Continue with Google" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(Form, { children: [
              /* @__PURE__ */ jsxs("button", { className: " w-full border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap", children: [
                /* @__PURE__ */ jsx(FaApple, { className: "text-2xl" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Continue with Apple" })
              ] }),
              " "
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-gray-500 font-medium", children: [
              "Don't have an account?",
              " ",
              /* @__PURE__ */ jsx(Link, { className: "text-blue-600 text-sm tap", to: "/register", children: "Sign up" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: " md:bg-gray-800 min-h-screen hidden md:block md:col-span-2" }),
    /* @__PURE__ */ jsx("button", { className: "p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700", children: /* @__PURE__ */ jsx("p", { className: "w-7 h-7", children: "?" }) })
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: LoginPage,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BK0etdqZ.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/index-Dakp_wjs.js", "/assets/index-Lukm6YUc.js", "/assets/components-Ccifui0g.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-ikmUx3Pv.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/index-Dakp_wjs.js", "/assets/index-Lukm6YUc.js", "/assets/components-Ccifui0g.js", "/assets/motion-Bkk8oeq9.js"], "css": ["/assets/root-W3EKl5Bb.css"] }, "routes/auth.google.callback": { "id": "routes/auth.google.callback", "parentId": "routes/auth.google", "path": "callback", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.google.callback-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/starting-form": { "id": "routes/starting-form", "parentId": "root", "path": "starting-form", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/starting-form-D6bMZmxS.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/iconBase-DvZdvrSa.js", "/assets/data-zXapBcoF.js", "/assets/index-iFjJa3Ye.js", "/assets/index-B2-UYCws.js", "/assets/index-BZGw8SPp.js"], "css": [] }, "routes/auth.google": { "id": "routes/auth.google", "parentId": "root", "path": "auth/google", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.google-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/back-office": { "id": "routes/back-office", "parentId": "root", "path": "back-office", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/back-office-y0jbIb76.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/iconBase-DvZdvrSa.js", "/assets/index-iFjJa3Ye.js", "/assets/index-BsGXlgFu.js", "/assets/index-Dh9J8NU9.js", "/assets/index-Dakp_wjs.js", "/assets/index-BZGw8SPp.js", "/assets/data-zXapBcoF.js"], "css": [] }, "routes/register": { "id": "routes/register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/register-DD9ZEiQd.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/iconBase-DvZdvrSa.js", "/assets/index-iFjJa3Ye.js", "/assets/index-Dakp_wjs.js", "/assets/index-Lukm6YUc.js", "/assets/index-ZNyEqn1R.js", "/assets/index-B2-UYCws.js", "/assets/components-Ccifui0g.js", "/assets/motion-Bkk8oeq9.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DBTPZPid.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/iconBase-DvZdvrSa.js", "/assets/index-Dakp_wjs.js", "/assets/data-zXapBcoF.js", "/assets/index-BsGXlgFu.js", "/assets/index-Lukm6YUc.js", "/assets/motion-Bkk8oeq9.js", "/assets/index-B2-UYCws.js", "/assets/index-iFjJa3Ye.js"], "css": ["/assets/_index-NL4AI-j4.css"] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/styles": { "id": "routes/styles", "parentId": "root", "path": "styles", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/styles-CxyGpHfY.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/iconBase-DvZdvrSa.js", "/assets/data-zXapBcoF.js", "/assets/index-Dh9J8NU9.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-BeID8ITG.js", "imports": ["/assets/jsx-runtime-ByGpHSPZ.js", "/assets/iconBase-DvZdvrSa.js", "/assets/index-iFjJa3Ye.js", "/assets/index-Dakp_wjs.js", "/assets/index-Lukm6YUc.js", "/assets/index-ZNyEqn1R.js", "/assets/index-B2-UYCws.js", "/assets/components-Ccifui0g.js", "/assets/motion-Bkk8oeq9.js"], "css": [] } }, "url": "/assets/manifest-be741be2.js", "version": "be741be2" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/auth.google.callback": {
    id: "routes/auth.google.callback",
    parentId: "routes/auth.google",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/starting-form": {
    id: "routes/starting-form",
    parentId: "root",
    path: "starting-form",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/auth.google": {
    id: "routes/auth.google",
    parentId: "root",
    path: "auth/google",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/back-office": {
    id: "routes/back-office",
    parentId: "root",
    path: "back-office",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/styles": {
    id: "routes/styles",
    parentId: "root",
    path: "styles",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
