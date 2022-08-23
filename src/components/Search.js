import React from 'react';

const apiKey = `7cf489af03d871ebb6996be9433a1c73`;

class Search extends React.Component{
  constructor(){
    super();
    this.state = {
      city:'',
      country:'',
      data:null,
      clicked:false,
      hasError:false,
      missing:false,
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value})
  }

  call = (e) => {
    e.preventDefault();
    if(this.state.city == '' || this.state.country == ''){
      this.setState({missing:true});
      return;
    } else{
      this.setState({missing:false});
    }
    fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if(data.cod==200){
          console.log(data);
          this.setState({data, clicked:true, hasError:false});
        } else{
          this.setState({hasError:true})
          console.log('something went wrong');
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  showData = () => {
    return(
      <div>
        <p>Location: {this.state.data.name}, {this.state.data.sys.country}</p>
        <p>Tempereture: {this.state.data.main.temp}</p>
        <p>Humidity: {this.state.data.main.humidity}</p>
        <p>Condition: {this.state.data.weather[0].description}</p>
      </div>
    )
  }

  render(){
    return(
      <>
      <div id="weatherHeader">
        <h2>Search the weather in your area!</h2>
        <h4>Type in the city and country you want to search for!</h4>
      </div>
      <div id="getInput">
        <form onSubmit={this.call}>
        <p>
          <input name="city" className="formItem" placeholder="City" onChange={this.handleInput}/>
          <input name="country" className="formItem" placeholder="Country" onChange={this.handleInput}/>
          <button className="" type="submit">Submit</button>
        </p>
        </form>
        {
          this.state.missing ? <p className='error'>Fields cannot be blank</p> :
          this.state.clicked ? this.showData() :
          this.state.hasError ? <p className='error'>Something went wrong</p> : null
        }
      </div>
      </>
    )
  }

}

export default Search;
