export const dateConvertor = (date: string, withTime?: boolean) => {
	const parsedDate = new Date(Date.parse(date)).toLocaleDateString();

	if (withTime) {
		const parsedTime = new Date(Date.parse(date)).toLocaleTimeString();

		return `${parsedDate.replace(/\./g, '/')} at ${parsedTime}`;
	}

	return parsedDate;
};
