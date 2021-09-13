import { createContext, useContext,  useState } from "react";
import data from "../cities_of_turkey.json"

const LocationContext = createContext();

export const LocationProvider = ({children}) => {

    const [locationData, setLocationData] = useState([Number(data[0].latitude), Number(data[0].longitude)]);

    const values = {locationData, setLocationData}

    return <LocationContext.Provider value={values}>{children}</LocationContext.Provider>
}

export const useLocation = () => useContext(LocationContext)