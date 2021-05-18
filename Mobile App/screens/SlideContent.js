import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default SlideContent = () => {
    return (
        <View style={styles.container}>
            <Text>This is Slide content</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40
    }
})