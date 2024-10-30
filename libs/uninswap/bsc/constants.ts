// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { Token, ChainId } from '@uniswap/sdk-core'
import ethAbi from "../../../abis/general/bsc/ETH.json";
import wbnbAbi from "../../../abis/general/bsc/WBNB.json";
import btcbAbi from "../../../abis/general/bsc/BTCB.json";
import usdtAbi from "../../../abis/general/bsc/USDT.json";
// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7'
export const ROUTER_CONTRACT_ADDRESS =
  '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2'

class TokenWithABI extends Token {
  public readonly abi: any;

  constructor(chainId: number, address: `0x${string}`, decimals: number, symbol: string, abi: any, name?: string, projectLink?: string) {
    super(chainId, address, decimals, symbol, name);
    this.abi = abi; // Agrega el ABI como un nuevo campo
  }
}

// Currencies and Tokens

export const WETH_TOKEN = new TokenWithABI(
  ChainId.BNB,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'WETH',
  ethAbi,
  'Wrapped Ether'
)

export const BTCB_TOKEN = new TokenWithABI(
  ChainId.BNB,
  '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  18,
  'BTCB',
  btcbAbi,
  'Bitcoin'
)

export const WBNB_TOKEN = new TokenWithABI(
  ChainId.BNB,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  18,
  'WBNB',
  wbnbAbi,
  'Wrapped BNB'
)

export const USDT_TOKEN = new TokenWithABI(
  ChainId.BNB,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  usdtAbi,
  'Tether USD'
)

export const getAbiByAddress = (address: string) => {
  switch (address) {
    case WETH_TOKEN.address:
      return ethAbi;
    case BTCB_TOKEN.address:
      return btcbAbi;
    case WBNB_TOKEN.address:
      return wbnbAbi;
    case USDT_TOKEN.address:
      return usdtAbi;
    default:
      return null;
  }
}