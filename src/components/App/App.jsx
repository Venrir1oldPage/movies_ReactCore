import './App.css'
import { Input , Tabs, Alert} from 'antd'
import { Component } from 'react'
import { Offline } from 'react-detect-offline'
import { debounce } from 'lodash'

import { MovieServiceProvider, MovieServiceConsumer } from '../../services/MovieService/MoviesServiceContextAPI'
import { GenresProvider } from '../../services/MovieService/GenresContextAPI'
import MovieService from '../../services/MovieService/MovieService'
import Results from '../Results/Results'
import RatePage from '../RatePage/RatePage'


export default class App extends Component {
  state={
    inputValue:'',
    error:false,
    genres:null,
  }

  MovieService=new MovieService()

  onSentInput = (e) => {
    let value = e.target.value.replace(' ','%20')
    this.setState({
      inputValue:value
    })
  }

  componentDidMount(){
    this.getGenres()
    this.MovieService.updateGuestSession()    
  }

  getGenres = () => {
    if(this.state.genres) return
    this.MovieService.getGenres()
      .then((info)=> {
        this.setState({
          genres:info.genres
        })
      })
      .catch(() => {
        this.setState({
          error:true,
          loading:false,
        })
      })
  }

  compareGenres = (id) => {
    let el = this.state.genres.find((el)=>el.id===id)
    return el.name
  }

  componentDidCatch(){
    this.setState({
      error:true
    })
  }

  render() {
    const {inputValue, error }=this.state

    const results = inputValue? (<MovieServiceConsumer key='consumer'>
      {([{updateMovies, getTotalPages, rateMovie}, genres]) => {return(
        <GenresProvider value={[genres,rateMovie]}>
          <Results key='results' input={inputValue} updateMovies={updateMovies} 
            getTotalPages={getTotalPages}/>
        </GenresProvider>
      )}}          
    </MovieServiceConsumer>):<Alert key='alert' type='info' showIcon message='напечатайте что-нибудь'/>

    const rated = (<MovieServiceConsumer key='consumer'>
      {([{getRated}, genres]) => {return(
        <GenresProvider value={genres}>
          <RatePage MovieService={MovieService} key='rated' getRated={getRated}/>
        </GenresProvider> )}}          
    </MovieServiceConsumer>)


    const items = [
      {
        key: 1,
        label: 'Search',
        children: [
          <Input key='input' className='movies_searchbar' placeholder='Type to search...' autoFocus
            onChange={debounce(this.onSentInput.bind(this), 700)} onPressEnter={this.onSentInput}/>,
          [results]],
      },
      {
        key: 2,
        label: 'Rated',
        children: [rated],
      },
    ]

    if(error) return <Alert className='movies__alert' showIcon message='Что-то пошло совсем не так' type="error" />

    return (
      <MovieServiceProvider value={[this.MovieService, this.state.genres]}>
        <div className="page">
          <Offline>
            <Alert className='movies__alert' showIcon message='Кажется, у вас нет интернета. Проверьте сетевое соединение' type="error" />
          </Offline>
          <Tabs className='tabs' defaultActiveKey="1" items={items} centered />
        </div>
      </MovieServiceProvider>
    )
  }
}