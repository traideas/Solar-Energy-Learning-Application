import { AsyncStorage } from 'react-native'

const getUserID = () => {
    let val
    AsyncStorage.getItem('user_id')
    .then(value => {
        if(value == null) {
            console.log("Something's Wrong, Cant Find User!")
        } else {
            console.log(value)
        }
    })
    .catch(err => console.log(err))
}

export default {
    getUserID
}