import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Block, Input, Text, Button } from "galio-framework";

export default Discussion = ({ route }) => {
  const { title, description, comments } = route.params;
  // console.log(comments)
  const [AllComments] = useState(comments);
  const renderComments = AllComments.map((comment) => (
    <Text style={{margin: 10}}>{comment.comment}</Text>
  ));

  return (
    <Block style={styles.container}>
      <Text h4>{title}</Text>
      <Text>{description}</Text>
      <Block style={styles.commentContainer}>{renderComments}</Block>
      <Input/>
      <Button>Comment</Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  commentContainer: {
    
  },
});
