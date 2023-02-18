import React, { useEffect, useState, Fragment } from "react";
import { ethers } from 'ethers';

import {
  Link,
} from '@chakra-ui/react';

import { Footer } from '../components/Footer'
import {WithSubnavigation} from '../components/WithSubNavigationAndCTA'
import { ImgNFT } from '../components/ImageOfNFT'
import { Describe } from '../components/Description'
import { TopMessage } from '../components/TopMessage'
import { BFaucet } from '../components/ButtonFaucet'
import { BWallet } from '../components/ButtonWallet'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'

const Index = () => (

  <div className="App">
    <header>
      <div className="container-head">
        <WithSubnavigation/>
      </div>
    </header>
    <div className="top-wrapper">
      <div className="container ">
        <ImgNFT />
        <TopMessage />
        <Describe />
        <BFaucet />
        <BWallet />
      </div>
    </div>
    <Footer />
    {/*<CTA />*/}
  
  </div>
)

export default Index
