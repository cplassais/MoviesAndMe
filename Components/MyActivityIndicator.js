import { ActivityIndicator, StyleSheet, View } from "react-native"


const MyActivityIndicator = () => {
 return(   
<View style={styles.loading_container}>
	<ActivityIndicator size="large" />
</View>
)
}
const styles = StyleSheet.create({
	loading_container: {
		flex: 1,
		justifyContent: "center",
	},
});
export default MyActivityIndicator
