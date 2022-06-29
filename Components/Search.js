import react, { useState, useCallback } from "react";
import { StyleSheet, View, Button, TextInput, FlatList } from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
import MyActivityIndicator from "./MyActivityIndicator";
import Navigation from "../Navigation/Navigation";


const Search = (props) => {
	
	const _displayDetailForFilm = (idFilm) => {
		props.navigation.navigate("FilmDetail", {idFilm: idFilm})
	}
	const [page, setPage] = useState(0)
	const [totalPages, setTotalPages] = useState(0)
	const [state, setState] = useState({
		films: [],
		isLoading: false,
	});
	const [searchedText, setSearchedText] = useState("");
	const _searchFilms = () => {
			_loadFilms();	
	};
	const _loadFilms = () => {
		if (searchedText.length > 0) {
			setState({ isLoading: true });
			getFilmsFromApiWithSearchedText(searchedText, page + 1).then((data) => {
				setPage(data.page);
				setTotalPages(data.total_pages);
				setState({
					films: [...state.films, ...data.results],
					isLoading: false,
				});
			});
		}
	};
	const _searchTextInputChanged = (text) => {
		if (text.length === 1) {
			setPage(0);
			setTotalPages(0);
			setState({
				films: [],
				isLoading: false,
			});
			setSearchedText(text);
		} else {
			setSearchedText(text);
		}
	};
	return (
		<View style={styles.main_container}>
			<TextInput
				style={styles.textinput}
				placeholder="Titre du Film"
				onChangeText={(text) => _searchTextInputChanged(text)}
				onSubmitEditing={() => _searchFilms()}
			/>
			<Button
				style={styles.buttonsearch}
				title="Rechercher"
				onPress={() => _searchFilms()}
			/>
			{state.isLoading ? (
				<MyActivityIndicator />
			) : (
				<FlatList
					data={state.films}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <FilmItem film={item} displayDetailForFilm={_displayDetailForFilm} />}
					onEndReachedThreshold={0.5}
					onEndReached={() => {
						if (page < totalPages) {
							_loadFilms();
						}
					}}
				/>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	main_container: {
		flex: 1,
	},
	textinput: {
		marginTop: 25,
		marginLeft: 5,
		marginRight: 5,
		height: 50,
		borderColor: "#000000",
		borderWidth: 1,
		paddingLeft: 5,
	},
	buttonsearch: {
		height: 50,
	},
	loading_container: {
		flex: 1,
		justifyContent: "center",
	},
});
export default Search;
