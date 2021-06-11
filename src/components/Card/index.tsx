import React from 'react'
import { StyleSheet, TouchableOpacityProps, View } from 'react-native'
import globalStyles from '../../assets/globalStyles'


const Card: React.FC<TouchableOpacityProps> = ({ children, ...props }) => {
	return (
		<View style={[styles.container]} {...props}>
			{children}
		</View>
	)
}

export default Card

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: 100,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,

		elevation: 24,
	},

})
