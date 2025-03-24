export const redirectToSSO = () => {
    window.location.href = import.meta.env.VITE_SSO_CALLBACK_URL;
};
