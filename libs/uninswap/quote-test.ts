import { BigNumber, ethers } from "ethers";
import abiPancake from "./abi-test.json";
import { getProvider } from "./providers";
import { POOL_FACTORY_CONTRACT_ADDRESS, ROUTER_CONTRACT_ADDRESS, getAbiByAddress } from './bsc/constants'
import factoryAbi from "../../abis/uninswap/swapfactory.json";
import smartRouterAbi from "../../abis/uninswap/router.json";


export async function getExchangeRate(contractAddress: string) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      abiPancake.abi,
      getProvider()
    );

    // Call the slot0 function to get the sqrtPriceX96
    const result = await contract.slot0();

    // The first value in the result is sqrtPriceX96
    const sqrtPriceX96 = result[0];

    // Calculate the price using Uniswap's methodology
    const price = (sqrtPriceX96 / 2 ** 96) ** 2;

    // Convert the price per WBNB token to a more readable format
    const exchangeRate = 1 / price;

    return exchangeRate;
  } catch (error) {
    console.error("Error getting the exchange rate:", error);
  }
}

export async function executeSwap({
  mnemonic,
  tokenIn,
  tokenOut,
  fee,
  amountIn,
  suposePoolAddress,
}: {
  mnemonic: string;
  tokenIn: string;
  tokenOut: string;
  fee: string;
  amountIn: BigNumber;
  suposePoolAddress?: string;
}) {
  try {
    const factoryContract = new ethers.Contract(
      POOL_FACTORY_CONTRACT_ADDRESS,
      factoryAbi,
      getProvider()
    );

    const routerContract = new ethers.Contract(
      ROUTER_CONTRACT_ADDRESS,
      smartRouterAbi,
      getProvider()
    );

    // signer
    const wallet = ethers.Wallet.fromMnemonic(mnemonic).connect(getProvider());
    console.log('tokenIn', tokenIn)
    const tokeinInAbi = getAbiByAddress(tokenOut);
    const tokenOutAbi = getAbiByAddress(tokenOut);

    if (!tokeinInAbi || !tokenOutAbi) {
      throw new Error("Token abi not found");
    }

    const tokeinInContract = new ethers.Contract(
      tokenIn,
      tokeinInAbi,
      wallet
    );

    const tokeOutContract = new ethers.Contract(
      tokenOut,
      tokenOutAbi,
      wallet
    );

    const poolAddress = await factoryContract.getPool(tokenIn, tokenOut, fee);
    console.log('poolAddress', poolAddress)

    await tokeinInContract.allowance(wallet.address, ROUTER_CONTRACT_ADDRESS);
    await tokeOutContract.allowance(wallet.address, ROUTER_CONTRACT_ADDRESS);

    // Call the swap function to execute the swap
    await tokeinInContract.approve(ROUTER_CONTRACT_ADDRESS, amountIn.toString());
    await tokeOutContract.approve(ROUTER_CONTRACT_ADDRESS, amountIn.toString());

    const params = {
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      fee: fee,
      recipient: wallet.address,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      amountIn,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
    };

    let ethBalance
    let btcbBalance
    ethBalance = await tokeinInContract.balanceOf(wallet.address);
    btcbBalance = await tokeOutContract.balanceOf(wallet.address);
    console.log('================= BEFORE SWAP')
    console.log('Balance-token1:', ethers.utils.formatUnits(ethBalance.toString(), 18))
    console.log('Balance-token2:', ethers.utils.formatUnits(btcbBalance.toString(), 18))

    const tx = await routerContract.connect(wallet).exactInputSingle(
      params,
      {
        gasLimit: 200000,
      }
    );
    await tx.wait();

    ethBalance = await tokeinInContract.balanceOf(wallet.address)
    btcbBalance = await tokeOutContract.balanceOf(wallet.address)
    console.log('================= AFTER SWAP')
    console.log('Balance-token1:', ethers.utils.formatUnits(ethBalance.toString(), 18))
    console.log('Balance-token2:', ethers.utils.formatUnits(btcbBalance.toString(), 18))

  } catch (error) {
    console.error("Error executing the swap:", error);
  }
} 
