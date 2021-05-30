import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Block, Text, Button } from "galio-framework";
import axios from "axios";
import { useForm } from "react-hook-form";

import Input from '../components/Input'

export default Discussion = ({ route }) => {
  const { title, description, comments, id } = route.params;
  // console.log(comments)
  const [allComments, setAllComments] = useState(comments);
  const { control, handleSubmit, reset } = useForm();

  const renderComments = allComments.map((comment, index) => (
    <Text key={index} style={{ margin: 10 }}>
      {comment.comment}
    </Text>
  ));

  const onSubmit = ({ comment }) => {
    axios
      .post("http://127.0.0.1:8000/comment/", {
        comment: comment,
        discussion: id,
        created_by: 10,
      })
      .then((res) => {
        setAllComments(prevState => [...prevState, {comment: comment}])
        reset()
      })
      .catch((err) => console.log(err));
  };

  return (
    <Block style={styles.container}>
      <Text h4>{title}</Text>
      <Text>{description}</Text>
      <Block style={styles.commentContainer}>{renderComments}</Block>
      <Input
        borderless
        placeholder="Comment"
        name="comment"
        control={control}
      />
      <Button onPress={handleSubmit(onSubmit)}>Comment</Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  commentContainer: {},
});
