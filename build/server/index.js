import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { FaPlus, FaMehBlank, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiLayoutTopLine, RiCloseFill, RiDragMove2Fill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { BsBoxArrowUp, BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Draggable from "react-draggable";
import { FaXTwitter, FaFacebook, FaInstagram, FaSpotify, FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
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
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
function BackOfficeMenu() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 border border-gray-400 w-52 rounded-full", children: [
      /* @__PURE__ */ jsx("button", { className: "bg-gray-950 text-white rounded-full p-3 px-5", children: "Links" }),
      /* @__PURE__ */ jsx("button", { className: "p-3  rounded-full", children: "Store" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs("button", { className: "flex justify-center items-center bg-violet-600 hover:bg-violet-500 text-white rounded-full w-full p-3", children: [
        /* @__PURE__ */ jsx(FaPlus, {}),
        /* @__PURE__ */ jsx("p", { children: "Add Link" })
      ] }),
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
function CardBackOffice({ text, url, id }) {
  const [linkActivated, linkActive] = useState(false);
  const cardActive = () => {
    linkActive(!linkActivated);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-3xl w-full grid grid-cols-[5%_70%_20%] gap-2 p-3 shadow-md", children: [
    /* @__PURE__ */ jsx("div", { className: "border-r self-center", children: /* @__PURE__ */ jsx(TbMenu, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-rows-[min-content_min-content_min-content] gap-3 p-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-wrap font-bold flex items-center gap-2", children: [
        text,
        /* @__PURE__ */ jsx(MdOutlineEdit, { className: "opacity-50 hover:opacity-100 cursor-pointer" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex font-bold items-center gap-2", children: [
        url.substring(0, 19).concat("..."),
        /* @__PURE__ */ jsx(MdOutlineEdit, { className: "opacity-50 hover:opacity-100 cursor-pointer" })
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
        /* @__PURE__ */ jsx("div", { className: `block ${linkActivated ? `bg-green-400` : `bg-gray-600`} transition-colors w-14 h-8 rounded-full` }),
        /* @__PURE__ */ jsx("div", { className: `dot absolute ${linkActivated ? `right-2` : `left-1`} transition-all top-1 bg-white w-6 h-6 rounded-full` })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-2 text-xl flex justify-center lg:p-5 p-2 text-gray-700 hover:bg-gray-500 hover:text-white rounded-full transition-colors size-max", children: /* @__PURE__ */ jsx(LuTrash2, {}) })
    ] }) })
  ] }, id) });
}
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
const data = {
  name,
  desc,
  avatar,
  links,
  socials: socials$2
};
function PreviewBackOffice() {
  const { links: links2 } = data;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "flex self-center bg-black rounded-2xl w-64 h-[28rem] p-3", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full bg-gradient-to-b from-blue-300 to-blue-500 rounded-2xl p-3 flex flex-col gap-4 justify-start overflow-y-scroll hidden-scrollbar", children: [
    /* @__PURE__ */ jsx("div", { className: "size-16 rounded-full bg-gray-700 self-center" }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-bold", children: "USER123@email.com" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "xdxdxd" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: links2.map((link, index) => {
      return /* @__PURE__ */ jsxs("a", { href: link.url, className: "bg-white p-3 grid grid-cols-[80%_10%] gap-4 items-center text-sm rounded-xl shadow-md", children: [
        /* @__PURE__ */ jsx("p", { children: link.title }),
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(BsThreeDotsVertical, {}) })
      ] });
    }) })
  ] }) }) });
}
function meta$2() {
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
  const { links: links2 } = data;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "absolute top-0 w-full lg:h-[100%] bg-slate-200 left-0 grid lg:grid-cols-[60%_30%] grid-cols-1 lg:gap-10 gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full h-screen pt-7 px-7 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(BackOfficeMenu, {}),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 p-3 overflow-y-scroll h-screen hidden-scrollbar", children: links2.map((link, index) => {
        return /* @__PURE__ */ jsx(CardBackOffice, { text: link.title, url: link.url, id: index });
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx(PreviewBackOffice, {}) })
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LayoutBackOffice,
  meta: meta$2
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
        children: /* @__PURE__ */ jsxs("div", { className: `z-20 bg-gray-800 w-64 pt-5 pb-4`, children: [
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
                className: " grid grid-cols-6 gap-3 items-center cursor-pointer group border border-gray-600 py-1 px-2 rounded-lg w-full text-white bg-gray-600",
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
function meta$1() {
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
function Index() {
  const [iFrameVisible, setIframeVisible] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-10 pt-20 max-w-3xl mx-auto px-4 sm:px-6", children: [
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
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
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
const Error = ({ children }) => {
  return /* @__PURE__ */ jsx("p", { className: "text-white bg-red-500 p-2 text-center capitalize font-semibold rounded-md", children });
};
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
function LoginPage() {
  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false
  });
  const [correoValido, setCorreoValido] = useState(true);
  const [submitted, setSumitted] = useState(false);
  const handleInputChange = (e) => {
    const { name: name2, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name2]: value
    }));
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    const errors = {
      email: formData.email.trim() === "",
      password: formData.password.trim() === ""
    };
    setFormError(errors);
    const isValidEmail = validateEmail(formData.email);
    setCorreoValido(isValidEmail);
    if (!errors.email && !errors.password && isValidEmail) {
      try {
        setSumitted(true);
        setTimeout(() => {
          setSumitted(false);
        }, 5e3);
        setFormData({
          email: "",
          password: ""
        });
      } catch (error) {
        console.log("error:", error);
      }
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: " min-h-screen grid md:grid-cols-7 bg-gray-50", children: [
    /* @__PURE__ */ jsx("div", { className: " max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 ", children: /* @__PURE__ */ jsxs("form", { action: "#", className: "grid grid-cols-1 gap-6", children: [
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
                placeholder: "Email or username",
                className: "input z-10",
                name: "email",
                value: formData.email,
                onChange: handleInputChange
              }
            ),
            !formError.email && !correoValido && /* @__PURE__ */ jsx(Error, { children: "Introduzca un email valido" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-200 rounded-md flex items-center w-full relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  formNoValidate: true,
                  type: `${PasswordInputType}`,
                  placeholder: "password",
                  className: "input relative w-full z-10",
                  value: formData.password,
                  name: "password",
                  onChange: handleInputChange
                }
              ),
              /* @__PURE__ */ jsx("div", { className: " absolute right-3 z-20", children: ToggleIcon })
            ] }),
            (formError.email || formError.password) && /* @__PURE__ */ jsx(Error, { children: "Todos los campos son obligatorios" }),
            submitted && /* @__PURE__ */ jsx("p", { className: " text-white bg-green-500 p-2 text-center capitalize font-semibold rounded-md", children: "Form enviada con exito" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(Link, { className: "text-blue-600 text-sm z-10 tap", to: "#", children: "Forgot your password?" }),
              /* @__PURE__ */ jsx(Link, { className: "text-blue-600 text-sm tap", to: "#", children: "Forgot your username?" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: " flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: {
              delay: 0.15
            },
            className: "",
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "submit",
                value: "Log in",
                className: "bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 cursor-pointer transition z-10 w-full",
                onClick: handleSubmit
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: {
              delay: 0.3
            },
            className: "flex flex-col gap-3",
            children: [
              /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 font-medium", children: "OR" }),
              /* @__PURE__ */ jsxs("button", { className: "border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap", children: [
                /* @__PURE__ */ jsx(FcGoogle, { className: "text-2xl" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Continue with Google" })
              ] }),
              /* @__PURE__ */ jsxs("button", { className: "border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap", children: [
                /* @__PURE__ */ jsx(FaApple, { className: "text-2xl" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Continue with Apple" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-gray-500 font-medium", children: [
                "Don't have an account?",
                " ",
                /* @__PURE__ */ jsx(Link, { className: "text-blue-600 text-sm tap", to: "#", children: "Sign up" })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: " md:bg-gray-800 min-h-screen hidden md:block md:col-span-2" }),
    /* @__PURE__ */ jsx("button", { className: "p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700", children: /* @__PURE__ */ jsx("p", { className: "w-7 h-7", children: "?" }) })
  ] }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoginPage,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CkLoXamg.js", "imports": ["/assets/jsx-runtime-Dslbdtkn.js", "/assets/index-B_WZbPg-.js", "/assets/components-D4VHOdRu.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-pkTCi30_.js", "imports": ["/assets/jsx-runtime-Dslbdtkn.js", "/assets/index-B_WZbPg-.js", "/assets/components-D4VHOdRu.js"], "css": ["/assets/root-S4GDxjfO.css"] }, "routes/backOffice": { "id": "routes/backOffice", "parentId": "root", "path": "backOffice", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/backOffice-B1Q90p6C.js", "imports": ["/assets/jsx-runtime-Dslbdtkn.js", "/assets/index-JVxX3RAq.js", "/assets/data-B0nvWXL0.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-Bz-skP_C.js", "imports": ["/assets/jsx-runtime-Dslbdtkn.js", "/assets/index-JVxX3RAq.js", "/assets/data-B0nvWXL0.js", "/assets/index-B_WZbPg-.js", "/assets/index-CbsFYZHF.js"], "css": ["/assets/_index-NL4AI-j4.css"] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-DRPueOqt.js", "imports": ["/assets/jsx-runtime-Dslbdtkn.js", "/assets/index-JVxX3RAq.js", "/assets/index-B_WZbPg-.js", "/assets/index-CbsFYZHF.js", "/assets/components-D4VHOdRu.js"], "css": [] } }, "url": "/assets/manifest-8fe87f2d.js", "version": "8fe87f2d" };
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
  "routes/backOffice": {
    id: "routes/backOffice",
    parentId: "root",
    path: "backOffice",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route3
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
