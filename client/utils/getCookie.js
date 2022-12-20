import Cookies from 'js-cookie';

export const getCookie = (name) => {
    const cookie = Cookies.get(name);
    return cookie;
}