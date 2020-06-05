import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import signinImg from '../assets/images/signin.jpg'
import Particles from 'react-particles-js'
import firebase from '../../firebase.config'

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${signinImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  canva: {
    height: '100%'
  },
  paper: {
    margin: theme.spacing(5, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(3)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: '#ff4081'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  }
}))

export default function Signin(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }

  const clickGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(result=>{
      
      const user = {
        email: result.additionalUserInfo.profile.email || undefined,
        password: result.additionalUserInfo.profile.id || undefined
      }
      signin(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error})
        } else {
          auth.authenticate(data, () => {
            setValues({ ...values, error: '',redirectToReferrer: true})
          })
        }
      })
    })
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = props.location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
  if (redirectToReferrer) {
      return (<Redirect to={from}/>)
  }

  return (
    <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} component={Paper} className={classes.image} >
        <Particles 
          className={classes.canva} 
          params={{
            particles:{
              number:{
                value:60,
                density:{
                  enable: true,
                  value_area: 900
                }
              },
              shape:{
                type: 'circle',
                stroke:{
                  width:4
                }
              }
            }
          }}/>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              Sign In
            </Typography>
            <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
            <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
            <br/> {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}
              </Typography>)
            }
          </CardContent>
          <CardActions style={{display: 'inline-grid'}}>
            <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            <Button 
              color="primary" 
              variant="contained" 
              onClick={clickGoogle} 
              startIcon={
              <Icon classes={{root: classes.iconRoot}}>
                <img className={classes.imageIcon} src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" />
              </Icon>}
              className={classes.submit}
            >Sign in with Google</Button>
          </CardActions>
        </Card>
        </div>
      </Grid>
    </Grid>
    

  </>
    )
}
