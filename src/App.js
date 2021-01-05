import './App.css';
import axios from 'axios';
import React from 'react';
import {useEffect, useState} from 'react';
import TemperatureChart from "./Charts/TemperatureChart";
import AirFrostChart from "./Charts/AirFrostChart";
import SunRainChart from "./Charts/SunRainChart";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 90,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: 'rgb(226,230,239)'
  }
}));


const instance = axios.create({
  baseURL: 'http://localhost:3000/pub/data/weather/uk/climate/stationdata'
});

function App() {
  const chartTypes = {
    TEMPERATURE: 'Temperature',
    AIR_FROST: 'Air Frost',
    SUN_RAIN: 'Sun & Rain'
  };

  const chartLocations = {
    bradforddata: 'Bradford',
    aberporthdata: 'Aberporth',
    armaghdata: 'Armagh'
  };

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedChartType, setSelectedChartType] = useState(chartTypes.TEMPERATURE);
  const [selectedChartLocation, setSelectedChartLocation] = useState(Object.keys(chartLocations)[0]);

  useEffect(async () => {
    const res = await instance.get(`/${selectedChartLocation}.txt`);
    let lines = res.data.split('\n');
    lines = lines.slice(7);

    const arr = [];
    for (let i = 0; i < lines.length; i++) {
      let [yyyy, mm, tmax, tmin, af, rain, sun] = lines[i].split(' ').filter(raw => raw !== '');
      arr.push({yyyy, mm, tmax, tmin, af, rain, sun, ts: Date.UTC(yyyy, mm - 1)});
    }
    setData(arr);

    const yearsObj = {};
    arr.forEach(raw => {
      if (typeof yearsObj[raw.yyyy] === 'undefined') {
        yearsObj[raw.yyyy] = true;
      }
    });
    setYearsList(Object.keys(yearsObj));
  }, [selectedChartLocation]);

  const filteredData = selectedYear ? data.filter(raw => raw.yyyy === selectedYear) : data;

  return (
    <div className="App">
      <div className="control_wrapper">
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option value={''} key={''}>All years</option>
            {yearsList.map(year => (
              <option value={year} key={year}>{year}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={selectedChartType}
            onChange={e => setSelectedChartType(e.target.value)}
          >
            {Object.entries(chartTypes).map(([key, value]) => (
              <option value={value} key={value}>{value}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={selectedChartLocation}
            onChange={e => setSelectedChartLocation(e.target.value)}
          >
            {Object.entries(chartLocations).map(([key, value]) => (
              <option value={key} key={key}>{value}</option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="chart_wrapper">
        {selectedChartType === chartTypes.TEMPERATURE && <TemperatureChart data={filteredData}/>}
        {selectedChartType === chartTypes.AIR_FROST && <AirFrostChart data={filteredData}/>}
        {selectedChartType === chartTypes.SUN_RAIN && <SunRainChart data={filteredData}/>}
      </div>
    </div>
  );
}

export default App;
