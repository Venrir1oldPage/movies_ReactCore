import PropTypes from 'prop-types'

import Card from '../Card/Card'
import './CardList.css'


const CardList =({moviesData})=>{
  const cards = moviesData.map((item) => { 
    return (
      <Card key={item.id} movieInfo = {item}/>)
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