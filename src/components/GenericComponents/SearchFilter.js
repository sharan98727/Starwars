import React, { useCallback, useState } from 'react'
import { SearchFilterBox, SuggestionsBox } from '../../styles'
import SearchIcon from "../../images/icon-search.png"


const SearchFilter = ({searchFilterValue, setDataBasedOnSearchValue, suggestionShowKey, setSearchFilterValue, suggestionFn, searchData, filterFn}) => {

    const [suggestionData, setSuggestionData] = useState([]),
        [isInputFocussed, setIsInputFocussed] = useState(false),
        [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
    function debounce(fn, delay){
        let timer
        return function(...args){
            let context = this;
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(context, args)
            },delay)
        }
    }

    const handleChange = (value, searchData) => {
        let data = searchData.filter((item) => filterFn(item, value))
        setSuggestionData(data)
    }

    const deBounceFn = useCallback(debounce(handleChange, 1000), [])

    const handleBlur = (e) => {
        setIsInputFocussed(false)
        setActiveSuggestionIndex(0)
    }

    const handleFocus = () => {
        setIsInputFocussed(true)
    }

    const handleSuggestionClick = (value) => {
        setSearchFilterValue(value)
        setDataBasedOnSearchValue(value, searchData)
    }

    const handleKeyDown = (e) => {
        console.log(e.key)
        debugger;
        if(e.key === 'Enter'){
            setDataBasedOnSearchValue(e.target.value, searchData)
            setIsInputFocussed(false)
        } else if (e.key === 'ArrowUp') {
            if (activeSuggestionIndex === 0) {
              return;
            }  
            setSearchFilterValue(suggestionData[activeSuggestionIndex-1].title)
            setActiveSuggestionIndex((activeSuggestionIndex) => activeSuggestionIndex-1)    
        }
          // User pressed the down arrow
          else if (e.key === 'ArrowDown') {
            if (activeSuggestionIndex - 1 === suggestionData.length) {
              return;
            }
            setSearchFilterValue(suggestionData[activeSuggestionIndex+1].title)
            setActiveSuggestionIndex((activeSuggestionIndex) => activeSuggestionIndex+1) 
          }
    }
    console.log(activeSuggestionIndex)
    return(
        <>
        <div>
            <SearchFilterBox>
            <input 
                className='search-input'
                value={searchFilterValue} 
                onChange={(e) => {
                    setSearchFilterValue(e.target.value)
                    deBounceFn(e.target.value, searchData)
                }}
                placeholder=" Search movie Title"
                onKeyDown={handleKeyDown}
                onFocus = {handleFocus}
                onBlur = {handleBlur}
            />
            <img src={SearchIcon} alt='icon' className='search-icon'/>
            {isInputFocussed && searchFilterValue ? <SuggestionsBox> { suggestionData.length ? suggestionData.map((item, index) => {
                let className
                if(index === activeSuggestionIndex){
                    className = 'active-suggestion'
                }
            return(
                <li className={className} key={item[suggestionShowKey]} onMouseDown={() => handleSuggestionClick(item[suggestionShowKey])}>{item[suggestionShowKey]}</li>
            ) 
        }) : <div>No Suggestions</div> } </SuggestionsBox> : null}
            </SearchFilterBox>
        </div>
        </>
    )
}

export default SearchFilter