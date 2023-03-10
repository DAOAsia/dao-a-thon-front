{/************************************ここからインポート************************************/} 
import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import contract from '../contracts/Daoathon.json';
import {
  Box,
  Flex,
  Button,
  Stack,
  Link,
  useColorModeValue,
  useDisclosure,
  Spinner,
  HStack,
} from '@chakra-ui/react';

import { Footer } from '../components/Footer'
import { ImgNFT } from '../components/ImageOfNFT'
import { Describe } from '../components/Description'
import { TopMessage } from '../components/TopMessage'

{/************************************ここからグローバルな定数************************************/}  
const abi = contract.abi;
const contractAddress = "0x1e0cdB7f43BCEB131A2fd7f0818a7ec55b25bd60";
const MaticTestnetMumbaiNetworkChainId = "0x13881";

{/***********************************************************************************************/}
{/***********************************************************************************************/}
{/************************************　　　　　　　　　　　　*************************************/}
{/************************************　　　メイン関数　　　　*************************************/}
{/************************************　　　　　　　　　　　　*************************************/}
{/***********************************************************************************************/}
{/***********************************************************************************************/}

const Index = () => {

  {/************************************ここからローカルな定数************************************/}
  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);
  const [mineStatus, setMineStatus] = useState(null);
  const [totalMintCount, setTotalMintCount] = useState("");
  const [iaLoading, setIsLoading] = useState(false);

  {/************************************ここから処理系のメソッド************************************/}  

  const connectWallet = async () => { 
    const { ethereum } = window as any;
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
    const { ethereum } = window as any;
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
        alert("Failed to mint...");
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

  const renderTopNavi = () => (
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
        
        <Stack>
          <HStack p={1}>
            <Box display={{ base: "block", md: "none", }}>
            </Box>
          </HStack>
        </Stack>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          
          <Box>
            <Link
              className={"top-title"}
              p={2}
              href={'/'}
              color={'white'}
              _hover={{
                textDecoration: 'none',
                color: 'gray',
              }}>
                DAO-A-THON NFT
            </Link>
          </Box>

          <div className={"desktop-navi"}>
            <Flex display={'flex'} ml={10}>
            </Flex>
          </div>

        </Flex>
        {!currentAccount && 
        <Box display='flex' justifyContent='flex-end' >
          {renderButtun("Connect Wallet",true,"")}
        </Box>}
        {currentAccount && 
        <Box display='flex' justifyContent='flex-end' color={"white"}>
          <p className="responsive-address">address:{mask(currentAccount)}</p>
        </Box>}
      </Flex>
    </Box>
  );

  const renderContents = () => (
    <div>
      <ImgNFT />
      <TopMessage />
      <Describe />
      <Box display='flex' justifyContent='center' alignItems='center' py={'3'}>
        {renderButtun("faucet Site",false,"https://faucet.polygon.technology/")}
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center' py={'3'}>
        {!currentAccount && renderButtun("Connect Wallet",true,"")}
        {currentAccount && !totalMintCount && !iaLoading &&
          <div>
            {renderMintButtun()}
          </div>}
        {currentAccount && totalMintCount && !iaLoading &&
        <div>
          {renderButtun("NFT at OpenSea",false,`https://testnets.opensea.io/ja/assets/goerli/${contractAddress}/${totalMintCount}`)}
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
  );

  {/*******************************************ここからメインのレイアウト******************************************/}

  return(
    <div className="App">
      <header>
        <div className="container-head">
          {/************************************ここからトップナビゲーションバー************************************/}
          {renderTopNavi()}
        </div>
      </header>
      <div className="top-wrapper">
        <div className="container ">
          {/******************************************ここからコンテンツ*******************************************/}
          {renderContents()}
        </div>
      </div>
      {/**********************************************ここからフッター**********************************************/}
      <Footer />
    
    </div>
  )
}

export default Index