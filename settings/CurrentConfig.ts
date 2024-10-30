import { FeeAmount } from "@uniswap/v3-sdk";
import { FeeAmount as FeeAmountPank } from "@pancakeswap/v3-sdk";
import { ExampleConfig, ExampleConfigPancake } from "../interfaces/ExampleConfig";
import { WETH_TOKEN, USDT_TOKEN } from "../libs/uninswap/bsc/constants";
import { WETH_TOKEN as WETH_TOKEN_PAN, USDT_TOKEN as USDC_TOKEN_PAN } from "../libs/pancakeswap/bsc/constants";

export const CurrentConfigUninsWap: ExampleConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: '',
  },
  tokens: {
    in: USDT_TOKEN,
    amountIn: 1000,
    out: WETH_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}

export const CurrentConfigPancakeSwap: ExampleConfigPancake = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: '',
  },
  tokens: {
    in: USDC_TOKEN_PAN,
    amountIn: 1000,
    out: WETH_TOKEN_PAN,
    poolFee: FeeAmountPank.HIGH,
  },
}
