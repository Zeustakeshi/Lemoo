export const redirectToSSO = () => {
  const callbackUrl = encodeURIComponent(window.location.href);
  window.location.href = `http://sso.lemoo.com:5172/auth/login?callback_url=${callbackUrl}`;
};
