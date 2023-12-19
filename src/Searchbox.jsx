import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";

export default function Searchbox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "124daf6b3a64ceab0ab33f38d5f9bdb1";

  const getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      let jsonResponse = await response.json();

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        temp_min: jsonResponse.main.temp_min,
        temp_max: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feels_like: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      return result;
    } catch (err) {
      throw new Error("Error fetching weather data");
    }
  };

  const handleChanges = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="City"
          value={city}
          onChange={handleChanges}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Get Weather
        </Button>
        {error && <p style={{ color: "red" }}>No such place exists! </p>}
      </form>
    </div>
  );
}
