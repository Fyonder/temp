import { useState } from "react";

function App() {
  
  const [city, setCity] = useState("")
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSaearch = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=e751ea9cf5bc4fcbbb3225428211810&q=${city}&lang=pt`)
    .then((response) => {
      console.log(response)
      if(response.status === 200){
        return response.json()
      }
    })
    .then((data) => {
      setWeatherForecast(data)
    })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Filipe Previsão do Tempo
        </a>
      </nav>
      
      <main className="container">
        <div className="jumbotron">
          <h1>Verifique a Previsão da sua Cidade</h1>
          <p className="lead">Digite o Nome da Sua Cidade no campo abaixo</p>
        
          <div className="row mb-4">
           <div className="col-md-6">
            <input 
            className="form-control"
            value={city}
            onChange={handleChange}
            />
           
           </div>
          </div>

          <button 
          className="btn btn-primary btn-lg" 
          onClick={handleSaearch}>
            Pesquisar
          </button>
        
          {weatherForecast ? (
            <>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img
                    src={`${weatherForecast.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                </div>
                <div>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">
                    Temperatura: {weatherForecast.current.temp_c}&#8451;
                  </p>
                </div>
              </div>
            </>
          ) : null} 

        </div>
      </main>

    </div>
  );
}

export default App;
