import { validateURL } from '../utils/validateUrl';
import { parseTimestamp } from '../utils/parseTimestamp';
import { domainNameExtractor } from '../utils/domainNameExtractor';

test('validateURL', () => {
	expect(validateURL('https://jestjs.io/')).toBe(true);
	expect(validateURL('https://www.jestjs.io')).toBe(true);
	expect(validateURL('http://testmysite.thinkwithgoogle.com')).toBe(true);
	expect(validateURL('mailto://freecodecamp.org')).toBe(true);
	expect(validateURL('http://localhost:3000')).toBe(true);
	expect(validateURL('http://localhost:3000?data=123')).toBe(true);
	expect(validateURL('http://127.0.0.1:5173')).toBe(true);
	expect(validateURL('www.jestjs.io')).toBe(false);
	expect(validateURL('jestjs.io')).toBe(false);
	expect(validateURL('jestjs')).toBe(false);
	expect(validateURL('')).toBe(false);
	expect(validateURL('Hello :)')).toBe(false);
});

test('parseTimestamp', () => {
	expect(parseTimestamp('1681824636123')).toBe('18.04.23');
	expect(parseTimestamp('')).toBe('');
});

test('domainNameExtractor', () => {
	expect(domainNameExtractor('https://jestjs.io/')).toBe('jestjs');
	expect(domainNameExtractor('Hello')).toBe('Hello');
	expect(domainNameExtractor('http://localhost:3000?data=123')).toBe('localhost:3000?data=123');
	expect(domainNameExtractor('www.jestjs.io')).toBe('jestjs');
	expect(domainNameExtractor('http://127.0.0.1:5173/')).toBe('127');
	expect(domainNameExtractor('')).toBe('');
});
