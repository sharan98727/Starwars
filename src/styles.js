import styled from 'styled-components';

export const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width:100%;
    min-height: 80px;
    padding:10px 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

    .right-side-filters {
        display:flex;
        align-items: center;
        flex-wrap:wrap;
    }
`;

export const MovieContent = styled.div`
    width:100%;
    display: flex;
    flex-direction: row;
    gap:20px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    overflow: auto;
    flex: 1;
`;

export const FiltersContainer = styled.div`
    background-color: gray;
    color:white;
    height: 60px;
    min-width: 60px;
    border-radius: 30px;
    box-shadow: 0 0px 8px 4px rgb(0 0 0/20%);
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    padding: 10px;  

    img{
        border-radius: 100%;
        height: 40px;
        width: 40px;
    }
`;
export const MovieCard = styled.div`
    background-color: linear-gradient
    color: white;
    border-radius: 10px;
    padding: 16px;
    width:35%;
    min-height: 350px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    text-align: left;

    .field-container{
        display: flex;
        align-items:center;
        margin-bottom: 8px;

    }

    .label{
        margin-right: 4px;
        font-weight: 400;
        font-size: 14px;
    }

    p{
        margin:0;
    }

    .release-date, .director, .producers{
        font-weight: 500;
        font-size: 16px;
    }

    .summary {
        margin-top: 4px;
        font-weight: 400;
        font-size:16px;
        text-align: justify;
    }
    
    @media (max-width: 480px){
        width: 85%;
    }
`;

export const SelectDropdownContainer = styled.div`
    display: flex;
    align-items: center;
    color: black;
    width:250px;
`;

export const customSelectStyles = {
    container: (provided) => ({
        ...provided,
        flex: 1
    }),
    option: (provided) => ({
        ...provided,
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding : '6px 12px',
        margin: '4px 0',
        textAlign: "left"
    }),
    menu: (styles) => ({...styles,borderRadius: '6px',padding: '2px', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.16)', border: '1px solid #ccc', zIndex: 994}),
    indicatorSeparator: () => ({display:'none'}),
    control: (styles) => ({ ...styles,
        boxShadow: '0px',cursor: 'pointer' , border: '1px solid #B3B3B3' , borderRadius: '8px',minHeight: '44px',
    }),
    singleValue: (providedStyles) => ({...providedStyles, textAlign: 'left'})
};

export const SearchContainer = styled.div`
`;

export const DropdownLabel = styled.div`
    margin-right: 5px;
`;

export const SuggestionsBox = styled.div`
    position: absolute;
    background-color: white;
    top: 45px;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 10px;
    min-width:80%;
    width:250px;
    li{
        list-style-type: none;
        border-bottom: 1px solid #ccc;
        padding:8px;
        text-align: left;
        cursor: pointer;
    }

    .active-suggestion {
        background-color: #ccc;
    }

    li:hover, li:active{
        background-color: #ccc;
    }

    li:last-child {
        border-bottom: none;
    }
`;

export const SearchFilterBox = styled.div`
    position: relative;
    display:flex;
    width: 250px; 
    .search-icon{
        position:absolute;
        top:50%;
        transform: translateY(-50%);
        right:10px;
    } 

    .search-input {
        border: 2px solid #CCCCCC;
        border-radius: 8px;
        min-height: 40px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        padding: 0px 10px;
        width:100%;
    }

    input:focus{
        outline: none;
        border: 2px solid gray;
    }
`;