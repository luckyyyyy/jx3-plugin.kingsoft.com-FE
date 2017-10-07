import { isDevelop, isClient } from '@/util';

export const BASE_URL = (() => {
  if (isDevelop()) {
    if (isClient()) {
      return `${window.location.origin}/api`;
    }
    return 'http://localhost:9999/api';
  }
  return 'https://jx3-plugin.kingsoft.com/api';
})();
export const ROUTER_BASE = '';
