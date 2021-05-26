import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default TakeQuize = ({ navigation, route }) => {
    const { title } = route.params
    return (
        <View style={styles.container}>
            <Text>Take Quize: {title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40
    }
})