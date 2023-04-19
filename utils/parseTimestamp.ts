export const parseTimestamp = (timestamp: string): string => {
	if (!timestamp) {
		return '';
	}

	const date = new Date(new Date(+timestamp).toISOString());
	const day = date.getDate();
	const month = +date.getMonth() + 1;
	const getFullYear = date.getFullYear();

	return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${getFullYear.toString().slice(2)}`;
};
