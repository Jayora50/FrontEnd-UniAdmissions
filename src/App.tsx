import React from 'react';
import Deals from './Components/Deals';
import DealProvider from './context/dealContext';

function App() {
  return (
    <DealProvider>
     <Deals/>
    </DealProvider>
  );
}

export default App;
