import React, {useState, useEffect} from 'react'
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles'
import homeImg from './../assets/images/signin.jpg'
import Grid from '@material-ui/core/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'
import NewsList  from './NewsList'
import {list} from './api-news'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop:"31px",
    height: "99vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition:"center",
    backgroundSize:"cover",
    backgroundImage: `url(${homeImg})`,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    color: 'White',
    marginTop: 40,
    marginRight:20,
    fontSize:80 
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))

export default function Home({history}){
  const classes = useStyles()
  const [defaultPage, setDefaultPage] = useState(false)
  const [News, setNews] = useState([])

  useEffect(()=> {
    const abortController = new AbortController()
    const signal = abortController.signal
    
    list(signal).then((data) => {
      if (data && data.error) {
        console.log('hola error')
      } else { 
        setNews(data.response.results)
        console.log(data.response.results)
      }
      return function cleanup(){
        abortController.abort()
      }
    })
    setDefaultPage(auth.isAuthenticated())
    const unlisten = history.listen (() => {
      setDefaultPage(auth.isAuthenticated())
    })
    return () => {
      unlisten()
    }
  }, [])

    return (
      <div className={classes.root}>
        { !defaultPage &&
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <NewsList News={News}/>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>Welcome to a MERN social media!</Typography>
            </Grid>
          </Grid>
        }
        {defaultPage &&
          <Grid container spacing={8}>
            <Grid item xs={8} sm={7}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople/>
            </Grid>
          </Grid>
        }
      </div>
    )
}
