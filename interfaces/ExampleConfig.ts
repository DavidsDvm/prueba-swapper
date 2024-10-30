import { Token } from '@uniswap/sdk-core'
import { Token as TokenPan } from '@pancakeswap/sdk'

export interface ExampleConfig {
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}

export interface ExampleConfigPancake {
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: TokenPan
    amountIn: number
    out: TokenPan
    poolFee: number
  }
}
