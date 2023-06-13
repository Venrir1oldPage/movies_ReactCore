import { Component, Fragment} from 'react'
import { Spin, Alert, Pagination} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import CardList from '../CardList/CardList'

export default class RatePage extends Component{
  state={
    moviesData:[],
    loading:true,
    error:false,
  }


  getData = () => {
    let data = JSON.parse(localStorage.getItem('ratedFilms'))
    console.log(data)
    this.setState({
      moviesData:data,
      loading:false,
    })
    if(!data.length){
      this.setState({
        error:true,
      })
    }
  }

  componentDidCatch(){
    this.setState({
      error:true
    })
  }

  componentDidMount() {
    this.getData()
  }

  changingPage = (page) => {
    this.setState({
      currentPage:page,
    })
  }


  render(){
    const {moviesData, loading,  error} = this.state
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    if (loading) {
      return (
        <div className='movies__loaderContainer'>
          <Spin indicator={antIcon}/>
        </div>
      )
    } else if(error) return <Alert className='movies__alert' showIcon message='Не можем найти ваши оцененные фильмы, загляните позже' type="error" />
    return (
      <Fragment>
        <CardList key='cardlist' moviesData={moviesData}></CardList>
        <Pagination defaultCurrent={1} showSizeChanger={false} hideOnSinglePage
          onChange={this.changingPage} className='movies_pagination' />
      </Fragment>
    )
  }
}