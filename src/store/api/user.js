import { http } from '@/store/api';

export const getUser = god => http.get('user/profile', { params: { god } });
export const register = ({ username, password, email }) => http.post('user/register', { username, password, email });
export const login = ({ email, password }) => http.patch('user/login', { email, password });
