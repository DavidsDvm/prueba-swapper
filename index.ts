import OpenAI from "openai";
import axios from "axios";
import { quote as quoteUnin } from "./libs/uninswap/quote";
import { getExchangeRate as getExchangeRateUnin, executeSwap } from "./libs/uninswap/quote-test";
import { getExchangeRate, executeSwap as executeSwapPan } from "./libs/pancakeswap/quote";
import { swapList as swapListPan } from "./libs/pancakeswap/swaps";
import { swapList as swapListUnin } from "./libs/uninswap/swaps"
import { ethers } from "ethers";

const openai = new OpenAI({
  apiKey: process.env.OPEN_IA_SECRET_KEY,
});

const onQuote = async () => {
  const finalData: any = {};
  const actualPrice: number = 1500;
  const mnemonic = "visual spread noise slice ability employ toward tilt twelve once clap foster";

  // first pancake
  for (const [key, entrie] of Object.entries(swapListPan)) {
    const exchangeRate = await getExchangeRate(entrie);
    if (exchangeRate) {
      finalData[`${key}_pancake`] = exchangeRate;
    }
  }

  // then uniswap
  for (const [key, entrie] of Object.entries(swapListUnin)) {
    const exchangeRate = await getExchangeRateUnin(entrie);
    if (exchangeRate) {
      finalData[`${key}_uniswap`] = exchangeRate;
    }
  }

  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     {
  //       role: "system",
  //       content: `Determine the optimal sequence of cryptocurrency exchanges to maximize gains, given specific exchange data and constraints.

  //       You are provided with exchange pairs and their respective prices in the format: 'token1/token2-platformfee_platform': price. Your goal is to find the best potential gain from these pairs given a starting amount of 1500 USDC. Consider that prices fluctuate frequently, impacting the results of multiple swaps.

  //       Key Details:
  //       - Platforms: Only Uniswap and Pancakeswap are available.
  //       - Starting amount: ${actualPrice} USDT.
  //       - Data format: 'token1/token2-platformfee_platform': price.
  //         - 'token1/token2' specifies the tokens.
  //         - 'platformfee' is the transaction fee on the platform.
  //         - 'price' is the amount of token2 you can receive per 1 token1.
  //       - Swap direction can be reversed within the same platform, preserving the price and fee.
  //       - The number of swaps should be optimized, considering potential price volatility with more swaps, which might lead to losses.

  //       # Steps

  //       1. Analyze all available pairs and their respective prices.
  //       2. Calculate potential outcomes for each swap considering platform fees.
  //       3. Consider reverse swaps and their potential benefits.
  //       4. Determine the sequence of swaps that results in the highest percent gain.
  //       5. Be cautious with multiple swaps due to possible price fluctuations.
  //       6. Calculate and validate final USDC after completing the swaps.

  //       # Output Format

  //       The output must be a JavaScript object JSON as follows:
  //       - An array of strings representing the steps of the swap process: [step1, step2, ..., stepN]
  //       - A numeric value representing the percent gain.
  //       - A numeric value representing the final amount in USDC.

  //       Example output: \`{
  //           steps: ["SOL-0.3_uniswap", "BNB-0.01_uniswap", "BNB-1_uniswap"],
  //           gain_percent: 0.25,
  //           final_money: 1640
  //       }\`

  //       # Examples

  //       - Given pairs and prices, evaluate each option.
  //       - Calculate the swap sequence and respective gains or losses.
  //       - Output the solution as described once the optimal path is found.

  //       # Notes

  //       - Assume constant fluctuation in prices; lean towards fewer swaps to mitigate risk.
  //       - Ensure that the solution maximizes returns based on current data.
  //       - Adhere strictly to the use of the provided data format when describing paths and exchanges.
  //       - The final step should be the conversion to USDT`
  //     },
  //     {
  //       role: "user",
  //       content: `${JSON.stringify(finalData, null, 0)}`
  //     },

  //   ],
  //   temperature: 1,
  //   max_tokens: 600,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   response_format: {
  //     "type": "json_object"
  //   }
  // });

  // log the final data in one string line
 
  console.log(JSON.stringify(finalData, null, 0));
  // console.log(completion.choices[0].message);


  // const asw = await executeSwapPan({
  //   tokenIn: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  //   tokenOut: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  //   fee: '500',
  //   amountIn: ethers.utils.parseUnits('0.0000001', 18),
  //   mnemonic,
  // });

  // const test = await executeSwap({
  //   tokenIn: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 
  //   tokenOut: '0x55d398326f99059ff775485246999027b3197955',
  //   fee: '500',
  //   amountIn: ethers.utils.parseUnits('0.000145707337274223', 18),
  //   mnemonic,
  // })

  // binance get price api
  const binancePrices = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
  console.log(binancePrices.data);
}

onQuote()
