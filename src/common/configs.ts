// note: if trying to urls against other locally hosted urls, drop the "s" of https
// when you get that error that makes no sense.
export const urlBase = new URL("https://www.twistedtech.wtf/");

export const pathDegen = "/degen";

export const urlDegen = new URL(`${pathDegen}/`, urlBase);

import contractAddress from "../contracts/contract-address.json";
export { contractAddress };

export const ADDRESS_NFTL = '0x3c8D2FCE49906e11e71cB16Fa0fFeB2B16C29638';
export const ADDRESS_DEGEN = '0x986aea67C7d6A15036e18678065eb663Fc5BE883';

export const NETWORK_ID = '1'; // Ftm Opera 250 // Localhost 1337
