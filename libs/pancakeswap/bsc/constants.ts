import { Token, ChainId } from '@pancakeswap/sdk';
import ethAbi from "../../../abis/general/bsc/ETH.json";
import wbnbAbi from "../../../abis/general/bsc/WBNB.json";
import btcbAbi from "../../../abis/general/bsc/BTCB.json";
import usdtAbi from "../../../abis/general/bsc/USDT.json";

export const QUOTER_CONTRACT_ADDRESS = '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997'
export const POOL_FACTORY_CONTRACT_ADDRESS = '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865'
export const ROUTER_CONTRACT_ADDRESS = '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4'
export const CONTRACT_ADDRESS_USDT_WBNB = '0x36696169C63e42cd08ce11f5deeBbCeBae652050'


class TokenWithABI extends Token {
  public readonly abi: any;

  constructor(chainId: number, address: `0x${string}`, decimals: number, symbol: string, abi: any, name?: string, projectLink?: string) {
    super(chainId, address, decimals, symbol, name);
    this.abi = abi; // Agrega el ABI como un nuevo campo
  }
}

export const WETH_TOKEN = new TokenWithABI(
  ChainId.BSC,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'WETH',
  ethAbi,
  'Wrapped Ether'
)

export const BTCB_TOKEN = new TokenWithABI(
  ChainId.BSC,
  '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  18,
  'BTCB',
  btcbAbi,
  'Bitcoin'
)

export const WBNB_TOKEN = new TokenWithABI(
  ChainId.BSC,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  18,
  'WBNB',
  wbnbAbi,
  'Wrapped BNB'
)

export const USDT_TOKEN = new TokenWithABI(
  ChainId.BSC,
  '0x55d398326f99059ff775485246999027b3197955',
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