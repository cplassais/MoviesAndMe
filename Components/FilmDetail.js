import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getFilmDetailFromApi } from "../API/TMDBApi";
import MyActivityIndicator from "./MyActivityIndicator";

const FilmDetail = (props) => {
	const [state, setState] = useState({
		film: undefined,
		isLoading: true,
	});
	useEffect(() => {
            getFilmDetailFromApi(props.navigation.state.params.idFilm).then(
                 (data) => {
                        setState({
                              film: data,
                              isLoading: false,
                        });
                  }     
                  );
            }, []);
	return (
		<View style={styles.main_container}>
			<Text style={styles.main_boby}>
				{/* Id du film choisi : {props.navigation.state.params.idFilm} */}
			</Text>
			{state.isLoading ? <MyActivityIndicator /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	main_boby: {
		fontSize: 26,
	},
});

export default FilmDetail;
