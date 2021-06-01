import { AsyncStorage } from "react-native";

/* const getUserID = () => {
  const id = AsyncStorage.getItem("user_id")
    .then((value) => {
      if (value == null) {
        console.log("Something's Wrong, Cant Find User!");
      } else {
        console.log(value);
      }
    })
    .catch((err) => console.log(err));
  console.log(id);
}; */

const displayData = async () => {
    return await AsyncStorage.getItem("user_id"); 
};

export default {
  //getUserID,
  displayData
};
