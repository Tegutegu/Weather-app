import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

//api key can be obtained from openweathermap.org
const API_KEY = " ";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humiditiy: undefined,
    description: undefined,
    error: undefined,
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //url from account for openweathermap.org goes here
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json(); 
    if (city && country) {
    this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humiditiy: data.main.humiditiy,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humiditiy: data.main.humiditiy,
        description: data.weather[0].description,
        error: "Please enter the value."
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container"> 
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humiditiy={this.state.humiditiy}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>      
          </div>
        </div>
      </div> 
    );
  }
};

export default App;
