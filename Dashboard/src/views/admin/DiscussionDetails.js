import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FilledInput from "@material-ui/core/FilledInput";
import { useForm } from "react-hook-form";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from '@material-ui/core/CardActions';
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

// core components
import Header from "components/Headers/Header.js";
import componentStyles from "assets/theme/views/admin/profile.js";

import ApiService from '../../services/api.service'
import AuthService from '../../services/auth.service'
import swal from "sweetalert";

const useStyles = makeStyles(componentStyles);

const CommentList = ({ list }) => {

    const classes = useStyles();
    return (
        <Card classes={{ root: classes.cardRoot }} style={{ marginTop: "20px" }}>

            <CardContent>
                <p>{list.comment}</p>
            </CardContent>
            <CardActions>
                <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item xs="auto">
                        <Tooltip title={list.created_by.name} placement="top">
                            <Avatar
                                classes={{ root: classes.avatarRoot }}
                                alt="..."
                                src={(list.created_by.photo == null) ? require("assets/img/theme/defaultImage.png").default : list.created_by.photo}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs="auto">
                        <Box
                            justifyContent="flex-end"
                            display="flex"
                            flexWrap="wrap"
                        >
                            {list.created_date}
                        </Box>
                    </Grid>
                </Grid>
            </CardActions>

        </Card>

    )
}

function CreateDiscussion() {
    const classes = useStyles();
    let { id } = useParams()
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = ({ comment }) => {
        const created_by = AuthService.getUserId()
        const discussion = id
        ApiService.uploadComment(comment, discussion, created_by)
            .then(function (res) {
                reset()
                swal("Success!", "Comment added Successfully!", "success")
                window.location.reload();
            })
            .catch(function (res) {
                swal("Failed!", "Please Try Again!", "error");
            })
    };
    const [discussionDetails, setdiscussionDetails] = useState({
        title: "",
        description: "",
        created_by: {
            name: "",
            photo: ""
        },
        created_date: "",
        comments: [
            {
                id: "",
                comment: "",
                created_date: "",
                discussion: "",
                created_by: {
                    name: "",
                    photo: ""
                }
            }]
    });
    useEffect(() => {
        ApiService.getDiscussionById(id)
            .then((res) => setdiscussionDetails(res.data))
            .catch((err) => console.log(err));
    }, []);

    const { title, description, created_by, created_date, comments } = discussionDetails;
    return (
        <>
            <Header />
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                marginBottom="5rem"
                classes={{ root: classes.containerRoot }}
            >
                <Card classes={{ root: classes.cardRoot }}>
                    <CardHeader
                        subheader={
                            <Grid
                                container
                                component={Box}
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Grid item xs="auto">
                                    <Tooltip title={created_by.name} placement="top">
                                        <Avatar
                                            classes={{ root: classes.avatarRoot }}
                                            alt="..."
                                            src={(created_by.photo == null) ? require("assets/img/theme/defaultImage.png").default : created_by.photo}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item xs="auto">
                                    <Box
                                        justifyContent="flex-end"
                                        display="flex"
                                        flexWrap="wrap"
                                    >
                                        {created_date}
                                    </Box>
                                </Grid>
                            </Grid>
                        }
                        classes={{ root: classes.cardHeaderRoot }}
                    ></CardHeader>
                    <CardContent>
                        <h2>{title}</h2>
                        <p>{description}</p>

                    </CardContent>
                    <CardActions>
                        <form onSubmit={handleSubmit(onSubmit)}>


                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <FilledInput
                                    autoComplete="off"

                                    placeholder="Wrrite your comment"

                                    name="comment"
                                    {...register("comment")}
                                    required
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                classes={{ root: classes.buttonRoot }}
                                type="submit"
                            >
                                Comment
                                </Button>

                        </form>
                    </CardActions>

                </Card>
                {
                    comments.map((list) => (
                        <CommentList list={list} />
                    ))
                }
            </Container>
        </>
    );
}

export default CreateDiscussion;
