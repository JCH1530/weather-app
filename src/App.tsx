import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

function App() {
  const {
    handleChange,
    handleSubmit,
    searchTerm,
    locationData,
    locationClick,
    forecastData,
    handleBackClick,
  } = useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 h-[auto] w-full min-h-[100vh]">
      {forecastData ? (
        <div className="mt-4">
          <Forecast
            forecastData={forecastData}
            handleBackClick={handleBackClick}
          />
        </div>
      ) : (
        <div className="mt-4">
          <Search
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            searchTerm={searchTerm}
            locationData={locationData}
            locationClick={locationClick}
          />
        </div>
      )}
    </main>
  );
}

export default App;
