export function getRoundedClass(style: string) {
  switch (style) {
    case "round":
      return "rounded-full";
    case "semi-round":
      return "rounded-lg";
    case "none":
      return "rounded-none";
  }
}

export function getShadowClass(style: string) {
  switch (style) {
    case "soft":
      return "shadow-md";
    case "middle":
      return "shadow-lg";
    case "heavy":
      return "shadow-heavy";
  }
}

export function getSpecialButtonClass(style: string) {
  switch (style) {
    case "wave":
      return "box01 bg-black";
    case "label":
      return "rounded-l-full bg-black";
    case "triangle":
      return "box02 bg-black";
  }
}

export function getSBackgroundClass(style: string) {
  switch (style) {
    case "Linear":
      return " bg-gray-300";
    case "Gradient":
      return " bg-home";
  }
}

//array of link-colors
export const COLORS = [
  "bg-white",
  "bg-[#0f0]",
  "bg-[#FD3E81]",
  "bg-[#FF7F11]",
  "bg-[#06BEE1]",
  "bg-[#ABA194]",
];
