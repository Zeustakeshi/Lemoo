export const redirectToSSO = () => {
  window.location.href = `http://sso.lemoo.com:5172/auth/login?callback_url=http://seller.lemoo.com:5173`;
};
