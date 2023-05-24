import { getEnvironmentConfig } from '../../env/env';

const env = getEnvironmentConfig();

const hostname = env.backend.host;

export const SIGNUP = `${hostname}api/register`;

export const LOGIN = `${hostname}api/login`;

export const PRESCRIPTION_UPLOAD = `${hostname}/api/upload`;
