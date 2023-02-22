import React, { useEffect, useState, Fragment } from "react";
import { ethers } from 'ethers';

import { Footer } from '../components/Footer'
import { VoteManual } from '../components/VoteManual'

const Index = () => (

  <div className="App">
    <header>
      <div className="container-head">
      </div>
    </header>
    <div className="top-wrapper">
      <div className="container ">
        <VoteManual />
      </div>
    </div>
    <Footer />
    {/*<CTA />*/}
  
  </div>
)

export default Index
