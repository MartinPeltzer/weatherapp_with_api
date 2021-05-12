import React, { useEffect, useState, useContext } from 'react';
import { TempContext } from "../../context/TempContextProvider";
import axios from "axios";
import './ForecastTab.css'
//import kelvinToCelcius from "../../helpers/kelvinToCelcius";
import createDateString from "../../helpers/createDateString";

const apiKey ='620c29ea8666e616e5cd46cb0d2acdf4';

function ForecastTab({ coordinates }) {
    const [forecasts, setForecasts] = useState(null);
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { kelvinToMetric } = useContext(TempContext);

    //7.6 timestamp functie toevoegen.


    useEffect(() => {
        async function fetchData() {
            setError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
                setForecasts(result.data.daily.slice(1, 6));
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                setError(true);
                toggleLoading(false);
            }
        }

        if (coordinates) {
            fetchData();
        }

    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            {forecasts && forecasts.map((forecast) => {
                return (
                    <article className="forecast-day" key={forecast.dt}>
                        <p className="day-description">
                            {createDateString(forecast.dt)}
                        </p>
                        <section className="forecast-weather">
                            <span>
                                {kelvinToMetric(forecast.temp.day)}
                            </span>
                            <span className="weather-description">
                                {forecast.weather[0].description}
                            </span>
                        </section>
                    </article>
                )
            })}

            {!forecasts && !error && (
                <span className="no-forecast">
                    Zoek eerst een locatie om het weer voor deze week te bekijken
                </span>
            )}

            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}

            {loading && (<span>Loading...</span>)}
        </div>
    );
};

export default ForecastTab;
