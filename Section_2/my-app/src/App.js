import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component{

constructor(props){
   super(props);
   this.state = {
     newItem:"",
     list :[]
   }
   this.state = localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState")) : this.state;
}

saveCache() {
  // Remember state for the next mount
  console.log('appState', JSON.stringify(this.state));
  localStorage.setItem('appState', JSON.stringify(this.state));
}

doSomethingBeforeUnload = () => {
  this.saveCache();
}

// Setup the `beforeunload` event listener
setupBeforeUnloadListener = () => {
  window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return this.doSomethingBeforeUnload();
  });
};

componentDidMount() {
  // Activate the event listener
  this.setupBeforeUnloadListener();
}

addItem(todoValue){
if (todoValue !==""){
  const newItem={
    id:Date.now(),
    value: todoValue,
    isDone : false
  };
  const list = [...this.state.list];
  list.push(newItem)

  this.setState({
    list,
    newItem:""
  });
}
else{
  alert("Hello! I am an alert box!!");

}
this.saveCache();
}

deleteItem(id){
  const list=[...this.state.list];
  const updatedlist = list.filter(item => item.id !==id);
  this.setState({list: updatedlist});
  this.saveCache();
}

updateInput(input){
  this.setState({newItem:input});
}

render(){
  return(
    <div>
      <img src={logo} width="200" height="200" className="logo" alt="logo"/>
      <h1 className="app-title">TO DO App</h1>
      <div className="container">
        Add an Item...
        <br/>
        <input 
          type="text"
          className="input-text"
          placeholder="Write a todo"
          value={this.state.newItem}
          onChange={e => this.updateInput(e.target.value)}
          />
        <button 
        className="add-btn"
        onClick={() => this.addItem(this.state.newItem)}
        disabled={!this.state.newItem.length}
        >Add Todo</button>
        <div className="list">
          <ul>
            {this.state.list.map(item =>{
              return(
              <li key={item.id}>
                <input 
                type="checkbox"
                name="idDone"
                className="checkmark"
                checked={item.isDone}
                onChange={() => this.deleteItem(item.id)}                
                />
                <label className="label">{item.value}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
}
export default App;