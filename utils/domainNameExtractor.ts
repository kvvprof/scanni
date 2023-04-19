export const domainNameExtractor = (url: string): string =>
	url.replace('http://', '').replace('https://', '').replace('www.', '').split('.')[0];
