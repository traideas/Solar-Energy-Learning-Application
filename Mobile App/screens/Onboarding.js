import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

export default Onboarding = () => {
    return (
        <View style={styles.container}>
            <Text>OnBoarding Application</Text>
            <Button>GET STARTED</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40
    }
})