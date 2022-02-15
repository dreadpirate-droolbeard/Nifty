import music from "../resources/audio/bubos.flac";
import headerIcon from "../resources/images/BUBO/Bubonic_Bastards.png";

import PAINTSWAP_LOGO from "../resources/logos/paintswap.svg";
export const PAINTSWAP_URL = "https://paintswap.finance/marketplace/collections/0x9b1372e4a65d914d670f061913ad746250533b49";

import NFTKEY_LOGO from "../resources/logos/nftkey_logo.svg";
export const NFTKEY_URL = "https://nftkey.app/collections/bubonicbastards/";

// import MARKETPLACE_LOGO from "../resources/logos/nftkey.svg";
// export const NFT_MARKETPLACE_URL = "https://nftkey.app/ftm";

import CRYPTO_CURRENCY_SYMBOL from "../resources/logos/ftm-logo.svg";

// TODO: lump these into an object/map so I can easily swap between FTM/Localhost/etc.
export const CRYPTO_CURRENCY_NAME = "Ethereum";
export const CRYPTO_CURRENCY_TICKER = "ETH";

export const NETWORK_NAME = "Ethereum Mainnet";

export const TAGLINE = "Tinkerings";
export const SUBTEXT = "Currently Tinkering NFTL";
export const MINT_FORM_TITLE = "Why are you here?";

export const MINT_QUANTITY_MIN = 1;
export const MINT_QUANTITY_MAX = 20;

const MINT_START_NICKNAME = "Mint";
const MINT_END_NICKNAME = "Mint";

export function getMintCountDownMessage(isMintLive: boolean, startTime: Date | undefined, endTime: Date | undefined): string {
  if(startTime !== undefined && !isMintLive && startTime > new Date() ) {
    // mint not live, start later than now
    return `${MINT_START_NICKNAME} starts in`;
  } else if (endTime !== undefined && !isMintLive && endTime < new Date() ) {
    // mint not live, end earlier than now
    return "Minting is over";
  } else {
    return `${MINT_END_NICKNAME} happens in:`; 
  }
}

export { 
  CRYPTO_CURRENCY_SYMBOL,
  music,
  headerIcon,
  PAINTSWAP_LOGO,
  NFTKEY_LOGO
};

/* --------- PERMANENT CONSTANTS  --------- */
export const SMALL_SCREEN_VARIABLE_NAME = '--small-screen';
export const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

export const MINT_IN_PROGRESS = "Mint In Progress";

export const MINT_BUTTON_NOT_LIVE_MESSAGE = "Mint not live";
export const MINT_BUTTON_SOLD_OUT_MESSAGE = "The mint has sold out!";
export const MINT_BUTTON_PROCEED_MESSAGE = "Click to mint";
export const MINT_BUTTON_NO_WALLET_MESSAGE = "Oy! Connect yer wallet to mint...";

export const MINT_FAILED_MESSAGE = "Mint attempt failed";
export const MINT_SUCCESS_MESSAGE = "Mint Completed Successfully";

export const METAMASK_MISSING_MESSAGE = "You gotta install Metamask first ";

export const MINT_QUANTITY_HELPER_MESSAGE = `Enter a number between ${MINT_QUANTITY_MIN}-${MINT_QUANTITY_MAX}`;

export const COUNTDOWN_COMPLETE_MESSAGE = "Times up!";

export enum Messages {
  WalletMissing = "WalletMissing",
  WalletDisconnected = "WalletDisconnected",
  WalletConnected = "WalletConnected",
  NetworkError = "NetworkError",
  TransactionError = "TransactionError",
  TransactionSuccess = "TransactionSuccess",
  TransactionPending = "TransactionPending"
}

export enum RelativeAllowances {
  EQUAL = "Equal To",
  INCREASE = "Increase By",
  DECREASE = "Decrease By",
}


export enum DegenBackgrounds {
  COMMON = "Common",
  RARE = "Rare",
  META = "Meta",
  LEGENDARY = "Legendary"
}