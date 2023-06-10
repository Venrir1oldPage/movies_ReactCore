import { Tag } from 'antd'
import { v4 as uuidv4 } from 'uuid'

const TagsList = ({tagsInfo, genres}) => {
 
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

export default TagsList
