import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Tooltip from '@mui/material/Tooltip';

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

    const getTimeRangeDisplay = (times) => {
        if (times[0] === times[1]) {
            return valuetext(times[0])
        }
        return `${valuetext(times[0])} - ${valuetext(times[1])}`
    }

    const setAvailibility = () => {
        props.setAvailibility()
        setUnavailable(!unavailable)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    if (unavailable) {
        return (<div className='day'>
            <Button onClick={setAvailibility} disableElevation variant="text">{props.dayNumber}</Button>
        </div>)
    }

    let holidays = <div></div>
    if (props.holidays && props.holidays.length > 0) {
        holidays = (<div className='holidays'>
            <Button variant="text">
                <Tooltip title="Holidays">
                    <NewReleasesIcon fontSize='medium' color="error" aria-describedby={id} onClick={handleClick} />
                </Tooltip>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    <Grid container spacing={1}>
                        {props.holidays ? props.holidays.map(holiday => <Grid item key={holiday} xs={16}>{holiday}</Grid>) : <span></span>}
                    </Grid>
                </Typography>
            </Popover>
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
        <p>{getTimeRangeDisplay(value)}</p>
        {holidays}
    </div>)
}

