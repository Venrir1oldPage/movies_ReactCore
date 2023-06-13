import { Tag } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

const TagsList = ({tagsInfo, genres}) => {
  if(!genres) {return (<Tag>Нет доступа к жанрам</Tag>)}

  const compareGenres = (id) => {
    let el = genres.find((el)=>el.id===id)
    return el.name
  }
  if (!tagsInfo.length) { return(<div className='movie__taglist'><Tag>no data about genres</Tag></div>)}

  const tags = tagsInfo.map((item) => {
    let id=uuidv4()
    let tagName=compareGenres(item)
    return (<Tag key={id}>{tagName}</Tag>)})

  return (
    <div className='movie__taglist'>
      {tags}
    </div>
  )
}

TagsList.propTypes = {
  genres:PropTypes.array,
  tagsInfo:PropTypes.array,
}

export default TagsList
