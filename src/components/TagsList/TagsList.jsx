import { Tag } from 'antd'
import { v4 as uuidv4 } from 'uuid'

const TagsList = ({tagsInfo}) => {
  
  const tags = tagsInfo.map((item) => {
    let id=uuidv4()
    return (<Tag key={id}>{item}</Tag>)
  })
  return (
    <div>
      {tags}
    </div>
  )
}

export default TagsList
