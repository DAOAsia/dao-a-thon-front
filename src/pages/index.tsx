import React, { useEffect, useState, Fragment } from "react";
import { ethers } from 'ethers';
import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Button,
  Box
} from '@chakra-ui/react'

import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import {WithSubnavigation} from '../components/WithSubNavigationAndCTA'
import { ImgNFT } from '../components/ImageOfNFT'
import { Describe } from '../components/Description'

import { Flex, Heading, Icon } from "@chakra-ui/react";
import { SiChakraui } from "react-icons/si";
import { ChatIcon } from "@chakra-ui/icons";

const Index = () => (

  <div className="App">
    <header>
      <div className="container">
        <WithSubnavigation/>
      </div>
    </header>
    <div className="top-wrapper">
      <div className="container ">
        <div className="imgcenter">
          <img src='https://prtimes.jp/i/77068/5/resize/d77068-5-2f9c9f0b1fea8e5f25e4-5.jpg'></img>
        </div>
        {/*<Box display='flex' justifyContent='center' alignItems='center' bg='gray.100' pt = {10} height={'300px'}>
          <ImgNFT />
        </Box>*/}
        <Box display='flex' justifyContent='center' alignItems='center' >
          <Hero />
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' >
          <Describe />
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' py={'3'}>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            width={'150px'}
            shadow={"md"}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            href={'#'}
            _hover={{
              bg: 'blue.300',
            }}>
            faucetサイト
          </Button>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' pb={'7'}>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            width={'150px'}
            shadow={"md"}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'teal.400'}
            href={'#'}
            _hover={{
              bg: 'teal.300',
            }}>
            ウォレット接続
          </Button>
        </Box>
      </div>
    </div>
    <footer>
      <div className="footer-left">
        <img alt="Twitter Logo" src='https://prtimes.jp/i/77068/5/resize/d77068-5-2f9c9f0b1fea8e5f25e4-5.jpg' width={'200px'} />
      </div>
      <div className="footer-rigft">
        <h3>フッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッター</h3>
        <p>フッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッターフッター</p>
      </div>
    </footer>
    {/*<Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
    <CTA />*/}
  
  </div>
)

export default Index
