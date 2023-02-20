import React, { useEffect, useState, Fragment } from "react";
import { ethers } from 'ethers';
import contract from '../contracts/Daoathon.json';
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
  Spinner,
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

// Constants
const OPENSEA_LINK = 'https://testnets.opensea.io/0x4833c2fb6f00787c7f5f60a7f1a8ad9e191648c8';
const abi = contract.abi;
const contractAddress = "0xf2D242721111497806a0ea644E738F182BCE407B";
const MaticTestnetMumbaiNetworkChainId = "0x13881";

const Index = () => {

  const { isOpen, onToggle } = useDisclosure();

  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);
  const [mineStatus, setMineStatus] = useState(null);
  const [totalMintCount, setTotalMintCount] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [iaLoading, setIsLoading] = useState(false);

  {/************************************ここから処理系のメソッド************************************/}  

  const handleClick = async () => { // connect wallet
    const { ethereum } = window as any;    // Buttonクリックで実行 -> クライアントサイドの処理なので、windowが参照できethereumが扱える
    // ウォレット接続処理
    if (!ethereum) {
        alert("Please install Metamask!");
    }

    if (ethereum.networkVersion !== MaticTestnetMumbaiNetworkChainId) {
      try {
        // Mumbai testnet に切り替えます。
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }], // utilsフォルダ内のnetworks.js を確認しましょう。0xは16進数です。
        });
      } catch (error) {
        // このエラーコードは当該チェーンがメタマスクに追加されていない場合です。
        // その場合、ユーザーに追加するよう促します。
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13881',
                  chainName: 'Polygon Mumbai Testnet',
                  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                  nativeCurrency: {
                      name: "Mumbai Matic",
                      symbol: "MATIC",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
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

  const mask = function (number) {
    const cha = String(number);
    const topvisible = number.slice(0,4);
    const bottomvisible = number.slice(-4);
    return(
      <p color="white">{topvisible}...{bottomvisible}</p>
    )
  };

  const mintNFT = async () => {
    const { ethereum } = window as any;    // Buttonクリックで実行 -> クライアントサイドの処理なので、windowが参照できethereumが扱える
    const network = await ethereum.request({ method: 'eth_chainId' });

    if (network.toString() === '0x13881') {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setMetamaskError(null);
      setCurrentAccount(accounts[0]);

      setIsLoading(true);

      try {

        setMineStatus('mining');

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const nftContract = new ethers.Contract(contractAddress, abi, signer);

          console.log("Mint start!");

          let nftTxn = await nftContract.mintNft({ gasLimit: 1600000 });

          console.log("Mining... please wait");
          await nftTxn.wait();

          console.log(`Mined, see transaction: ${nftTxn.hash}`);
          setMineStatus('success');

        } else {
          setMineStatus('error');
          console.log("Ethereum object does not exist");
        }

        setIsLoading(false);

      } catch (err) {
        setMineStatus('error');
        console.log(err);
        setIsLoading(false);
        alert("ミント失敗！");
      }
    }
  }

  {/************************************ここからuseEffect系のメソッド************************************/}

  useEffect(() => {
    let daoathonnft;

    const Transfer = (from, to, tokenId) => {
      console.log("useEffect NewTotalMintCount", tokenId);
      const tokenIdCleaned = tokenId;
      setTotalMintCount(tokenIdCleaned);
    };

    /* Transferイベントがコントラクトから発信されたときに、情報をを受け取ります */
    const { ethereum } = window as any;
    if (ethereum) {

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const daoathonnftContract = new ethers.Contract(contractAddress, abi, signer);

      daoathonnftContract.on("Transfer", Transfer);
    }
    /*メモリリークを防ぐために、Transferのイベントを解除します*/
    return () => {
      if (daoathonnft) {
        daoathonnft.off("Transfer", Transfer);
      }
    };
  }, []);

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
              target={'_blank'} 
              rel={'noreferrer'}
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
  const renderMintButtun = () => {
    return  <Button
              display={{ base: 'none', md: 'inline-flex' }}
              width={'150px'}
              onClick={mintNFT}
              shadow={"md"}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#F17C1D'}
              _hover={{
                bg: '#F9BC30',
              }}>
              {mask(currentAccount)}でミント
            </Button>;
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
              position={"fixed"}
              top={"0"}
              left={"0"}
              width={"100%"}
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
                    color={'white'}
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
              {!currentAccount && <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                {renderButtun("ウォレット接続",true,"")}
              </Stack>}
              {currentAccount && <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}
                color={"white"}>
                <p>アドレス{currentAccount}</p>
              </Stack>}
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
            {!currentAccount && renderButtun("ウォレット接続",true,"")}
            {currentAccount && !totalMintCount && !iaLoading &&
              <div>
                {renderMintButtun()}
              </div>}
            {currentAccount && totalMintCount && !iaLoading &&
            <div>
              {renderButtun("OpenSeaでNFTを確認",false,`https://testnets.opensea.io/ja/assets/mumbai/${contractAddress}/${totalMintCount}`)}
              <p>NFTのミントに成功しました！おめでとうございます！</p>
            </div>}
            {currentAccount && !totalMintCount && iaLoading &&
            <div>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#f6a429'
                size='xl'
              />
              <p>しばらくお待ちください。</p>
            </div>
            }
          </Box>
        </div>
      </div>
      <Footer />
      {/*<CTA />*/}
    
    </div>
  )
}

export default Index
