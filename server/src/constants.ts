import 'dotenv/config';

export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = 'forget-password:';
export const FRONTEND_URL = process.env.FRONTEND_URL;