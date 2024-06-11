export const validateEmail = (email: string) => {
  // Expresión regular para validar el formato de correo electrónico
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

export const validateUrl = (url: string) => {
  // Expresión regular para validar el formato de correo electrónico
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

/* export function applyNewStyle(
  defaultStyle: string,
  color: string,
  rounded: string,
  shadow: string
) {
  let updatedString = defaultStyle;
  // Reemplazar cualquier clase de fondo `bg-*`
  updatedString = color
    ? updatedString.replace(/bg-[^\s]+/, color)
    : updatedString;

  // Reemplazar color de texto para cuando bg-black
  updatedString =
    color === "bg-black"
      ? updatedString.replace("text-black", "text-white")
      : updatedString;

  // Reemplazar cualquier clase de redondeo `rounded-*`
  updatedString = rounded
    ? updatedString.replace(/rounded-[^\s]+/, rounded)
    : updatedString;

  // Reemplazar cualquier clase de sombra `shadow-*`
  updatedString = shadow
    ? updatedString.replace(/shadow-[^\s]+/, shadow)
    : updatedString;

  return updatedString;
}
 */
