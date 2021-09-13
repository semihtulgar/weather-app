import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import { LocationProvider } from './context/LocationContext';
import { WeatherProvider } from './context/WeatherContext';

function App() {

  return (
    <div className="App" >
      <LocationProvider>
        <WeatherProvider>
          <Header />
          <Container />
        </WeatherProvider>
      </LocationProvider>
    </div>
  );
}

export default App;
