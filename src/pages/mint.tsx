import React, { useEffect, useState, Fragment, FC } from "react";
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
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  LinkProps,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import { Footer } from '../components/Footer'
//import WithSubnavigation from '../components/WithSubNavigationAndCTA'
//import WithSubnavigation from "../components/WithSubNavigationAndCTA"
import { DesktopNav, MobileNav, Navigation, DrawerMenu, LayoutWithMenu } from '../components/WithSubNavigationAndCTA'
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

{/************************************ここからグローバルな定数************************************/}  
const OPENSEA_LINK = 'https://testnets.opensea.io/0x4833c2fb6f00787c7f5f60a7f1a8ad9e191648c8';
const abi = contract.abi;
const contractAddress = "0xf2D242721111497806a0ea644E738F182BCE407B";
const MaticTestnetMumbaiNetworkChainId = "0x13881";
let flag = false;

{/***********************************************************************************************/}
{/***********************************************************************************************/}
{/************************************　　　　　　　　　　　　*************************************/}
{/************************************　　　メイン関数　　　　*************************************/}
{/************************************　　　　　　　　　　　　*************************************/}
{/***********************************************************************************************/}
{/***********************************************************************************************/}

const Index = () => {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);
  const [mineStatus, setMineStatus] = useState(null);
  const [totalMintCount, setTotalMintCount] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [iaLoading, setIsLoading] = useState(false);

  const connectWallet = async () => { 
    flag = true;
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
    
              let minterhash = await nftContract.hashMsgSender({ gasLimit: 1600000 });
              setTotalMintCount(minterhash);
              console.log(minterhash);
              console.log("set completed!");
    
            } else {
              setMineStatus('error');
              console.log("Ethereum object does not exist");
            }
    
            setIsLoading(false);
    
          } catch (err) {
            setMineStatus('error');
            console.log(err);
            setIsLoading(false);
            alert("Failed to mint...");
          }
        }
  
        else {
          setMetamaskError(true);
        }
  
      } catch (err) {
        console.log(err)
      }
  }

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

          let minterhash = await nftContract.hashMsgSender({ gasLimit: 1600000 });
          setTotalMintCount(minterhash);
          console.log(minterhash);
          console.log("set completed!");

        } else {
          setMineStatus('error');
          console.log("Ethereum object does not exist");
        }

        setIsLoading(false);

      } catch (err) {
        setMineStatus('error');
        console.log(err);
        setIsLoading(false);
        alert("Failed to mint...");
      }
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

  const renderButtun = ( bname, isOnClick, ahref ) => {
    if( isOnClick ){
      return  <Button
              display={'inline-flex'}
              className="responsive-button"
              onClick={connectWallet}
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
              display={'inline-flex'}
              className="responsive-button"
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
              display={'inline-flex'}
              className="responsive-button"
              onClick={mintNFT}
              shadow={"md"}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'#F17C1D'}
              _hover={{
                bg: '#F9BC30',
              }}>
              Mint on &nbsp; {mask(currentAccount)}
            </Button>;
  };

  useEffect(()=>{
    if( !flag ){
    console.log('useEffectが実行されました')
    connectWallet();
    //mintNFT();
    }
  })

  return (
    <div className="App">
      <div className="top-wrapper">
        <div className="container ">
          <Box display='flex' justifyContent='center' alignItems='center' py={'3'}>
            {!currentAccount && <div>connecting wallet.....</div>}
            {currentAccount && !totalMintCount && !iaLoading &&
              <div>
                <p>You connected wallet!😀</p>
                <p>minting a NFT.....</p>
                <p>Please wait just a little bit more.</p>
              </div>}
            {currentAccount && totalMintCount && !iaLoading &&
            <div>
              {renderButtun("NFT at OpenSea",false,`https://testnets.opensea.io/ja/assets/mumbai/${contractAddress}/${totalMintCount}`)}
              <p>Congrats! Your NFT minted! </p>
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
              <p>Please wait just a little bit more.</p>
            </div>
            }
          </Box>
        </div>
      </div>    
    </div>
  );
}

export default Index