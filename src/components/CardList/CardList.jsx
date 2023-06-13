import PropTypes from 'prop-types'

import Card from '../Card/Card'
import './CardList.css'
import { GenresConsumer } from '../../services/MovieService/GenresContextAPI'


const CardList =({moviesData})=>{
  const cards = moviesData.map((item) => { 
    return (
      <GenresConsumer key={item.id}>
        {( genres ) => {
          return(
            <Card key={item.id} movieInfo = {item} genres={genres}/>
          )}}
      </GenresConsumer>)
  })

  return (
    <div className="cardlist">
      {cards} 
    </div>
  )
}
CardList.defaultProps = {
  moviesData: []
}

CardList.propTypes = {
  moviesData: PropTypes.array
}

export default CardList


         