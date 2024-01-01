import { getLocationString } from "../helpers";
import { locationType } from "../types";

type suggestionsProps = {
  locationData: locationType[] | null;
  locationClick: (location: locationType) => void;
};

const Suggestions = ({ locationData, locationClick }: suggestionsProps) => {
  return (
    locationData &&
    locationData.length > 0 && (
      <div className="bg-white py-2 px-2 w-full">
        <ul>
          {locationData.map((location, index) => (
            <li key={index} className="w-full">
              <button
                onClick={() => locationClick(location)}
                className="w-full text-left hover:bg-gray-600 hover:text-white px-2"
              >
                {getLocationString(location)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Suggestions;
