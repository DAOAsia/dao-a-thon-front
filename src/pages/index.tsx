import React, { useEffect, useState, Fragment } from "react";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import { Footer } from '../components/Footer'
import WithSubnavigation from '../components/WithSubNavigationAndCTA'
import { DesktopNav, MobileNav } from '../components/WithSubNavigationAndCTA'
import { ImgNFT } from '../components/ImageOfNFT'
import { Describe } from '../components/Description'
import { TopMessage } from '../components/TopMessage'
import { BFaucet } from '../components/ButtonFaucet'
import { BWallet } from '../components/ButtonWallet'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { CTA } from '../components/CTA'
import TestForm from "../components/TestForm";

const Index = () => {

  const { isOpen, onToggle } = useDisclosure();

  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);

  {/************************************ここから処理系のメソッド************************************/}  

  const handleClick = async () => {
    const { ethereum } = window as any;    // Buttonクリックで実行 -> クライアントサイドの処理なので、windowが参照できethereumが扱える
    // ウォレット接続処理
    if (!ethereum) {
        alert("Please install Metamask!");
    }
    try {
        const network = await ethereum.request({ method: 'eth_chainId' });
  
        if (network.toString() === '0x13881') {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Found an account! Address: ", accounts[0]);
          setMetamaskError(null);
          setCurrentAccount(accounts[0]);
        }
  
        else {
          setMetamaskError(true);
        }
  
      } catch (err) {
        console.log(err)
      }
  }

  {/************************************ここからレンダリング系のメソッド************************************/}
  const renderButtun = ( bname, isOnClick, ahref ) => {
    if( isOnClick ){
      return  <Button
              display={{ base: 'none', md: 'inline-flex' }}
              width={'150px'}
              onClick={handleClick}
              shadow={"md"}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#F17C1D'}
              _hover={{
                bg: '#F9BC30',
              }}>
              { bname }
            </Button>;
    }else{
      return  <Button
              as={'a'}
              href={ ahref }
              display={{ base: 'none', md: 'inline-flex' }}
              width={'150px'}
              shadow={"md"}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#F17C1D'}
              _hover={{
                bg: '#F9BC30',
              }}>
              { bname }
            </Button>;
    }
  };
  function FormPage() {
    // 子コンポーネント側に引き渡す関数の定義
    function sendData(enteredData) {
      // 子コンポーネント側から関数が呼ばれると実行される処理
      console.log(enteredData);
    }
    return <TestForm sendData={sendData} />;
  }
  function TestPage() {
    // 子コンポーネント側に引き渡す関数の定義
    function setCurrentAccount(enteredData) {
      // 子コンポーネント側から関数が呼ばれると実行される処理
      setCurrentAccount(enteredData);
    }
    return <WithSubnavigation setCurrentAccount={setCurrentAccount} />;
  }

  return(
    <div className="App">
      <header>
        <div className="container-head">
          {/************************************ここからトップナビゲーションバー************************************/}
          <Box>
            <Flex
              bg={useColorModeValue('#f6a429', 'gray.800')}
              color={useColorModeValue('gray.600', 'white')}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottom={1}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.900')}
              align={'center'}>
              <Flex
                flex={{ base: 1, md: 'auto' }}
                ml={{ base: -2 }}
                display={{ base: 'flex', md: 'none' }}>
                <IconButton
                  onClick={onToggle}
                  icon={
                    isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                  }
                  variant={'ghost'}
                  aria-label={'Toggle Navigation'}
                />
                </Flex>
              <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                
                <Box>
                  <Link
                    p={2}
                    href={'/'}
                    fontSize={'3xl'}
                    fontWeight={700}
                    color={'black'}
                    _hover={{
                      textDecoration: 'none',
                      color: 'gray',
                    }}>
                      NFT MINT SITE
                  </Link>
                </Box>
      
                <Center>
                <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                  <DesktopNav />
                </Flex>
                </Center>
              </Flex>
              {/*FormPage()*/}      
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                {renderButtun("ウォレット接続",true,"")}
              </Stack>
            </Flex>
      
            <Collapse in={isOpen} animateOpacity>
              <MobileNav />
            </Collapse>
          </Box>
          {/************************************ここまでトップナビゲーションバー*************************************/}
        </div>
      </header>
      <div className="top-wrapper">
        <div className="container ">
          <ImgNFT />
          <TopMessage />
          <Describe />
          <Box display='flex' justifyContent='center' alignItems='center' py={'3'}>
            {renderButtun("faucetサイト",false,"#")}
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center' py={'3'}>
            {renderButtun("ウォレット接続",true,"")}
          </Box>
        </div>
      </div>
      <Footer />
      {/*<CTA />*/}
    
    </div>
  )
}

export default Index
