import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Button, Text } from "galio-framework";

const TakeQuize = ({ quiz, onPress }) => {
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
        {/* <TouchableOpacity onPress={onPress}>
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
        </TouchableOpacity> */}
      </Block>
    </Block>
  );
};

export default QuizDetails = ({ navigation, route }) => {
  const { title, description, questions } = route.params;
  const [quizQuestions] = useState(questions);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(2);
  const [selectedOption, setSelectedOption] = useState()
  const startQuizHandler = () => {
    setStartQuiz(true);
  };
  const handlePress = (option_num) => {
    console.log(option_num, "Click");
  };
  return (
    <Block style={styles.container}>
      <Text>Take Quize: {title}</Text>
      <Text>{description}</Text>
      <Block style={styles.quizContainer}>
        {startQuiz ? (
          <Block>
            <TakeQuize
              quiz={quizQuestions[currentQuestion]}
              onPress={() => handlePress()}
            />
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
