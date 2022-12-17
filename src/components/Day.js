import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

Day.defaultProps = {
    holidays: []
}

export default function Day(props) {
    const [value, setValue] = useState(props.times);
    const [unavailable, setUnavailable] = useState(props.unavailable);

    const handleChange = (event, newValue) => {
        props.setTimeout(newValue)
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
    return (<div className='day' id='day-component'>
        <Button onClick={setAvailibility} disableElevation variant="text">{props.dayNumber}</Button>
        <Slider
            valueLabelFormat={valuetext}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            step={30}
            min={1000}
            max={1800}
        />
        <p>{valuetext(value[0])} - {valuetext(value[1])}</p>
        <div className='grid-div'>
            <Grid container spacing={1}>
                {props.holidays ? props.holidays.map(holiday => <Grid key={holiday} xs={16}>{holiday}</Grid>) : <div></div>}
            </Grid>
        </div>
    </div>)
}

