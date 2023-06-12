import { Component, Fragment} from 'react'
import { Spin, Alert, Pagination} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
//import PropTypes from 'prop-types'

import CardList from '../CardList/CardList'

export default class RatePage extends Component{
  state={
    moviesData:[],
    loading:true,
    error:false,
    notFound:false,
    totalPages:1,
    currentPage:1
  }


  getData = () => {
    if(!this.state.moviesData) return
    this.props.getRated().then((info)=> {
      let pages = this.props.getTotalRatePages()
      this.setState({
        moviesData:info,
        loading:false,
        notFound:false,
        totalPages:pages
      })
    })
      .catch((e) => {
        if(e.message=='Не найдено') {
          this.setState({
            loading:false,
            notFound:true
          })
        } else {
          this.setState({
            error:true,
            loading:false,
          })
        }
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
    const {moviesData, loading,  error, notFound, totalPages } = this.state
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    if (loading) {
      return (
        <div className='movies__loaderContainer'>
          <Spin indicator={antIcon}/>
        </div>
      )
    } else if (notFound) return <Alert className='movies__alert' showIcon message='Вы еще не оценили не один фильм' type="error" />
    else if(error) return <Alert className='movies__alert' showIcon message='Что-то пошло не так' type="error" />
    return (
      <Fragment>
        <CardList key='cardlist' moviesData={moviesData}></CardList>
        <Pagination defaultCurrent={1} showSizeChanger={false} 
          total={totalPages*10} onChange={this.changingPage} className='movies_pagination' />
      </Fragment>
    )
  }
}


// RatePage.propTypes = {

// }