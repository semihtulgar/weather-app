import { useLocation } from '../context/LocationContext'
import data from "../cities_of_turkey.json"

function Header() {
    const {setLocationData} = useLocation();
    
    function onChangeLocation(event){
        let newCoordinates = event.target.value.split(",").map((item) => Number(item))
        setLocationData(newCoordinates)
    }

    function onClick(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success); 
        }else{
           console.log('Konum Erişimi Yok');
        }
    }

    function success(position){
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocationData([latitude, longitude])
    }

    return (
        <>
        <div className="header w-25 p-3">
            <select className="form-select form-select-lg mb-3 bg-secondary text-white" aria-label=".form-select-lg example" onChange={onChangeLocation}>
                {data.map((item, key) => (
                    <option key={key} value={[item.latitude, item.longitude]}>{item.name}</option>
                ))}
            </select>
            <i className="fas fa-location-arrow fa-3x" onClick={onClick}></i>
        </div>
        </>
    )
}

export default Header
