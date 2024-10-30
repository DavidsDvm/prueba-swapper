import { ethers, providers } from 'ethers'
import { CurrentConfigUninsWap as CurrentConfig } from '../../settings/CurrentConfig'

// Provider Functions

export function getProvider(): providers.Provider {
  return new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.mainnet)
}
