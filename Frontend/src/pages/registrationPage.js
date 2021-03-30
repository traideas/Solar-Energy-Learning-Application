import { useForm } from 'react-hook-form'

//material UI Design
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';


//creating style
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'felx-start',
        wrap: 'wrap'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const Registration = () => {
    const classes = useStyles()
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => console.log(data)
    console.log(errors)
    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h2" variant="h5">
                    Register Your Account
                </Typography>
                <CssBaseline />
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} validate="true">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="fname" autoFocus id="firstName" required fullWidth variant="outlined" label="First Name" name="firstName" inputRef={register({required: true})} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="lname" autoFocus id="lastName" required fullWidth variant="outlined" label="Last Name" name="lastName" inputRef={register({required: true})} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField defaultValue="2000-05-24" type="date" id="date" fullWidth autoFocus variant="outlined" label="Birth Date" name="birthDate" inputRef={register({required: true})} />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            inputRef={register({required: true})}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" fullWidth variant="outlined" required label="Password" name="password" inputRef={register({required: true})} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined" required label="User Name" name="userName" ref={register} />
                        </Grid>
                        <Grid justify="flex-start" item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I agree to the terms and conditions of Solar learning management app."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                         Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Registration
