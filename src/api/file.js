import { http } from '@/api';

export const getList = type => http.get(`dbm/file/${type}`);
export const getFile = id => http.get(`dbm/file/${id}`);
