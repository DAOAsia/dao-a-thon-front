// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers';

export type Game = {
  id: string
  title: string
  genre: string
}

// API のレスポンス型
export type GamesApiResponse = {
  game?: Game
  debugMessage?: string
}

// API のエントリポイント
export default function gamesApi (
    req: NextApiRequest,
    res: NextApiResponse<GamesApiResponse>
  ) {
    const { ethereum } = window as any;    // Buttonクリックで実行 -> クライアントサイドの処理なので、windowが参照できethereumが扱える
    // ウォレット接続処理
    if (!ethereum) {
        alert("Please install Metamask!");
    }

    if (ethereum.networkVersion !== 80001) {
      try {
        // Mumbai testnet に切り替えます。
        ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }], // utilsフォルダ内のnetworks.js を確認しましょう。0xは16進数です。
        });
      } catch (error) {
        // このエラーコードは当該チェーンがメタマスクに追加されていない場合です。
        // その場合、ユーザーに追加するよう促します。
        if (error.code === 4902) {
          try {
            ethereum.request({
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
        const network = ethereum.request({ method: 'eth_chainId' });
  
        if (network.toString() === '0x13881') {
          const accounts = ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Found an account! Address: ", accounts[0]);
        //   setMetamaskError(null);
        //   setCurrentAccount(accounts[0]);
        }
  
        else {
          // setMetamaskError(true);
        }
  
      } catch (err) {
        console.log(err)
      }
  }

// 擬似的なデータフェッチ関数
function fetchGameData(id: string): Game | undefined {
  const games: Game[] = [
    { id: '1', title: 'ドンキーコング', genre: 'アクション' },
    { id: '2', title: 'ゼビウス', genre: 'シューティング' },
    { id: '3', title: 'ロードランナー', genre: 'パズル' },
  ]
  return games.find((game) => game.id === id)
}