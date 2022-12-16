import React, { useState, useEffect } from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Day from './components/Day'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function App() {
  const [dayArray, setArray] = useState([]);;
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth() + 2 === 13 ? 1 : new Date().getMonth() + 2);
  const [year, setYear] = useState(monthNumber === 1 ? new Date().getFullYear() + 1 : new Date().getFullYear())

  useEffect(() => {
    if (dayArray.length === 0) {
      setUpMonthArray()
    }
  });

  const daysOfTheWeek = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thrusday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
  }
  const monthsOfTheYear = {
    1: 'January',
    2: 'Febuary',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }

  function setUpMonthArray() {
    const date = new Date();
    const dayNumber = date.getDay();
    const totalDaysInMonth = new Date(year, monthNumber, 0).getDate()
    const startingDay = new Date(`${monthNumber}/1/${year}`).getDay()

    let dayArray = []

    for (let i = 1; i <= startingDay; i++) {
      dayArray.push({ disabled: true })
    }

    for (let i = 0; i < totalDaysInMonth; i++) {
      dayArray.push({ dayNumber: i + 1, unavailable: false })
    }

    for (let i = 0; i <= (totalDaysInMonth % 7); i++) {
      dayArray.push({ disabled: true })
    }

    setArray(dayArray)
  }

  const setAvailibility = (index) => {
    return function () {
      dayArray[index].unavailable = !dayArray[index].unavailable
      setArray(dayArray)
      console.log(dayArray[index].unavailable)
    }
  }

  return (
    <div className="App">
      <h1>{monthsOfTheYear[monthNumber]} {year}</h1>

      <div className='calendar-body'>
        <div className='calendar-header'>
          <h2>Monday</h2>
          <h2>Tuesday</h2>
          <h2>Wednesday</h2>
          <h2>Thrusday</h2>
          <h2>Friday</h2>
          <h2>Saturday</h2>
          <h2>Sunday</h2>
        </div>
        <div className='calendar-day-body'>
          {dayArray.map((day, index) => {
            if (day.disabled && !day.dayNumber) {
              return <div key={index} className='day disabled-day'></div>
            }
            return <Day dayNumber={day.dayNumber} unavailable={day.unavailable} setAvailibility={setAvailibility(index)} />
          })}
        </div>
      </div>
    </div>
  );
}