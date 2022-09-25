import React from "react"
import Select from "react-select";
import { customSelectStyles } from "../../styles";

const CommonReactSelect = ({options, onChange, value}) => {
    return (

        <Select 
            options={options}
            onChange={onChange}
            value={value}
            menuPlacement='auto'
            styles={customSelectStyles}
        />
    )
}

export default CommonReactSelect