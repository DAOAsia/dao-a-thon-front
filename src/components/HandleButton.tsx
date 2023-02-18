import React, { useState } from "react";
//import { ethers } from 'ethers';
import {
    Button,
} from '@chakra-ui/react';
import { useControllableProp, useControllableState } from '@chakra-ui/react'

export const renderButtunToConnectToWallet = () => {

    const [currentAccount, setCurrentAccount] = useControllableState({});
    const [metamaskError, setMetamaskError] = useControllableState({});

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
      
              //const provider = new ethers.providers.Web3Provider(ethereum);
              //const signer = provider.getSigner();
              //const connectedContract = new ethers.Contract(contractAddress, abi, signer);*/
      
              /* コントラクトからgetTokenIdsメソッドを呼び出す */
              //let _tokenIds = await connectedContract.getTokenIds();
              //setTotalMintCount( _tokenIds.toNumber() );
              //console.log("connectWallet setTotalMintCount!  ", _tokenIds.toNumber() );
      
              //let statement = await connectedContract.getMessage();
              //setResultMessage( statement );
      
            }
      
            else {
              setMetamaskError(true);
            }
      
          } catch (err) {
            console.log(err)
          }
    }

  return  <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            onClick={handleClick}
            shadow={"md"}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#F17C1D'}
            href={'#'}
            _hover={{
              bg: '#F9BC30',
            }}>
            ウォレット接続
          </Button>;
};
