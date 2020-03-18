import React from 'react';
import './App.css';
import SelectPost from './components/SelectPost';
import Posts from './components/Posts';

function App() {
  return (
    <div className="App">
      <SelectPost />
      <Posts />
    </div>
  );
};

export default App;
