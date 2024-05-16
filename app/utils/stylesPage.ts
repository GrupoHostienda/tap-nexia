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

/* export function getShadowClass(style: string) {
  switch (style) {
    case "soft":
      return "shadow-md";
    case "middle":
      return "shadow-lg rounded-lg";
    case "heavy":
      return "shadow-xl rounded-full";
    case "none":
      return "";
    default: ************************************************
      return "";
  }
} */

export function getShadowClass(style: string) {
  switch (style) {
    case "soft":
      return "shadow-md";
    case "middle":
      return "shadow-lg";
    case "heavy" || "none":
      return "";
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
