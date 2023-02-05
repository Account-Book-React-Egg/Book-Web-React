const TOKEN_KEY = 'token';

export type Token = Record<'token' | 'refreshToken', string>;

export function setToken(token: Token) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function getToken(): Token {
    return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}');
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function hasToken() {
    return !!getToken().token;
}
