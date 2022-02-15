/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from "react";

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";
import Web3 from "web3";

import {
  MINT_FAILED_MESSAGE,
  MINT_SUCCESS_MESSAGE,
  NETWORK_NAME,
  ERROR_CODE_TX_REJECTED_BY_USER,
  MINT_BUTTON_SOLD_OUT_MESSAGE,
  Messages,
  RelativeAllowances,
  DegenBackgrounds,
} from "../common/constants";

import NFTLTokenArtifact from "../contracts/NFTLToken.json";
import DegenArtifact from "../contracts/Degen.json";

import {
  NETWORK_ID, 
  ADDRESS_DEGEN,
  ADDRESS_NFTL
} from "../common/configs";

import { tTokenURI } from "./types";
import { download, saveFrontendFiles } from "./Saving";
import { fetchUriData } from "../common/HTTPUtils";
import { eSortOptions, tDegenObject } from "../common/types";


const noOp = (): void => {/*noOp*/};

const dappStateInitial = {
  userAddress: undefined, // The user's address and balance
  userBalance: 0,

  txBeingSent: undefined, // The ID of transactions being sent
  errorMessage: undefined,
  messageStatus: Messages.WalletDisconnected,

  startTime: undefined,
  endTime: undefined,

  maxSupply: 0,
  totalMinted: 0,

  disableMintButton: true,
  warningMessage: undefined,

  playMusic: false,

  connectWallet: noOp,
  disconnectWallet: noOp,
  dismissMessage: noOp,
  setDisplayMintForm: noOp,
  setMintSubmit: noOp,
  setMintQuantity: noOp,
  setDisableMintButton: noOp,
  setWarningMessage: noOp,
  toggleMusic: noOp,


  setApproval: noOp,

  getAccumulatedNFTL: ():Promise<number> => new Promise((resolve)=> resolve(0)),
  unclaimed: ():Promise<number> => new Promise((resolve)=> resolve(0)),
  claimToken: ():Promise<number> => new Promise((resolve)=> resolve(0)),
  allowance: 0,

  setFilterSelection: noOp,
  filterSelection: [],

  setSortSelection: noOp,
  sortSelection: undefined
};

interface iDappState {
  userAddress: string | undefined, // The user's address
  userBalance: number;

  txBeingSent: string | undefined, // The ID of transactions being sent  errorMessage: string | undefined,
  errorMessage: string | undefined,
  messageStatus: Messages | undefined,

  startTime: Date | undefined,
  endTime: Date | undefined,

  maxSupply: number,
  totalMinted: number,

  warningMessage: string | undefined,

  playMusic: boolean,

  connectWallet: () => void,
  disconnectWallet: () => void,
  dismissMessage: () => void,
  setDisplayMintForm: (isOpen: boolean) => void,
  setMintSubmit: (submitted: boolean, claimDiscount: boolean) => void,
  setMintQuantity: (mintQuantity: number) => void,
  setDisableMintButton: (disableMintButton: boolean) => void,
  setWarningMessage: (warningMessage: string | undefined) => void,
  toggleMusic: (playMusic: boolean) => void,

  // changeName: (tokenId: number, newName: string) => void,
  // attack: (attacker: number, victim: number) => void,
  // heal: (target: number) => void,
  getAccumulatedNFTL: (tokenId: number) => Promise<number>,
  setApproval: (amount: number, relative: RelativeAllowances) => void,
  unclaimed: (tokenIds: number[]) => Promise<number>,
  claimToken: (tokenIds: number[]) => Promise<number>,
  allowance: number,

  filterSelection: DegenBackgrounds[],
  setFilterSelection: (selected: DegenBackgrounds[]) => void,

  setSortSelection: (sort: eSortOptions | undefined) => void,
  sortSelection: eSortOptions | undefined
}

export const DappContext = React.createContext<iDappState>(dappStateInitial);
// export const DappContext = createGenericContext<iDappContext>();
// export const [ useDappContext, DappContextProvider ] = createGenericContext<iDappContext>();

export class DappContextProvider extends Component<unknown, iDappState> {

  // we can use the "definite assignment assertion" (the !),
  // b/c the _initializeEthers() method is called in the constructor
  private _contractNFTL!: ethers.Contract; 
  private _contractDEGEN!: ethers.Contract; 
  private _provider!: ethers.providers.Web3Provider;
  private _pollDataInterval: NodeJS.Timer | undefined;
  private web3: Web3 = new Web3();

  constructor(props: unknown) {
    super(props);

    this.state = { ...dappStateInitial };
  }

  render(): React.ReactElement {
    return (
      <DappContext.Provider value = { { 
        ...this.state , 
        connectWallet: this.connectWallet,
        dismissMessage: this.dismissMessage,
        disconnectWallet: this.disconnectWallet,
        setWarningMessage: this.setWarningMessage,
        toggleMusic: this.toggleMusic,

        // changeName: this.changeName,
        // heal: this.heal,
        // attack: this.attack,
        getAccumulatedNFTL: this.getAccumulatedNFTL,
        setApproval: this.setApproval,
        unclaimed: this.unclaimed,
        claimToken: this.claimToken,

        setFilterSelection: this.setFilterSelection,
        setSortSelection: this.setSortSelection
        } } 
      >
        {this.props.children}
      </DappContext.Provider>
    )
  }

  componentDidMount(): void {
    const ethers = window.ethereum;
    const ethereumDefined =  ethers !== undefined;
    
    if(ethereumDefined){
      this.web3 = new Web3(window.ethereum);
      this.setState({ 
        messageStatus: ethereumDefined ? Messages.WalletDisconnected : Messages.WalletMissing, 
      }
        , () => {
          this._checkNetwork();
          this._intializeEthers();
        } 
      );
  
      ethers.on("chainChanged", () => {
        this._stopPollingData();
        // window.location.reload(); // per metamask docs... not sure it's prudent tho?
        this._resetState();
        setTimeout( () => this._checkNetwork(), 500);
      });
    }
  }

  componentWillUnmount(): void {
    this._stopPollingData();
  }

  _resetState(): void {
    this.setState({ ...dappStateInitial });
  }

  _initialize(userAddress: string | undefined): void {
    this.setState({
      userAddress,
    }, async () => {
      if(this._checkNetwork() && userAddress !== undefined){
        // must await on this, otherwise polling will start before intialization is complete, and contract defined
        await this._intializeEthers(); 
        this._startPollingData();
      }
    });
  }

  setWarningMessage = (warningMessage: string | undefined): void => {
    this.setState({ warningMessage });
  }

  toggleMusic = ( playMusic: boolean): void => {
    this.setState({ playMusic });
  }

  async _intializeEthers(): Promise<void> {
    // Initialize ethers by creating a provider using window.ethereum
    this._provider = await new ethers.providers.Web3Provider(window.ethereum);

    // initialize the contract using provider's and the token's artifact
    this._contractNFTL = await new ethers.Contract(
      ADDRESS_NFTL,
      NFTLTokenArtifact,
      this._provider.getSigner(0)
    );

    this._contractDEGEN = await new ethers.Contract(
      ADDRESS_DEGEN,
      DegenArtifact,
      this._provider.getSigner(0)
    )
  }

  // This method checks if Metamask selected network is Localhost:8545 
  _checkNetwork(): boolean {
    const { messageStatus } = this.state;

    if(messageStatus === Messages.WalletMissing) {
      return false;
    }

    // valid network
    if (window.ethereum.networkVersion === NETWORK_ID) {
      return true;
    }

    this.setState({ 
      messageStatus: Messages.NetworkError,
      errorMessage: `Connect Metamask to:\n ${NETWORK_NAME}`
    });

    return false;
  }

  connectWallet = async (): Promise<void> => {
    // It returns a promise that will resolve to the user's address.
    let userAddress = undefined;
    try {
      await window.ethereum.enable();
      [userAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err: any) {
      if( err.code === -32002 ) {
        this.setState({
          errorMessage: "Connection request already pending. Check Metamask.",
          messageStatus: Messages.TransactionError
        })
      }
      return
    }

    if (!this._checkNetwork()) {
      return;
    }

    this.web3 = new Web3(window.ethereum);
    const userBalance = parseFloat(this.web3.utils.fromWei(await this.web3.eth.getBalance(userAddress), 'ether'));
    
    this.setState({ 
      userBalance,
      messageStatus: Messages.WalletConnected,
      // playMusic: true
    });

    this._initialize(userAddress);

    // reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]: [string]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the: 
      // "Connected list of sites allowed access to your addresses"
      // (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(newAddress);
    });
  }

  disconnectWallet = (): void => {
    this._stopPollingData();
    this._resetState();
    // this._contract = undefined;
  }

  dismissMessage = (): void => {
    const { userAddress } = this.state;
    this.setState({ 
      messageStatus: userAddress ? Messages.WalletConnected : undefined,
      errorMessage: undefined
    });
  }

  async saveOffURIs(): Promise<void> {
      // const tokenIdContractInstance = new this.web3.eth.Contract(tokenIdABI, tokenAddress);
      // const tokenUriContractInstance = new this.web3.eth.Contract(tokenUriABI, tokenAddress);
      const tokenURIs = Array<tTokenURI>();
      // const tokenURIs = new Map<number, string>();
      console.log('attempting save off');

      for(let i = 1 ; i <= 9900 ; i++) {
        // const i = 9900;
        try{
          // const tokenId = parseInt(await this._contractDEGEN.methods.tokenOfOwnerByIndex(address, i).call());
          const tokenUri = await this._contractDEGEN.tokenURI(i); 
          const tokenData = await (await fetchUriData<tDegenObject>(tokenUri)).parsedBody;
    
          tokenURIs.push({tokenId: i, tokenUri, tokenData});
          // tokenURIs.set(tokenId, tokenUri);
        } catch(err) {
          console.error('Error retrieving token data for: ', i, '\n', err);
        }
        console.log('Fetching data for tokenId:', i);
      }
      download(JSON.stringify(tokenURIs), 'degen-data1.json', 'application/json');
    }


  async _getTokenData(): Promise<void> {
    const { userAddress } = this.state
    let totalMinted = 0;
    let maxSupply = 0;

    console.log('GetTokenData - Degen:', this._contractDEGEN, "NFTL:", this._contractNFTL)
    if( this._contractDEGEN !== undefined ){
      console.log('DegenContract Defined')
      try {  
        // mintPrice = parseFloat(Web3.utils.fromWei((await this._contractDEGEN.getNFTPrice()).toString()));
        totalMinted = parseFloat( await this._contractDEGEN.totalSupply());
        maxSupply = parseFloat(await this._contractDEGEN.MAX_SUPPLY());
      } catch (err) {
        console.error("Error retrieving contract data. Contract might not be deployed. Error:\n", err)
        // this is error when metamask locked
        // Error: unknown account #0 (operation="getAddress", code=UNSUPPORTED_OPERATION, version=providers/5.5.0)
        this.setState({ 
          errorMessage: "Error connecting to contract",
          messageStatus: Messages.NetworkError
        });
        return;
      }

      console.log('Degen Total Minted:', totalMinted, "MaxSupply:", maxSupply)
      // this.saveOffURIs(); // Already completed, don't need to call again.

      if( userAddress ) {
        // this.getAllowance();
        // this.getPlaguePrices();
        // try {
        //   mintDiscount = 100*parseFloat(Web3.utils.fromWei((await this._contractNFTL.getDiscount(userAddress)).toString()));
        // } catch (err) {
        //   console.warn("Get winners failed with error:\n", err);
        // }
      }
    }

    let warningMessage;

    this.setState({
      warningMessage,
      totalMinted,
      maxSupply,
    });
  }

  _startPollingData = (): void => {
    // this._pollDataInterval = setInterval(() => this._getTokenData(), 30000);

    // run once immediately so we don't have to wait for it
    this._getTokenData();
  }

  _stopPollingData = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clearInterval(this._pollDataInterval!);
    this._pollDataInterval = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getRpcErrorMessage(error: any): void {
    // CURRENTLY UNUSED
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }


  _fromWei = (wei: number): number => {
    return parseFloat(this.web3.utils.fromWei(wei.toString(), 'ether'));
  }

  // ------------------------------------------------------------------
  /* BUBOS Specific Functions */
  // ------------------------------------------------------------------

  setFilterSelection = (selection: DegenBackgrounds[]): void => {
    this.setState({filterSelection: selection});
  }

  setSortSelection = (sort: eSortOptions | undefined): void => {
    this.setState({sortSelection: sort});
  }

  getAccumulatedNFTL = async (tokenId: number): Promise<number> => {
    let accumulated = 0;
    try {
      accumulated = this._fromWei(await this._contractNFTL.accumulated(tokenId));
    } catch (err: any) {
      console.error("Error retrieving accumulated NFTL for tokenId:", tokenId, "\n", err)
    }

    return accumulated;
  }

  setApproval = async (amount: number, relative: RelativeAllowances): Promise<void> => {
    try {
      switch(relative){
        case RelativeAllowances.EQUAL: {
          await this._contractNFTL.approve(ADDRESS_NFTL, this.web3.utils.toWei(amount.toString()));
          break;
        }
        case RelativeAllowances.INCREASE: {
          await this._contractNFTL.increaseAllowance(ADDRESS_NFTL, this.web3.utils.toWei(amount.toString()));
          break;
        }
        case RelativeAllowances.DECREASE: {
          await this._contractNFTL.decreaseAllowance(ADDRESS_NFTL, this.web3.utils.toWei(amount.toString()));
          break;
        }
      }
    } catch( err: any){
      console.error('Failed approving BLOOD Token. Of type:', relative, '\n', err)
    }
  }

  getAllowance  = async (): Promise<void> => {
    const { userAddress } = this.state;
    let allowance = 0;
    try {
      allowance = this._fromWei(await this._contractNFTL.allowance(userAddress, ADDRESS_NFTL))
    } catch( err: any){
      console.error('Failed retrieving allowance of BLOOD Token. \n', err)
    }

    this.setState({allowance});
  }

  unclaimed = async (tokenIds: number[]): Promise<number> => {
    let unclaimed = 0;
    try {
      unclaimed = this._fromWei(await this._contractNFTL.accumulatedMultiCheck(tokenIds));
    } catch( err: any){
      console.error('Failed retrieving unclaimed BLOOD Token amount. \n', err)
    }
    return unclaimed;
  }

  claimToken = async (tokenIds: number[]): Promise<number> => {
    let claimed = 0;

    try {
      claimed = this._fromWei( await this._contractNFTL.claim(tokenIds));
    } catch( err: any){
      console.error('Failed claiming BLOOD Tokens. \n', err)
    }
    return claimed;
  }

  // changeName = async (tokenId: number, newName: string): Promise<void> => {
  //   try{
  //     await this._contract.changeName(tokenId, newName);
  //   } catch (err: any) {
  //     console.error('Failed trying to change name. \n', err)
  //     this._buboErrors(err);
  //   }
  // }

  // attack = async (attacker: number, victim: number): Promise<void> =>{
  //   try{
  //     await this._contract.infect(attacker, victim);
  //   } catch (err: any) {
  //     console.error('Failed trying to attack. \n', err)
  //     this._buboErrors(err);
  //   }
  // }

  
  // heal = async (target: number): Promise<void> =>{
  //   try{
  //     await this._contract.antidote(target);
  //   } catch (err: any) {
  //     console.error('Failed trying to heal. \n', err)
  //     this._buboErrors(err);
  //   }
  // }
}
