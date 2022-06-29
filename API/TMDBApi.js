const API_TOKEN = "7d7cdd863a05a805a53aa89d5089895f";

export function getFilmsFromApiWithSearchedText(text, page) {
	const url =
		"https://api.themoviedb.org/3/search/movie?api_key=" +
		API_TOKEN +
		"&language=fr&query=" +
		text + '&page=' + page;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
export function getImageFromApi(name) {
	return "https://image.tmdb.org/t/p/w300" + name;
}
