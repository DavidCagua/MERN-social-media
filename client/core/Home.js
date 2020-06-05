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
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition:"center",
    backgroundSize:"cover",
    backgroundImage: `url(${homeImg})`,
  },
  title: {
    color: 'black',
    fontSize:80,
    textAlign: 'center',
    WebkitTextStroke:'1px white'
  },
  Grid: {
    flexGrow:1,
    height:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
        console.log(data.error)
      } else { 
        setNews(data.response.results)
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
          <Grid container  className={classes.Grid}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.title}>Welcome to a MERN social media!</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <NewsList News={News}/>
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
