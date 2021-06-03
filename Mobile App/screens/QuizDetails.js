import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { FlatList } from "react-native-gesture-handler";
import { block } from "react-native-reanimated";
import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

export default QuizDetails = ({ navigation, route }) => {
  const { title, description, photo, questions } = route.params;
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
      Alert.alert("Correct Answer");
      setScore(score + 1);
    } else {
      Alert.alert(
        "Opps, correct answer is: \n",
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
      {startQuiz ? null : (
        <>

          <Block style={{ alignItems: "center", }}>
            <Image
              source={{ uri: photo }}
              style={{ height: 250, width: width - theme.SIZES.BASE * 2, }}
            >
            </Image>

          </Block>
          <Block style={{ marginTop: 30 }}>
            <Text h5>{title}</Text>
            <Text p style={{ marginTop: 10 }}>{description}</Text>
          </Block>

        </>
      )}

      <Block style={styles.quizContainer}>

        {startQuiz ? (
          showscore ? (
            <Block style={{ alignItems: "center" }}>
              <Image
                source={Images.QuizEnd}
                style={{ height: 400, width: width - theme.SIZES.BASE * 2, }}
              >
              </Image>
              <Block style={styles.score}>
                <Text h4>Your Score: {score}</Text>
              </Block>
            </Block>
          ) : (
            <Block>
              <Block style={styles.question}>
                <Text p>{quizQuestions[currentQuestion].question}</Text>
              </Block>
              <Block style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => setSelectedOption(1)}>
                  <Block style={selectedOption === 1
                    ? styles.optionsBlockSelected
                    : styles.optionsBlock}
                  >
                    <Text
                      size={17}
                      style={
                        selectedOption === 1
                          ? { color: "#0000FF" }
                          : { color: "white" }
                      }
                    >
                      {quizQuestions[currentQuestion].options_1}
                    </Text>
                  </Block>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedOption(2)}>
                  <Block style={selectedOption === 2
                    ? styles.optionsBlockSelected
                    : styles.optionsBlock
                  }>
                    <Text
                      size={17}
                      style={
                        selectedOption === 2
                          ? { color: "#0000FF" }
                          : { color: "white" }
                      }
                    >
                      {quizQuestions[currentQuestion].options_2}
                    </Text>
                  </Block>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedOption(3)}>
                  <Block style={selectedOption === 3
                    ? styles.optionsBlockSelected
                    : styles.optionsBlock}>
                    <Text
                      size={17}
                      style={
                        selectedOption === 3
                          ? { color: "#0000FF" }
                          : { color: "white" }
                      }
                    >
                      {quizQuestions[currentQuestion].options_3}
                    </Text>
                  </Block>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedOption(4)}>
                  <Block style={selectedOption === 4
                    ? styles.optionsBlockSelected
                    : styles.optionsBlock}>
                    <Text
                      size={17}
                      style={
                        selectedOption === 4
                          ? { color: "#0000FF" }
                          : { color: "white" }
                      }
                    >
                      {quizQuestions[currentQuestion].options_4}
                    </Text>
                  </Block>
                </TouchableOpacity>
              </Block>
              <Block style={styles.submitBtn}>
                <Button style={{ borderRadius: 20 }} onPress={onSubmitAnswer}>Submit</Button>
              </Block>

            </Block>
          )
        ) : (
          <Block style={styles.submitBtn}>
            <Button onPress={startQuizHandler}>Start Quiz</Button>
          </Block>

        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  quizContainer: {

    justifyContent: "center"

  },
  question: {
    marginBottom: 30,


  },
  optionsContainer: {
    justifyContent: "space-evenly",
  },
  optionsBlock: {
    padding: 6,
    borderRadius: 5,
    backgroundColor: "#7D71FF",
    alignItems: "center",
    marginTop: 20,
  },
  optionsBlockSelected: {
    padding: 6,
    borderRadius: 5,
    backgroundColor: "#dbd8ff",
    alignItems: "center",
    marginTop: 20,
  },
  submitBtn: {
    marginTop: 50,
    alignItems: "center",
  },
  score: {
    marginTop: 30,
    backgroundColor: "#dbd8ff",
    padding: 30,
    borderRadius: 50,
  }
});
