import { Component , Fragment } from 'react'
import { Spin, Alert, Pagination } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import CardList from '../CardList/CardList'

import './Results.css'


export default class Results extends Component{
  state={
    moviesData:[],
    totalPages:null,
    loading:true,
    error:false,
    notFound:false,
    currentPage:1,
  }


  getData = (input, page) => {
    if(!this.state.moviesData) return
    this.props.updateMovies(input, page).then((info)=> {
      const totalPages = this.props.getTotalPages()
      this.setState({
        moviesData:info,
        loading:false,
        notFound:false,
        totalPages:totalPages,
        currentPage:page,
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

  changingPage = (page) => {
    this.setState({
      currentPage:page,
    })
  }

  componentDidMount() {
    this.getData(this.props.input,this.state.currentPage)
  }

  componentDidUpdate(prevProps, prevState) {
    let page = this.state.currentPage
    if(this.props.input !== prevProps.input|| this.state.currentPage !== prevState.currentPage ){
      this.getData(this.props.input, page)
    }
  }

  render(){
    const {moviesData, loading,  error, notFound, totalPages} = this.state
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    if (loading) {
      return (
        <div className='movies__loaderContainer'>
          <Spin indicator={antIcon}/>
        </div>
      )
    } else if (notFound) return <Alert className='movies__alert' showIcon message='Не можем найти фильм с похожим названием. Попробуйте другой вариант' type="error" />
    else if(error) return <Alert className='movies__alert' showIcon message='Что-то пошло не так' type="error" />
  
    return (
      <Fragment>
        <CardList key='cardlist' moviesData={moviesData}/>
        <Pagination defaultCurrent={1} showSizeChanger={false} 
          total={totalPages} onChange={this.changingPage} className='movies_pagination' />
      </Fragment>
    )
  }
}

Results.defaultProps = {
  input:' ',
}
  
Results.propTypes = {
  input: PropTypes.string,
}
  