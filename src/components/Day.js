import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

export default function Day(props) {
    const [value, setValue] = useState([1000, 2200]);
    const [unavailable, setUnavailable] = useState(props.unavailable);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const valuetext = (value) => {
        if (value >= 1300) {
            return `${value - 1200} pm`
        }
        return `${value} am`
    }

    const setAvailibility = () => {
        props.setAvailibility()
        setUnavailable(!unavailable)
    }

    if (unavailable) {
        return (<div className='day'>
            <Button onClick={setAvailibility} disableElevation variant="text">{props.dayNumber}</Button>
        </div>)
    }
    return (<div className='day'>
        <Button onClick={setAvailibility} disableElevation variant="text">{props.dayNumber}</Button>
        <Slider
            valueLabelFormat={valuetext}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            step={30}
            min={1000}
            max={2200}
        />
    </div>)
}

