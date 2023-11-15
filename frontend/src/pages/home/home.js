import React from 'react';
import './home.css';
import NavBar from '../../components/navbar/navbar';
import Jumbotron from '../../components/jumbotron/jumbotron';

function Home() {
  return (
    <div>
      <NavBar />
      <Jumbotron />
    </div>
  );
}

export default Home;