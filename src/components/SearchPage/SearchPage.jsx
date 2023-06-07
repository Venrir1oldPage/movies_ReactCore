import { Input , Alert} from 'antd'
import { Component, Fragment } from 'react'
import { debounce } from 'lodash'

import Results from '../Results/Results'

export default class SearchPage extends Component {
  state={
    inputValue:'',
    error:false
  }

  onSentInput = (e) => {
    let value = e.target.value.replace(' ','%20')
    this.setState({
      inputValue:value
    })
  }
    
  componentDidCatch(){
    this.setState({
      error:true
    })
  }

  render() {
    const {inputValue, error }=this.state
    
    if(error) return <Alert className='movies__alert' showIcon message='Что-то пошло совсем не по плану' 
      type="error" />
    
    return (
      <Fragment>
        <Input key='input' className='movies_searchbar' placeholder='Type to search...' 
          onChange={debounce(this.onSentInput.bind(this), 700)} onPressEnter={this.onSentInput}/>
        <Results key='results' input={inputValue}/>
      </Fragment>
    )
  }

}