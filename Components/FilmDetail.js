import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	Button,
} from "react-native";
import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApi";
import MyActivityIndicator from "./MyActivityIndicator";
import moment from "moment";
import numeral from "numeral";
import { connect } from "react-redux";

const FilmDetail = (props) => {
	const [state, setState] = useState({
		film: undefined,
		isLoading: true,
	});
	useEffect(() => {
		getFilmDetailFromApi(props.navigation.state.params.idFilm).then((data) => {
			setState({
				film: data,
				isLoading: false,
			});
		});
	}, []);
	const _toggleFavorite = () => {
		const action = { type: "TOGGLE_FAVORITE", value: state.film };
		props.dispatch(action);
	};
	// const componentDidUpdate = () => {
	//       console.log('************************************', props.favoritesFilm)
	// }
	// const _displayFavoriteImage = () => {
      //       var sourceImage = require("../Images/favorite.png");
      //       console.log("IMAGE PROPS", props.favoritesFilm);
	// 	if (
	// 		props.favoritesFilm.findIndex(item => item.id === state.film.id) !== -1
	// 	) {
	// 		// Film dans nosr favoris
	// 		sourceImage = require("../Images/no_favorite.png");
	// 	}
	// 	return (<Image style={styles.favorite_image} source={sourceImage} />);
	// };

	const _displayFilm = () => {
		const film = state.film;
		if (film != undefined) {
			return (
				<ScrollView style={styles.scrollview_container}>
					<Image
						style={styles.image}
						source={{ uri: getImageFromApi(film.backdrop_path) }}
					/>
					<Text style={styles.title_text}>{film.title}</Text>
					<Button onPress={() => _toggleFavorite()} title={"Favori"}></Button>
					{/* <TouchableOpacity
						style={styles.favorite_container}
						onPress={() => _toggleFavorite()}
					>
						{_displayFavoriteImage()}
					</TouchableOpacity> */}
					<Text style={styles.description_text}>{film.overview}</Text>
					<Text style={styles.default_text}>
						Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
					</Text>
					<Text style={styles.default_text}>
						Note : {film.vote_average} / 10
					</Text>
					<Text style={styles.default_text}>
						Nombre de votes : {film.vote_count}
					</Text>
					<Text style={styles.default_text}>
						Budget : {numeral(film.budget).format("0,0[.]00 $")}
					</Text>
					<Text style={styles.default_text}>
						Genre(s) :{" "}
						{film.genres
							.map(function (genre) {
								return genre.name;
							})
							.join(" / ")}
					</Text>
					<Text style={styles.default_text}>
						Companie(s) :{" "}
						{film.production_companies
							.map(function (company) {
								return company.name;
							})
							.join(" / ")}
					</Text>
				</ScrollView>
			);
		}
	};
	console.log(props);
	return (
		<View style={styles.main_container}>
			{_displayFilm()}
			{state.isLoading ? <MyActivityIndicator /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
	},
	loading_container: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	scrollview_container: {
		flex: 1,
	},
	image: {
		height: 169,
		margin: 5,
	},
	title_text: {
		fontWeight: "bold",
		fontSize: 35,
		flex: 1,
		flexWrap: "wrap",
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 10,
		color: "#000000",
		textAlign: "center",
	},
	description_text: {
		fontStyle: "italic",
		color: "#666666",
		margin: 5,
		marginBottom: 15,
	},
	default_text: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
	},
	favorite_container: {
		alignItems: "center",
	},
	favorite_image: {
		width: 40,
		height: 40,
	},
});
const mapStateToProps = (state) => {
	return {
		favoritesFilm: state.Film,
	};
};
export default connect(mapStateToProps)(FilmDetail);
