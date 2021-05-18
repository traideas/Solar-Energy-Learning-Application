import React from 'react'
import { StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native'
import { Block, theme } from 'galio-framework'

import Card  from '../components/Card';
import articles from '../constants/articles';

const { width } = Dimensions.get('screen');

import { createStackNavigator } from '@react-navigation/stack';
import SlideContent from './SlideContent';

const HomeStack = createStackNavigator();

const renderContent = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
            <Block flex row>
                <Card item={{title: "Slide Contents"}} style={{ marginRight: theme.SIZES.BASE }} />
                <Card item={{title: "Watch"}} />
            </Block>
          <Card item={{title: "Take Quize"}} />
          <Card item={articles[3]} horizontal />
        </Block>
      </ScrollView>
    )
}

export default Home = ({ navigation }) => {
    return (
        <Block flex center style={styles.home}>
            <TouchableWithoutFeedback  onPress={() => navigation.navigate("VideoContent")}>
              <Text style={styles.articles}>Go TO Video Content</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("SlideContent")}>
              <Text style={styles.articles}>Go TO Slide Content</Text>
            </TouchableWithoutFeedback>
        </Block>
    )
}

const styles = StyleSheet.create({
    home: {
      width: width,    
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
      margin: 30
    },
  });