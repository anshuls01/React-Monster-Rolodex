import React, { Component } from 'react';
import './App.css';
import { CardList } from './Components/card-list/card-list.component';
import { SearchBox } from './Components/search-box/search-box.component.jsx';
class App extends Component {

  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }

    //Convert handleChange function to arror function and binding not needed [ES6 Syntex]
    //this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  //handleChange function this.SetState will give error of this undefined
  //to prevent this, either bind function with this on constructor 
  //    this.handleChange = this.handleChange.bind(this);
  //or convert function to arrow function
  //  handleChange(e)  to handleChange =(e) =>
  handleChange = (e) =>{
    //due to async nature of setState, values not update immediatly, callback 
    //function gets called after async call finish
    //in other words dependent functionality on async call should be in callback
    //this.setState({searchField:e.target.value},()=>console.log(this.state))
    //or
    this.setState({ searchField: e.target.value })
  }
  render() {
    // const monsters  = this.state.monsters;
    // const searchField = this.state.searchField;
    //This is exactly same implementation as in above two line, excpet it's a shorter way to write
    const { monsters, searchField } = this.state;

    const filteredMonster = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="App">
      <h3>In a feature branch</h3>
        <SearchBox placeholder='search monsters' handleChange={this.handleChange}>
        </SearchBox>
        <CardList monsters={filteredMonster} />
        {/* <CardList monsters={this.state.monsters}>
       </CardList>*/}

      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
