import React, { useEffect, useState } from 'react'
import { DropdownLabel, FilterHeader, MovieCard, MovieContent, SearchContainer, SelectDropdownContainer } from '../../styles';
import CommonReactSelect from '../GenericComponents/CommonReactSelect';
import SearchFilter from '../GenericComponents/SearchFilter';

const sortOptions = [
    {label: 'Default', value:'default'},
    {label: 'Release Date: Old to New', value: 'dateAsc'},
    {label: 'Release Date: New to Old', value: 'dateDesc'},
    {label: 'Title: Ascending', value: 'titleAsc'},
    {label: 'Title: Descending', value: 'titleDesc'}
]

const MovieContainer = () => {
    const [movieData, setMoviesData] = useState([]),
        [filteredMovieData, setFilteredMovieData] = useState([]),
        [directorsDropdownData, setDirectorsDropdownData] = useState([]),
        [selectedDirector, setSelectedDirector] = useState({label:'All Directors', value:'All'}),
        [isLoadingData, setIsLoadingData] = useState(false),
        [searchFilterValue, setSearchFilterValue] = useState(''),
        [sortOptionSelected, setSortOptionSelected] = useState({label: 'Default', value:'default'})

    const query = `
    query{
      allFilms{
        films {
          episodeID
          releaseDate
          director
          title
          producers
          director
          openingCrawl
        }
      }
    }`
    useEffect(() => {
        setIsLoadingData(true)
        fetch("https://swapi-graphql.netlify.app/.netlify/functions/index", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({query:query})
        })
        .then((res) => res.json())
        .then((res) => {
            setMoviesData(res.data.allFilms.films)
            setIsLoadingData(false)
        })
        .catch(() => setIsLoadingData(false))
    }, [query]);

    useEffect(() => {
        let directors = movieData.map(movie => movie.director);
        let directorsData = [{label:'All Directors', value:'All'}]
        movieData.forEach((movie, index) => {
            if(directors.indexOf(movie.director) === index)
                directorsData.push({label: movie.director, value: movie.director})
        })
        setDirectorsDropdownData(directorsData)
        setFilteredMovieData(movieData)
    },[movieData])

    const displayProducers = (producersList) => {
        let producersData  = ''
        producersList.forEach(producer => {
            producersData += producer + ','
        })
        return producersData
    }

    const filterFn = (movie, value) => {
        return movie.title.toLowerCase().includes(value.toLowerCase())
    }

    const setDataBasedOnSearchValue = (value, data) => {
        let newData = data.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredMovieData(newData)
        setSelectedDirector({label:'All Directors', value:'All'})
        setSortOptionSelected({label: 'Default', value:'default'})
    }

    useEffect(() => {
        let filteredData = [...movieData]
        if(sortOptionSelected.value !== 'default'){
            if(sortOptionSelected.value === 'titleAsc'){
                filteredData.sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
            } else if(sortOptionSelected.value === 'titleDesc'){
                filteredData.sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1)
            } else if(sortOptionSelected.value === 'dateAsc'){
                filteredData.sort((a,b) => new Date(a) < new Date(b) ? -1 : 1)
            } else if(sortOptionSelected.value === 'dateDesc'){
                filteredData.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
            }
        }
        if(selectedDirector.value !== 'All'){
            filteredData = filteredData.filter(movie => movie.director === selectedDirector.value)
        }
        if(searchFilterValue && (sortOptionSelected.value !== 'default' ||  selectedDirector.value !=='All')){
            let extraFilteredData = filteredData.filter(movie => movie.title.toLowerCase().includes(searchFilterValue))
            setFilteredMovieData(extraFilteredData)
        } else if(!searchFilterValue) {
            setFilteredMovieData(filteredData)
        }
    },[sortOptionSelected, selectedDirector, movieData])



    const handleDirectorChange = (e) => {
        setSelectedDirector(e)
    }

    const handleSort = (e) => {
        setSortOptionSelected(e)
    }

    return(
        <>
            <FilterHeader>
                <h2>Movies</h2>
                <div className='right-side-filters'>
                <SelectDropdownContainer className='m-5'>
                    <DropdownLabel>Director:</DropdownLabel>    
                    <CommonReactSelect 
                        options={directorsDropdownData}
                        onChange = {handleDirectorChange}
                        value={selectedDirector}
                    />
                </SelectDropdownContainer>
                <SelectDropdownContainer className='m-5'>
                    <DropdownLabel>Sort By:</DropdownLabel> 
                    <CommonReactSelect 
                        options={sortOptions} 
                        onChange={handleSort}
                        value={sortOptionSelected}
                    />
                </SelectDropdownContainer>
                <SearchContainer className='m-5'>
                    <SearchFilter setDataBasedOnSearchValue={setDataBasedOnSearchValue} filterFn = {filterFn} suggestionShowKey = 'title'  searchData={movieData} searchFilterValue={searchFilterValue} setSearchFilterValue={setSearchFilterValue}/>
                </SearchContainer>
                </div>
            </FilterHeader>
            <MovieContent>
                {isLoadingData ? <>Loading</> : filteredMovieData.length ? filteredMovieData.map((item) => {
                    return(
                        <MovieCard key={item.episodeID}>
                            <h2 className='movie-name'>{item.title}</h2>
                            <div className='field-container'>
                                <p className='label'>Release Date:</p>
                                <p className='release-date'>{item.releaseDate}</p>
                            </div>
                            <div className='field-container'>
                                <p className='label'>Director: </p>
                                <p className='director'>{item.director}</p>
                            </div>
                            <div className='field-container'>
                                <p className='label'>Producers:</p>
                                <p className='producers'>{displayProducers(item.producers)}</p>
                            </div>
                            <hr/>
                            <div>
                                <p className='label'>Summary:</p>
                                <p className='summary'>{item.openingCrawl}</p>
                            </div>
                        </MovieCard>
                    )
                }) : <>No Data to show</>}
            </MovieContent>
        </>
    )
}

export default MovieContainer