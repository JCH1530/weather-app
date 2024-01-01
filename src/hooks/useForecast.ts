import { useState, useEffect } from "react";
import { locationType, forecastType } from "../types";
import { getLocationString } from "../helpers";

const useForecast = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState<locationType[] | null>(null);
  const [selectedLocationData, setSelectedLocationData] =
    useState<locationType | null>(null);
  const [forecastData, setForecastData] = useState<forecastType | null>(null);
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`;

    setSearchTerm(value);

    if (value.trim() === "") return;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setLocationData(data));
  };

  const locationClick = (location: locationType) => {
    setSearchTerm(getLocationString(location));
    setSelectedLocationData(location);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedLocationData === null) return;
    getForecast(selectedLocationData);
  };

  const getForecast = (data: locationType) => {
    const latitude = data?.lat;
    const longitude = data?.lon;
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const forecast = {
          ...data.city,
          list: data.list,
        };
        setForecastData(forecast);
      })
      .catch((error) => {
        console.error("Error details:", error.message);
        console.error("Error stack trace:", error.stack);
        console.log("Full error object:", error);
      });
  };

  const handleBackClick = () => {
    setForecastData(null);
    setSearchTerm("");
  };

  useEffect(() => {
    if (selectedLocationData) {
      setSearchTerm(
        `${selectedLocationData.name}, ${selectedLocationData.country}`
      );
      setLocationData([]);
    }
  }, [selectedLocationData]);

  return {
    searchTerm,
    locationData,
    selectedLocationData,
    forecastData,
    handleChange,
    locationClick,
    handleSubmit,
    handleBackClick,
  };
};

export default useForecast;
