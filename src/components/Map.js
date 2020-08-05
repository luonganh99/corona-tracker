import React, { useRef, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
import Typograhphy from '@material-ui/core/Typography';

const casesTypeColors = {
    cases: {
        hex: '#CC1034',
        multiplier: 800,
    },
    recovered: {
        hex: '#7dd71d',
        multiplier: 1200,
    },
    deaths: {
        hex: '#fb4443',
        multiplier: 2000,
    },
};

function Map({ center, zoom, countriesInfo, caseType, countryInfo }) {
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    // url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                />
                {countriesInfo.map((country) => (
                    <Circle
                        center={[country.countryInfo.lat, country.countryInfo.long]}
                        fillOpacity={0.4}
                        color={casesTypeColors[caseType].hex}
                        fillColor={casesTypeColors[caseType].hex}
                        radius={Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier}
                        id={country.country}
                    >
                        <Popup>
                            <div className='pop-up'>
                                <img src={country.countryInfo.flag} alt='flag' />
                                <Typograhphy variant='h6'>{country.country}</Typograhphy>
                                <Typograhphy variant='subtitle2'>
                                    Total: {numeral(country.cases).format('0,0')}
                                </Typograhphy>
                                <Typograhphy variant='subtitle2'>
                                    Active: {numeral(country.active).format('0,0')}
                                </Typograhphy>
                                <Typograhphy variant='subtitle2'>
                                    Recovered: {numeral(country.recovered).format('0,0')}
                                </Typograhphy>
                                <Typograhphy variant='subtitle2'>
                                    Deaths: {numeral(country.deaths).format('0,0')}
                                </Typograhphy>
                            </div>
                        </Popup>
                    </Circle>
                ))}
            </LeafletMap>
        </div>
    );
}

export default Map;

// https://stackblitz.com/edit/react-v451tg?file=Map.js
