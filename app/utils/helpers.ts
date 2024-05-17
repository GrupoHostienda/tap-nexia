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