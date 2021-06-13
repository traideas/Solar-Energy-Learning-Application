import React, { useState } from "react";
import { StyleSheet, Image, ScrollView, } from "react-native";
import { Block, Text, Button } from "galio-framework";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from '../components/Input'
import configData from '../services/configData.json'

export default Discussion = ({ route }) => {
  const { title, description, comments, id, created_date, created_by } = route.params;
  // console.log(comments)
  const [allComments, setAllComments] = useState(comments);
  const { control, handleSubmit, reset } = useForm();

  const renderComments = allComments.map((comment, index) => (
    /*  <Text key={index} style={{ margin: 10 }}>
       {comment.comment}
     </Text> */
    <Block key={index}>
      <Block style={styles.commentContainer}>
        <Text>{comment.comment}</Text>
        <Block style={{ alignItems: 'flex-end', marginTop: 5, }}>
          <Block style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
            <Image source={{ uri: comment.created_by.photo }} style={{ width: 35, height: 35, borderRadius: 5 }} />
            <Block style={{ marginLeft: 5, marginTop: -2 }}>
              <Text>{comment.created_by.name} </Text>
              <Text style={{ color: "gray" }}>{comment.created_date}</Text>
            </Block>
          </Block>
        </Block>

      </Block>
    </Block>
  ));

  const onSubmit = ({ comment }) => {
    axios
      .post(configData.SERVER_URL + "comment/", {
        comment: comment,
        discussion: id,
        created_by: 1,
      })
      .then((res) => {
        setAllComments(prevState => [...prevState, { comment: comment }])
        reset()
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Block style={styles.mainContainer}>
        <Text h5>{title}</Text>
        <Text>{description}</Text>
        <Block style={{ alignItems: 'flex-end', marginTop: 5, }}>
          <Block style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
            <Image source={{ uri: created_by.photo }} style={{ width: 35, height: 35, borderRadius: 5 }} />
            <Block style={{ marginLeft: 5, marginTop: -2 }}>
              <Text>{created_by.name} </Text>
              <Text style={{ color: "gray" }}>{created_date}</Text>
            </Block>
          </Block>
        </Block>

      </Block>

      <Input
        borderless
        placeholder=" Write Your Comment"
        name="comment"
        control={control}
      />
      <Button style={{ marginLeft: 0, marginBottom: 10 }} onPress={handleSubmit(onSubmit)}>Comment</Button>

      <Block style={{ marginBottom: 20 }}>{renderComments}</Block>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,

  },
  commentContainer: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "lightgray",
    backgroundColor: "white",
    marginBottom: 5
  },
  mainContainer: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "lightgray",
    backgroundColor: "white",
  }
});
