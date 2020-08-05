import React, { useState, useEffect } from 'react';
import logo from '../assets/imgs/logo.png';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfoBox from '../components/InfoBox';
import CountryTable from '../components/CountryTable';
import Map from '../components/Map';
import axios from '../axios-order';
import 'leaflet/dist/leaflet.css';

export default function Main() {
    const [countriesInfo, setCountriesInfo] = useState([]);
    const [countryInfo, setCountryInfo] = useState({});

    const [countriesName, setCountriesName] = useState(['Worldwide']);
    const [countryName, setCountryName] = useState('Worldwide');

    const [caseType, setCaseType] = useState('cases');

    const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
    const [mapZoom, setMapZoom] = useState(2);

    useEffect(() => {
        axios
            .get('/all')
            .then((res) => {
                // const {
                //     cases,
                //     recovered,
                //     deaths,
                //     todayCases,
                //     todayRecovered,
                //     todayDeaths,
                // } = res.data;
                setCountryInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get('/countries')
            .then((res) => {
                const formatData = res.data.map((c) => c.country);
                setCountriesName([...countriesName, ...formatData]);
                setCountriesInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleCountryChange = (e, chosenCountryName) => {
        if (chosenCountryName) {
            // User choose a country
            setCountryName(chosenCountryName);

            // Set country info for the country
            const url =
                chosenCountryName === 'Worldwide' ? '/all' : `/countries/${chosenCountryName}`;
            axios
                .get(url)
                .then((res) => {
                    setCountryInfo(res.data);
                    if (chosenCountryName !== 'Worldwide') {
                        setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
                        setMapZoom(5);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            // Update table
            axios
                .get('/countries')
                .then((res) => {
                    setCountriesInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className='main'>
            <div className='main-container'>
                <div className='left'>
                    <div className='header'>
                        {/* Header */}
                        <div className='logo-title'>
                            <img className='logo' src={logo} alt='logo' />
                            <div className='title'>
                                <h1>COVID-19</h1>
                                <h3>TRACKER</h3>
                            </div>
                        </div>

                        {/* Search Box */}
                        <Autocomplete
                            className='search-box'
                            id='combo-box-demo'
                            options={countriesName}
                            value={countryName}
                            onChange={handleCountryChange}
                            renderInput={(params) => (
                                <TextField {...params} label='Search country' variant='outlined' />
                            )}
                        />
                    </div>
                    <div className='cards'>
                        <InfoBox
                            title='Total Cases'
                            newCases={countryInfo.todayCases}
                            totalCases={countryInfo.cases}
                            caseType='cases'
                            countryName={countryName}
                            onClick={(e) => setCaseType('cases')}
                            active={caseType === 'cases'}
                        />
                        <InfoBox
                            title='Recovered'
                            newCases={countryInfo.todayRecovered}
                            totalCases={countryInfo.recovered}
                            caseType='recovered'
                            countryName={countryName}
                            onClick={(e) => setCaseType('recovered')}
                            active={caseType === 'recovered'}
                        />
                        <InfoBox
                            title={'Deaths'}
                            newCases={countryInfo.todayDeaths}
                            totalCases={countryInfo.deaths}
                            caseType='deaths'
                            countryName={countryName}
                            onClick={(e) => setCaseType('deaths')}
                            active={caseType === 'deaths'}
                        />
                    </div>
                    <Map
                        center={mapCenter}
                        zoom={mapZoom}
                        countriesInfo={countriesInfo}
                        caseType={caseType}
                        countryInfo={countryInfo}
                    />
                </div>
                <div className='right'>
                    <CountryTable className='table-detail' countriesInfo={countriesInfo} />
                </div>
            </div>
        </div>
    );
}
