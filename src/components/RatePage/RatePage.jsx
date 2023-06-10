import { Component } from 'react'
import { Spin, Alert} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
//import PropTypes from 'prop-types'

import CardList from '../CardList/CardList'

export default class RatePage extends Component{
  state={
    moviesData:[{title: 'Here We for Example...', date: 'October 28, 1977', tags: Array(1), overview: 'Poet Palmambrogio Guanziroli loses his wallet mere… nicknamed \'Click\' and takes up residence with...', posterPath: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2//7KRTYnU0Zj1XdeXBmzASMhZcDzp.jpg'},
      {title: 'An Example of Intonation', date: 'January 01, 1991', tags: Array(1), overview: 'The second film by Sokurov featuring Boris Yeltsin… Russia, invested with power, bearing the full...', posterPath: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…VguuY87jJRup8RzN1BwsBXXoB+zb6+5UvY2greKOwt5+6o//Z'},
      {title: 'For Example, 9 Grzybowska Street', date: 'October 18, 1991', tags: Array(1), overview: 'Documentary about three inhabitants of Grzybowska …onship to their place of residence, describing...', posterPath: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2//hhmWwdkOFIsPj4z7CPU6zLEO2Nr.jpg'}
    ],
    loading:true,
    error:false,
    notFound:false,
  }

  // тут будет функция вызова фильмов
  //   getData = (input, page) => {
  //     if(!this.state.moviesData) return
  //     this.props.updateMovies(input, page).then((info)=> {
  //       this.setState({
  //         moviesData:info,
  //         loading:false,
  //         notFound:false,
  //       })
  //     })
  //       .catch((e) => {
  //         if(e.message=='Не найдено') {
  //           this.setState({
  //             loading:false,
  //             notFound:true
  //           })
  //         } else {
  //           this.setState({
  //             error:true,
  //             loading:false,
  //           })
  //         }
  //       })
  //   }


  componentDidMount() {
    this.props.getRated()
    //вызвать получение оцененных
  }



  render(){
    const {moviesData, loading,  error, notFound, } = this.state
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
      <CardList key='cardlist' moviesData={moviesData}></CardList>
    )
  }
}


// RatePage.propTypes = {

// }