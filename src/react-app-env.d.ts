/// <reference types="react-scripts" />

// https://stackoverflow.com/questions/56782452/how-to-fix-module-not-found-for-audio-files-using-file-loader-images-css-an
declare module '*.mp3'; 
declare module '*.flac'; 

// https://ethereum.stackexchange.com/questions/94439/trying-to-use-window-ethereum-request-in-typescript-errors-out-with-property-re
// eslint-disable-next-line no-unused-vars
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum: any;
}