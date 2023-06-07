import { Image , Rate,  Progress } from 'antd'
import './Card.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

import TagsList from '../TagsList/TagsList'

export default class Card extends Component {

  cutText(text){
    let newText
    const arr = text.split(' ')
    newText = arr.length > 25?arr.slice(0,25).join(' ')+'...': text
    return newText
  }

  componentDidUpdate(prevProps) {
    if(this.props.movieInfo !== prevProps.movieInfo){
      this.setState(this.props.movieInfo)
    }
  }
  rating = (value) => {
    console.log('ratiiing')
    this.setState({
      rate:value
    })
  }

  constructor(props) {
    super()
    const {movieInfo} = props
    this.state = movieInfo
  }

  render () {
    const {title, date, tags, overview, posterPath, vote, id, rate} = this.state
    let color=vote<3? '#E90000': vote <5?'#E97E00': vote<7?'#E9D100':'#66E900'
  
    return (
      <div className='card' key={id}>
        <Image className='movie__poster'
          src={posterPath}
          alt = 'Movie poster'
        />
        <div className='movie__info'>
          <h2 className='movie__tite'>{title}</h2>
          <Progress className='movies__rate' percent={vote*10}  size={33} type="circle" trailColor='#D9D9D9' format={() => `${vote}`} strokeColor={color}/>
          <p className='movie__date'>{date}</p>
          <TagsList className='movie_tags' tagsInfo={tags}/> 
          <p className='movie__description'>{overview}</p>
          <Rate className='movie__stars' allowHalf onChange={this.rating} value={rate} />
        </div>
      </div>
    )
  }
}

Card.defaultProps = {
  title: ' ',
  date: '01.01.2000',
  tags: [],
  overview: ' ',
  vote: 0,
  rate:0,
  id:0,
}
  
Card.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  tags:PropTypes.array,
  overview: PropTypes.string,
  posterPath: PropTypes.string,
  vote:PropTypes.number,
  rate:PropTypes.number,
  id: PropTypes.number,
}
  