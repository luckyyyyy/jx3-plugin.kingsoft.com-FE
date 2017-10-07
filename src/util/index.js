export const isDevelop = () => process.env.NODE_ENV !== 'production';
export const isInWechat = () => /micromessenger/.test(navigator.userAgent.toLowerCase());
export const isMobileDevice = () => /mobile/i.test(navigator.userAgent.toLowerCase());
export const isios = () => /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
export const isAndroid = () => /android/.test(navigator.userAgent.toLowerCase());
export const isClient = () => process.env.VUE_ENV !== 'server';
