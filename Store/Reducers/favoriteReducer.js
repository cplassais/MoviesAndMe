const initialState = { favoritesFilm: [] }

const toggleFavorite = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                // suppression
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
                console.log("SUPPRESSION");
            }
            else {
                // ajouter
                nextState = {
                    ...state,
                    favoritesFilm: [ ...state.favoritesFilm, action.value]
                }
                console.log("AJOUT",nextState.favoritesFilm.map(item =>item.id));
            }
            return nextState || state
        default:
            return state
    }
}
export default toggleFavorite