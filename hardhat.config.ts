import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/<YOUR_INFURA_KEY>"
      }
    }
  }
};

export default config;
