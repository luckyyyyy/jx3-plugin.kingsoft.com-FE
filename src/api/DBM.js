import { http } from '@/api';

export const check = data => http.post('dbm/check', { data });
export const upload = data => http.post('dbm/upload', { data });
export const edit = (id, data) => http.patch(`dbm/upload/${id}`, { data });
