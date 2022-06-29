import React from "react";
import { StyleSheet, View, Text } from "react-native";

const FilmDetail = (props) => {
	return (
		<View style={styles.main_container}>
            <Text style={styles.main_boby}> Id du film choisi : {props.navigation.state.params.idFilm}</Text>
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
          fontSize: 26
    }
});

export default FilmDetail;