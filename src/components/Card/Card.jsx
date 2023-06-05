import { Image , Rate} from 'antd'
import './Card.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

import TagsList from '../TagsList/TagsList'

export default class Card extends Component {

  state={}

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

  constructor(props) {
    super()
    const {movieInfo} = props
    this.state = movieInfo
  }

  render () {
    const {title, date, tags, overview, posterPath, vote, rate, id} = this.state
    return (
      <div className='card' key={id}>
        <Image className='movie__poster'
          src={posterPath}
          alt = 'Movie poster'
        />
        <div className='movie__info'>
          <h2 className='movie__tite'>{title}</h2>
          <div className='movies__rate'>{rate}</div>
          <p className='movie__date'>{date}</p>
          <TagsList className='movie_tags' tagsInfo={tags}/>
          <p className='movie__description'>{overview}</p>
          <Rate className='movie__stars' allowHalf value={vote} />
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
  