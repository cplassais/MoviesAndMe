import { legacy_createStore as createStore } from "redux";
import toggleFavorite from "./Reducers/favoriteReducer";

export default createStore(toggleFavorite);
