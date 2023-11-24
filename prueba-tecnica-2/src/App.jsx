import React, { useEffect, useState } from 'react'
import './App.css'

const API_KEY = 'd73b1bef'

const App = () => {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState()

    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

    const handleChange = (event) => {
        const newSearch = event.target.value
        setSearch(newSearch)
        //debouncedGetMovies(newSearch)
    }

    const handleSubmit = (event) => {
        console.log("texto a buscar-> ", search)
        event.preventDefault()
        getMovies()
    }

    const getMovies = async () => {
        await fetch(`${API_URL}&s=${search}`)
            .then(
                response => {
                    //manejo de errores
                    if (!response.ok) throw new Error('Error fetching movies')
                    return response.json()
                }
            )
            .then(
                data => {
                    console.log(data.Search)
                    setMovies(data.Search)
                }
            )
            .catch((error) => {
                //tanto si hay un error con la respuesta 
                //como si hay un error en la petición
                console.log("Error fetching data")
            })
    }
    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className='page'>
            <h1>Films</h1>
            {

                <form
                    onSubmit={handleSubmit}>
                    <input type='text' name='movieInput' id='movieInput' placeholder='Introduce título...'
                        onChange={handleChange}
                    ></input>
                    <button type='submit'>Buscar</button>
                </form>
            }
            <ul className='movies-list' >
                {
                    movies
                        ?
                        movies.map((movie, index) => (
                            <li key={index} className='new-item' style={{ listStyle: 'none' }}>
                                <div className="new-card">
                                    <img src={movie.Poster} alt='movie image' />
                                    <p className='movieTitle'>{movie.Title}</p>
                                </div>
                            </li>
                        ))
                        : 'No se han encotrado películas'
                }
            </ul>
        </div>
    )
}

export default App