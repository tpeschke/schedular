import React, { useState, useEffect } from 'react';
import './App.css';
import Day from './components/Day'
import holidayapi from './components/secrets'

export default function App() {
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth() + 2 === 13 ? 1 : new Date().getMonth() + 2);
  const [year, setYear] = useState(monthNumber === 1 ? new Date().getFullYear() + 1 : new Date().getFullYear())
  const [dayArray, setArray] = useState([]);
  const [holidays, setHolidays] = useState([])

  useEffect(() => {
    setUpMonthArray()
  }, [holidays]);

  useEffect(() => {
    if (holidays.length === 0) {
      setUpholidays()
    }
  })

  const daysOfTheWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thrusday',
    5: 'Friday',
    6: 'Saturday',
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

  const unavailableDays = {
    Monday: true,
    Tuesday: false,
    Wednesday: true,
    Thrusday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  }

  const startTimes = {
    Monday: [1800, 2200],
    Tuesday: [1800, 2200],
    Wednesday: [1800, 2200],
    Thrusday: [1800, 2200],
    Friday: [1800, 2200],
    Saturday: [1000, 2200],
    Sunday: [1000, 2200]
  }

  async function setUpholidays() {
    const totalDaysInMonth = new Date(year, monthNumber, 0).getDate()
    let endpoint = `${holidayapi.endpoint}?country=US&year=${year - 2}&month=${monthNumber}&key=${holidayapi.apiKey}`
    await fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        let holidayArray = []
        for (let i = 0; i < totalDaysInMonth; i++) {
          holidayArray.push([])
        }
        data.holidays.forEach(holiday => {
          let date = +holiday.date.split('-')[2]
          holidayArray[date - 1].push(holiday.name)
        })
        setHolidays(() => [...holidayArray])
      });
  }

  function setUpMonthArray() {
    const totalDaysInMonth = new Date(year, monthNumber, 0).getDate()
    const startingDay = new Date(`${monthNumber}/1/${year}`).getDay()

    let dayArray = []

    for (let i = 1; i <= startingDay; i++) {
      dayArray.push({ disabled: true })
    }

    for (let i = 0; i < totalDaysInMonth; i++) {
      let dayOfTheWeek = daysOfTheWeek[dayArray.length % 7]
      dayArray.push({ dayNumber: i + 1, unavailable: unavailableDays[dayOfTheWeek], defaultTimes: startTimes[dayOfTheWeek], holidays: holidays ? holidays[i] : [] })
    }

    for (let i = 0; i < ((totalDaysInMonth - startingDay + 1) % 7); i++) {
      dayArray.push({ disabled: true })
    }

    setArray(dayArray)
  }

  const setAvailibility = (index) => {
    return function () {
      dayArray[index].unavailable = !dayArray[index].unavailable
      setArray(dayArray)
    }
  }

  return (
    <div className="App">
      <h1>{monthsOfTheYear[monthNumber]} {year}</h1>

      <div className='calendar-body'>
        <div className='calendar-header'>
          <h2>Sunday</h2>
          <h2>Monday</h2>
          <h2>Tuesday</h2>
          <h2>Wednesday</h2>
          <h2>Thrusday</h2>
          <h2>Friday</h2>
          <h2>Saturday</h2>
        </div>
        <div className='calendar-day-body'>
          {dayArray.map((day, index) => {
            if (day.disabled && !day.dayNumber) {
              return <div key={index} className='day disabled-day'></div>
            }
            return <Day key={index} dayNumber={day.dayNumber} unavailable={day.unavailable} setAvailibility={setAvailibility(index)} defaultTimes={day.defaultTimes} holidays={day.holidays} />
          })}
        </div>
      </div>
    </div>
  );
}