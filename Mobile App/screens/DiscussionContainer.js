import React from "react";

import { StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { Block, Card, Text } from "galio-framework";
import { FlatList } from "react-native-gesture-handler";

const DATA = [
  {
    id: 1,
    title: "Lets Talk about renewable energy",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humor and the like).",
    created_by: 2,
    created_date: "2021-05-30",
    status: false,
    comments: [],
  },
  {
    id: 2,
    title: "Crypto sure requires a lot of fiat",
    description:
      "Welcome back to The TechCrunch Exchange, a weekly startups-and-markets newsletter. It’s broadly based on the daily column that appears on Extra Crunch, but free, and made for your weekend reading. Want it in your inbox every Saturday? Sign up here.  Ready? Let’s talk money, startups and spicy IPO rumors.  Hello from Friday, I presume that you are currently enjoying the long weekend. In celebration for this week’s Exchange letter we’ll try something new by being brief.   If you are tired of hearing about cryptocurrencies, I have bad news. They are not only not going away, but it appears that the financial cannon that have helped clear the fields for their general advance are reloading with even more financial ammunition.  At least that’s what Eric Newcomer is reporting in a post out this week aptly titled “a16z Crypto Fund Balloons to $2 Billion.”",
    created_by: 4,
    created_date: "2021-05-30",
    status: false,
    comments: [],
  },
  {
    id: 3,
    title: "Augmented reality NFT platform Anima gets backing from Coinbase",
    description:
      "Augmented reality and non-fungible tokens, need I say more? Yes? Oh, well NFTs have certainly had their moment in 2021, but the question of what they do or what can be done with them has certainly been getting voiced more frequently as the speculative gold rush begins to cool off and people start to think more about how digital goods can evolve in the future.  Anima, a small creative crypto startup built by the founders of photo/video app Ultravisual, which Flipboard acquired back in 2014, is looking to use AR to shift how NFT art and collectibles can be viewed and shared. Their latest venture is an effort to help artists bring their digital creations to a bigger digital stage and help find what the future of NFTs looks like in augmented reality.",
    created_by: 2,
    created_date: "2021-05-30",
    status: false,
    comments: [
      {
        id: 4,
        comment: "good to know it",
        created_date: "2021-05-30",
        discussion: 3,
        created_by: 1,
      },
    ],
  },
  {
    id: 4,
    title: "What are Render Props in React?",
    description:
      "A render prop is simply a function prop that is used to render UI.  This gives more flexibility to the user to decide how the data should be visible via Children.  In Parent you can pass your info this way: props.children({ isLoggedIn, name, updateUserStatus })}",
    created_by: 3,
    created_date: "2021-05-30",
    status: false,
    comments: [
      {
        id: 1,
        comment: "good insights",
        created_date: "2021-05-30",
        discussion: 4,
        created_by: 1,
      },
      {
        id: 2,
        comment: "nicely put",
        created_date: "2021-05-30",
        discussion: 4,
        created_by: 7,
      },
      {
        id: 3,
        comment: "wow",
        created_date: "2021-05-30",
        discussion: 4,
        created_by: 10,
      },
    ],
  },
];

const Discussion = ({ item, onPress }) => {
  const { title, description } = item;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Card title={title} caption={description} />
      <Card caption={"1 Comment"} borderless={true} />
    </TouchableOpacity>
  );
};

export default function DiscussionContainer({ navigation }) {
  const renderItem = ({ item }) => {
    const handlePress = (item) => {
        navigation.navigate("Discussion", item)
    };
    return <Discussion item={item} onPress={() => handlePress(item)} />;
  };
  return (
    <Block style={styles.container}>
      <Text h5>Discussions</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
    marginTop: 20,
  },
});
