import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import FilmDetail from "../Components/FilmDetail";
import Search from "../Components/Search";

const SearchStackNavigator = createStackNavigator({
	Search: {
		screen: Search,
		navigationOptions: {
			title: "Rechercher",
		},
	},
	FilmDetail: {
		screen: FilmDetail,
		navigationOptions: {
			title: "Détails du Film",
		},
	},
});
export default createAppContainer(SearchStackNavigator);
