import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345,
      marginLeft: 40
    },
    media: {
      height: 140,
    },
  }))

export default function Newscard (props){
  const classes = useStyles()
  const [values, setValues] = useState({
    header: props.News.webTitle,
    description: props.News.fields.trailText,
    image: props.News.fields.thumbnail
  })
  


    return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={values.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {values.header}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  {values.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        
  
}

Newscard.propTypes = {
  News: PropTypes.object.isRequired
}
