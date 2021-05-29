import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Button, Text } from "galio-framework";
import { FlatList } from "react-native-gesture-handler";

export default QuizDetails = ({ navigation, route }) => {
  const { title, description, questions } = route.params;
  const [quizQuestions] = useState(questions);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showscore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const startQuizHandler = () => {
    setStartQuiz(true);
  };
  const handlePress = (item) => {
    console.log(item, "Click");
  };
  const getCorrectAnswer = (optionNum) => {
    if (optionNum === 1) return quizQuestions[currentQuestion].options_1;
    else if (optionNum === 2) return quizQuestions[currentQuestion].options_2;
    else if (optionNum === 3) return quizQuestions[currentQuestion].options_3;
    else quizQuestions[currentQuestion].options_4;
  };
  const onSubmitAnswer = () => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      Alert.alert("Your Answer is correct");
      setScore(score + 1);
    } else {
      Alert.alert(
        "Wrong Answer, correct answer is: ",
        getCorrectAnswer(quizQuestions[currentQuestion].answer)
      );
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion((prevState) => prevState + 1);
      setSelectedOption(null);
    } else setShowScore(true);
  };
  return (
    <Block style={styles.container}>
      <Text>Take Quize: {title}</Text>
      <Text>{description}</Text>
      <Block style={styles.quizContainer}>
        {startQuiz ? (
          showscore ? (
            <Block>
              <Text>Your Total Score is {score}</Text>
            </Block>
          ) : (
            <Block>
              <Block style={styles.question}>
                <Text h3>{quizQuestions[currentQuestion].question}</Text>
              </Block>
              <Block style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => setSelectedOption(1)}>
                  <Text
                    h5
                    style={
                      selectedOption === 1
                        ? { color: "#0000FF" }
                        : { color: "#000000" }
                    }
                  >
                    Option 1: {quizQuestions[currentQuestion].options_1}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedOption(2)}>
                  <Text
                    h5
                    style={
                      selectedOption === 2
                        ? { color: "#0000FF" }
                        : { color: "#000000" }
                    }
                  >
                    Option 2: {quizQuestions[currentQuestion].options_2}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedOption(3)}>
                  <Text
                    h5
                    style={
                      selectedOption === 3
                        ? { color: "#0000FF" }
                        : { color: "#000000" }
                    }
                  >
                    Option 3: {quizQuestions[currentQuestion].options_3}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedOption(4)}>
                  <Text
                    h5
                    style={
                      selectedOption === 4
                        ? { color: "#0000FF" }
                        : { color: "#000000" }
                    }
                  >
                    Option 4: {quizQuestions[currentQuestion].options_4}
                  </Text>
                </TouchableOpacity>
              </Block>
              <Button onPress={onSubmitAnswer}>Submit Answer</Button>
            </Block>
          )
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
    flex: 0.8,
    justifyContent: "space-evenly",
  },
});
