import { useState, useEffect } from "react";

function WeatherAPI() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchType, setSearchType] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        if (searchType.length <= 1) {
            setShowDropDown(false);
            setCity([]);
            return;
        }
        setSearchLoading(true);
        const timer = setTimeout(() => {
            fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${searchType}&count=5&language=en&format=json`,
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.results) {
                        setCity(data.results);
                        setShowDropDown(true);
                    }
                    else {
                        setCity([]);
                        setShowDropDown(false);
                    }
                    setSearchLoading(false);
                })
                .catch((e) => {
                    console.error("Error fetching city data:", e);
                    setCity([]);
                    setSearchLoading(false);
                })
        }, 500);
        return () => clearTimeout(timer);
    }, [searchType]);

    const fetchWeather = (city) => {
        setLoading(true);
        setShowDropDown(false);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`,

        )
            .then((response) => response.json())
            .then((data) => {
                setWeatherData({
                    temperature: data.current_weather.temperature,
                    windspeed: data.current_weather.windspeed,
                    weathercode: data.current_weather.weathercode,
                    time: data.current_weather.time,
                });
                setLoading(false);
            })
            .catch((e) => {
                console.error("Error fetching city data:", e);
                setLoading(false);
            });
    }
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSearchType(city.name);
        fetchWeather(city);
    };
    return (
        <div>
            <h2>Weather Search</h2>
            <input
                type="text"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                placeholder="Search for a city..."
            />
            {searchLoading && <p>Searching...</p>}
            {showDropDown && (
                <div style={{ border: "1px solid #ccc", borderRadius: "4px", maxHeight: "200px", overflowY: "auto" }}>
                    {city.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => handleCitySelect(c)}
                            style={{ padding: "8px 12px", cursor: "pointer" }}
                        >
                            {c.name}, {c.country}
                        </div>
                    ))}
                </div>
            )}
            {loading && <p>Loading weather...</p>}
            {weatherData && (
                <div>
                    <h3>{selectedCity?.name}, {selectedCity?.country}</h3>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Wind Speed: {weatherData.windspeed} km/h</p>
                    <p>Time: {weatherData.time}</p>
                </div>
            )}
        </div>
    )
}
export default WeatherAPI;