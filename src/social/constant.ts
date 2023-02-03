import * as config from 'config';

export const socialCallbackUrl = config.get<string>('oauth.callbackUrl');
