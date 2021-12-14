import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: null,
      location: null
    };

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async call_api(location) {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ location });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/weather/`, body, config);
      this.handleChange({ output: (res.data.response_obj) });
    } catch(error) {
      console.log(error.response);
    };
  }

  submit(e) {
    e.preventDefault();

    const location = this.state.location;
    this.call_api(location);
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form>
            <label> - - - - - WEATHER APPLICATION - - - - - </label>
            <br/>
            <br/>
            <label>SEARCH LOCATION
            <br/> 
            <input 
              type="text" 
              name="location"
              id="location"
              className="form-control"
              value={this.state.location}
              onChange={(e) => this.handleChange({ location: e.target.value })}
              required
            />
            </label>
              <br/>
              <br/>
            <button className="btn btn-primary" type='button' onClick={(e) => this.submit(e)}>
              Submit
            </button>
            <br/>
            <br/>
          </form>
          <table hover size="sm" style={{visibility: this.state.output===null ? 'hidden' : 'visible', border: '3px solid black'}}>
            <thead>
              <tr>
                <th>Location|</th>
                <th>Temperature|</th>
                <th>Feels-Like|</th>
                <th>Max-Temperature|</th>
                <th>Min-Temperature|</th>
                <th>Pressure|</th>
                <th>Humidity</th>
              </tr>
            </thead>
            <tbody>
              { this.state.output ? (
                <tr key={this.state.output.guid}>
                <td>{this.state.output.temp}</td>
                <td>{this.state.output.feels}</td>
                <td>{this.state.output.max_temp}</td>
                <td>{this.state.output.min_temp}</td>
                <td>{this.state.output.pressure}</td>
                <td>{this.state.output.humidity}</td>
              </tr>
              ) : (<tr></tr>)
              }
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
