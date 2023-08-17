const url = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=%3CREQUIRED%3E&to=%3CREQUIRED%3E&date=%3CREQUIRED%3E&adult=%3CREQUIRED%3E';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd413b30fefmsh6cfba2a3cf56ddap18b957jsn93fe1cc335fa',
		'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}