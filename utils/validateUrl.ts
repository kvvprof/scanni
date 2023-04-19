import validUrl from 'valid-url';

export const validateURL = (str: string): boolean => (validUrl.isUri(str) ? true : false);
