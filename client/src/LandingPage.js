import React from 'react';
import './App.css';
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/redirect">Redirect Link</Link>
    </div>
  );
}

export default App;
