import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: null,
      location: null,
      picked_date: null,
      status: 'Showing latest records ...'
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

  async call_api_by_date(location, picked_date) {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ location });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/weather/?date=${picked_date}`, body, config);
      this.handleChange({ output: (res.data.response_obj) });
      this.handleChange({ status: ('Showing records from : ' + picked_date) });
    } catch(error) {
      this.handleChange({ output: (error.response.data.response_obj) });
      this.handleChange({ status: (error.response.data.err_msg) });
      console.log(error.response);
    };
  }

  submit(e) {
    e.preventDefault();
    const location = this.state.location;
    this.call_api(location);
  }

  date_submit(e) {
    e.preventDefault();
    const location = this.state.location;
    const picked_date = this.state.picked_date;
    this.call_api_by_date(location, picked_date);
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
          <div style={{visibility: this.state.output===null ? 'hidden' : 'visible'}}>
            <p>{ this.state.status }</p>
            <table hover size="sm" style={{border: '3px solid black'}}>
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
                    <td>{this.state.output.location}</td>
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
            <form>
              <br/>
              <br/>
              <label>Pick a Previous Record . . .  
              <input 
                type="date" 
                name="picked_date"
                id="picked_date"
                className="form-control"
                value={this.state.picked_date}
                onChange={(e) => this.handleChange({ picked_date: e.target.value })}
                required
              />
              </label>
              <br/>
              <br/>
              <button className="btn btn-primary" type='button' onClick={(e) => this.date_submit(e)}>
                Check
              </button>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
