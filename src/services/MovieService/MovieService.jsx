import { Component } from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

export default class MovieService extends Component {

  totalPages
  totalRatePages
 
  apiKey='a4a7b57541bec4d7d07a9582d811124b'

  baseUrl='https://api.themoviedb.org/3/'

  getTotalPages = () => {
    return this.totalPages
  }

  getTotalRatePages = () => {
    return this.totalRatePages
  }

  rateMovie = (id,value) => {
    let session=localStorage.getItem('MoviesSessionID')
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json;charset=utf-8',
        accept:'application/json',
      },
      body: JSON.stringify({value:value})
    }
    let link = `${this.baseUrl}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${session}`
    fetch(link, options)
      .then(response => response.json())
      .catch(err => console.error(err))
  }

  getRated = async () => {
    let session=localStorage.getItem('MoviesSessionID')
    let link = `${this.baseUrl}guest_session/${session}/rated/movies?api_key=${this.apiKey}&language=en-US&page=1&sort_by=created_at.asc`
    let res = await fetch(link)
      .then(response => response.json())
      .then(response => {
        this.totalRatePages=response.total_pages
        return response})
      .catch(err => console.error(err))
    let newRes = this.transformData(res.results)
    return newRes
  }

  getGuestSession = async () =>{
    let res = await fetch(`${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`)
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err))
    return res
  }

  updateGuestSession() {
    let oldDate = new Date(localStorage.getItem('MoviesSessionEndDate'))
    let now = new Date()
    if(!oldDate || now > oldDate) {
      localStorage.removeItem('MoviesSessionID')
      localStorage.removeItem('MoviesSessionEndDate')
    
      this.getGuestSession().then((res)=> {
        let removeData= new Date(res.expires_at)
        removeData.setDate(removeData.getDate()+1)
        localStorage.setItem('MoviesSessionID', res.guest_session_id)
        localStorage.setItem('MoviesSessionEndDate', removeData)
      })
    }
  }

  getGenres = async () => {
    const url=`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=en`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Ошибка получения жанров')
    let result =  await res.json()
    return result
  }

  getMovies = async (url) => {
    const res = await fetch(url)
    if (res.status === 404) throw new Error('Не найдено')
    if (!res.ok) throw new Error(`что-то не так с запросом: ${url}, ответ: ${res.status}`)
    let result =  await res.json()
    if (!result.results.length) throw new Error('Не найдено')
    return result
  }
  
  updateMovies = async (input, page ) => {
    const url= `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${input}&include_adult=false&language=en-US&page=${page}`
    let res = await this.getMovies(url)
      .then((data)=> {
        this.totalPages=data.total_pages
        return data.results})
    const newres= this.transformData(res)
    return newres
  }

  cutText(text, num){
    const arr = text.split(' ')
    let newText = arr.length > num?arr.slice(0,num).join(' ')+'...': text
    return newText
  }
  
  transformData = (res) => {
    const newRes = res.map((movieData) => {
      const date = movieData.release_date?format(new Date (movieData.release_date), 'MMMM dd, yyyy') :null
      const description = this.cutText(movieData.overview, 15)
      const noPoster = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxESEBAQEg8QEBAQEA8PFhAQDw8QDxAVFREWFhUSFhUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDysZFRkrLTcrKystKysrLSsrNysrKysrKystLSsrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAQ0AuwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwQBAgUHBgj/xABFEAABAwIDBQYEAwQEDwAAAAABAAIDBBESITEFBhNBURQiYXGBsQcykaEzwdEjUmLwCDZCcxUWJDVTVXJ0gpOUsrO00v/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAFB/9oADAMBAAIRAxEAPwD3FERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAXMh2/SOn7M2spnVAc9vZ21ERnDmglw4YOK4AJI5WK6a/N+zq4Qb3zSmOaQMrK/uQRPnmN4JW92NgJOtzbQAlB78zb1IZ+zCspjU4i3s4qIjPcAkt4d8VwAToq0m92zWOcx20qFr2uLXNdWU7XNINi0guuCDyXiG7NUJd8RKGSMD6mrdhljdFI3/JZMnMdm0+BVbcesji3irnywS1DeJtAcOGmfVPuZ9eG0E28UHvZ3ooOFx+30fB4nC4vaoOFxMOLh48VsVs7a2UX+Oey/9abP/wCtpv8A6VrZ8cE0LHCm4cbzjEU1PwntOl3RuHdNuq8J3Cp2O3sq2FjCwVO1BgLWlos+S1hog/QdJUslY2SORkkbxia+Nwexw6hwyIUy0ijDQGtaGtGQDQAB5ALdAREQEREBERAREQEREBERAREKAiwEJQZXg+72xqpu976h1LUNg7XtB3HdBKIbOp5g04yLWJIAN87he7rCDwzZWxqob3uqDS1Ap+01R45glENjTSAHHa1rkDVU9yYJ6Pb9ZVz0VcIHPrmtkZQ1Uodjmu0jC03BA1Xv6zZBy9ibcjqseCOp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'
      const imgPath=(movieData.poster_path)?
        `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movieData.poster_path}`:noPoster
      return ({
        title: this.cutText(movieData.title,8),
        date:date,
        tags:movieData.genre_ids,
        overview:description,
        posterPath:imgPath,
        id:movieData.id,
        vote:(movieData.vote_average.toFixed(1)),
        rate:movieData.rating
      })
    })
    return newRes
  }
}

MovieService.defaultProps = {
  input:' ',
  page:1
}
  
MovieService.propTypes = {
  input: PropTypes.string,
  page:PropTypes.number
}
  