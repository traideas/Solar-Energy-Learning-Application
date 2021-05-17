import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default VideoContent = () => {
    return (
        <View style={styles.container}>
            <Text>This is Video content</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40
    }
})