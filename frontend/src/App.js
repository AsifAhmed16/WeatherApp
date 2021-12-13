import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: [],
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
      this.handleChange({ output: (res.data.msg) });
      console.log(this.state.output);
    } catch(error) {
      console.log(error.response);
      this.handleChange({ output: (error.response.data.msg) });
      console.log(this.state.output);
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
            <label> - - - - - SIMPLE WEATHER APPLICATION - - - - - </label>
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
            <p>{ this.state.output }</p>
          </form>
          <table hover size="sm" style={{visibility: this.state.output.length===0 ? 'hidden' : 'visible' , border: '3px solid black'}}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>2nd Name</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.output.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.product_category}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
