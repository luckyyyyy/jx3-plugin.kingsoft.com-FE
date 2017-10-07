import { isDevelop, isClient } from '@/util';
import env from '@/config/env.json';

export const GLOBAL_TITLE = '差评';
export const BASE_URL = (() => {
  if (isDevelop()) {
    if (isClient()) {
      return `${window.location.origin}/api`;
    }
    return env.dev.baseUrl;
  }
  return env.prod.baseUrl;
})();
export const AUTH_URL = '/login'
export const ROUTER_BASE = '';
