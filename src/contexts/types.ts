import { AbiItem } from "web3-utils";
import { ADDRESS_DEGEN, ADDRESS_NFTL } from "../common/configs";

export enum eBuboTraits {
  VITALS = "Vitals",
  SCORE = "Score"
}

export type tBuboTraitObejct = {
  trait_type: eBuboTraits;
  value: string | number;
}

export type tBuboObject = {
  attributes: tBuboTraitObejct[];
  description: string;
  image: string;
  name: string;
}

export type tTokenURI = {
  tokenId: number;
  tokenUri: string;
  tokenData: any;
}

export enum tokenNames {
  NFTL = "NFTL",
  DEGEN = "DEGEN",
}

export const tokenAddressesMap: Map<tokenNames, string> = new Map([
  [ tokenNames.NFTL, ADDRESS_NFTL],
  [ tokenNames.DEGEN, ADDRESS_DEGEN],
]);

export type tTokenBalances = {
  token: tokenNames,
  balance: number
}

export interface tAccountBalances {
  address: string | undefined,
  balance: number | undefined,
  tokenBalances: tTokenBalances[]
}

export const tokenBalanceABI: AbiItem[] = [{
  "constant": true,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "name": "balance",
      "type": "uint256"
    }
  ],
  "payable": false,
  "type": "function"
}]

export const tokenIdABI: AbiItem[] = [{
  "constant":true,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    },
    {
      "name":"index",
      "type":"uint256"
    }],
  "name":"tokenOfOwnerByIndex",
  "outputs":[{
    "name":"",
    "type":"uint256"
  }],
  "payable":false,
  "type":"function"
}]

export const tokenUriABI: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]