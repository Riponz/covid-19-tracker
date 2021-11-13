import React, { useEffect, useState } from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core"
import InfoButton from './InfoButton';


function App() {
  const [countries, setCountries] = useState([])
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});

  const getcountrynameonchange = async (e) => {
    const countryinfo = e.target.value;

    const url = countryinfo === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryinfo}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryinfo);
        setcountryInfo(data);
        console.log(data.todayCases + ' ' + data.deaths + ' ' + data.recovered)
      });

  }



  // useEffect(() => {
  //   fetch("https://disease.sh/v3/covid-19/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setcountryInfo(data);
  //     });
  // }, []);

  useEffect(() => {
    const getWorldwideData = () => {
      fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then((data) => {
          setcountryInfo(data);
        })
    }

    getWorldwideData()


  }, [])

  useEffect(() => {
    const getCountriesName = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          setCountries(countries);
        })
    }
    getCountriesName();
  }, [])
  return (
    <div className="app">
      <div className="app__header">
        <h2>COV19 TRACKER</h2>
        <FormControl className="header__dropdown">
          <Select variant="outlined" value={country} onChange={getcountrynameonchange} >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem className="" value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>

        </FormControl>
      </div>
      <div className="app__left">
        <InfoButton title="Corona Virus Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases} />

        <InfoButton title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered} />

        <InfoButton title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths} />
        {/* <Map/> */}

      </div>


      <div className="app__right">
        {/* <Table/> */}
        {/* <Graph/> */}

      </div>
    </div>
  );
}

export default App;
