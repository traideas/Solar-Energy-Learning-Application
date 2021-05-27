import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Button, Text } from "galio-framework";
import { FlatList } from "react-native-gesture-handler";

/* const TakeQuize = ({ quiz, onPress }) => {
  const { question, answerOptions } = quiz;
  const renderOptions = answerOptions.map((answerOption, index) => {
    return (
      <TouchableOpacity key={index} onPress={onPress}>
        <Text h5>Option {index+1}: {answerOption.answerText}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <Block>
      <Block style={styles.question}>
        <Text h3>{question}</Text>
      </Block>
      <Block style={styles.optionsContainer}>
        {renderOptions}
        <TouchableOpacity onPress={onPress}>
          <Text h5>Option 1: {options_1}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text h5>Option 2: {options_2}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text h5>Option 3: {options_3}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text h5>Option 4: {options_4}</Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
}; */

export default QuizDetails = ({ navigation, route }) => {
  const { title, description, questions } = route.params;
  const [quizQuestions] = useState(questions);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(2);
  const [selectedOption, setSelectedOption] = useState();
  const startQuizHandler = () => {
    setStartQuiz(true);
  };
  const handlePress = (item) => {
    console.log(item, "Click");
  };
  return (
    <Block style={styles.container}>
      <Text>Take Quize: {title}</Text>
      <Text>{description}</Text>
      <Block style={styles.quizContainer}>
        {startQuiz ? (
          <Block>
            <Block style={styles.question}>
              <Text h3>{quizQuestions[currentQuestion].question}</Text>
            </Block>
            <Block style={styles.optionsContainer}>
              <FlatList
                data={quizQuestions[currentQuestion].answerOptions}
                keyExtractor={(item, index) => "key" + index}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => handlePress(item)}>
                    <Text h5>Option 2: {item.answerText}</Text>
                  </TouchableOpacity>
                }
              />
            </Block>
            {/* <TakeQuize
              quiz={quizQuestions[currentQuestion]}
              onPress={() => handlePress()}
            /> */}
          </Block>
        ) : (
          <Button onPress={startQuizHandler}>Start Quiz</Button>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  quizContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {},
  optionsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});
