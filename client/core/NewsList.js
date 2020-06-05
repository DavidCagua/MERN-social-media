import React from 'react'
import PropTypes from 'prop-types'
import Newscard  from './Newscard'
import Carousel from 'react-material-ui-carousel'

export default function NewsList (props) {

  return (
    <div style={{marginTop: '24px', position: 'absolute'}}>
      <Carousel >
      {props.News.map((item, i) => {
          return <Newscard News={item} key={i}/>
        })
      }
      </Carousel>
    </div>
  )
}
NewsList.propTypes = {
  News: PropTypes.array.isRequired
}

  
  
  