/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from "react";
import Web3 from "web3";
import { DappContext } from "./MintContext";
import { 
  tokenBalanceABI, 
  tokenIdABI,
  tokenUriABI,
  tAccountBalances,
  tokenAddressesMap,
  tokenNames,
  tTokenURI
} from "./types";

const TokenDataInitialState: TokenDataState = {
  address: undefined,
  balance: undefined,
  tokenBalances: [],
  // tokenURIs: new Map(),
  tokenURIs: [], // Bubo URIs only
}

interface TokenDataState extends tAccountBalances {
  // tokenURIs: Map<number, string>;
  tokenURIs: tTokenURI[]
}

interface TokenDataProps {
  getTokenData: boolean;
}

export const TokenDataContext = React.createContext<TokenDataState>(TokenDataInitialState);

export class TokenDataContextProvider extends Component<TokenDataProps, TokenDataState> {
  static contextType = DappContext;
  private web3: Web3 = new Web3();
  private _pollDataInterval2: NodeJS.Timer | undefined;

  componentDidMount(): void {
    // TODO: Tie this into overall Web3 stuff? 
    // Or keep separate since this still needed after mint, but rest wont be?
    this.initializeWeb3();
  }

  componentDidUpdate(prevProps: TokenDataProps): void {
    const { getTokenData: newGet } = this.props;
    const { getTokenData: oldGet } = prevProps;

    if( newGet && newGet !== oldGet ){
      this.initializeWeb3();
    } else if ( !newGet && newGet !== oldGet ) {
      this._stopPollingData();
      this.setState({ ...TokenDataInitialState })
    } else {
      // do nothing and maintain last state
    }
  }

  componentWillUnmount(): void {
    this._stopPollingData();
  }

  initializeWeb3(): void {
    const { getTokenData } = this.props;
    if (getTokenData) {
      this.web3 = new Web3(window.ethereum);
      // this.getTokenBalances();
      this._startPollingData();
    }
  }

  render(): React.ReactElement {
    return (
      <TokenDataContext.Provider value = { {...this.state} } >
        {this.props.children}
      </TokenDataContext.Provider>
    )
  }

  getTokenBalances = async (): Promise<void> => {
    const accs = await this.web3.eth.getAccounts();
    const address = accs[0];
    const balance = parseFloat(this.web3.utils.fromWei(await this.web3.eth.getBalance(address), 'ether'));

    const tokenBalances = await Promise.all([...tokenAddressesMap.entries()].map(async ([tokenName, tokenAddress]) => {
    
      const tokenBalanceContractInstance = new this.web3.eth.Contract(tokenBalanceABI, tokenAddress);

      let tempBalance = '0';
      try{
        tempBalance = await tokenBalanceContractInstance.methods.balanceOf(address).call();
      } catch(err: any) {
        console.error('Error retrieving token balance for: ', tokenName, '\n', err)
      }

      return {
        token: tokenName,
        balance: parseFloat(tempBalance)
      }
    }))

    console.log('Token Balances:', tokenBalances)

    this.setState({
      address,
      balance,
      tokenBalances
    }
      , () => {
        // this.getTokenData(tokenNames.DEGEN);
      }
    );
  }

  getTokenData = async (tokenName: tokenNames): Promise<void> => {
    const { address, tokenBalances: tokens } = this.state;
    const tokenAddress = tokenAddressesMap.get(tokenName);

    const balance = tokens.find(o => o.token === tokenName)?.balance ?? 0;

    const tokenIdContractInstance = new this.web3.eth.Contract(tokenIdABI, tokenAddress);
    const tokenUriContractInstance = new this.web3.eth.Contract(tokenUriABI, tokenAddress);

    const tokenURIs = Array<tTokenURI>();
    // const tokenURIs = new Map<number, string>();

    for(let i = 0 ; i < balance ; i++) {
      // const i = 0;
      try{
        const tokenId = parseInt(await tokenIdContractInstance.methods.tokenOfOwnerByIndex(address, i).call());
        const tokenUri = await tokenUriContractInstance.methods.tokenURI(tokenId).call();
        // tokenURIs.push({tokenId, tokenUri});
        // tokenURIs.set(tokenId, tokenUri);
      } catch(err) {
        console.error('Error retrieving token data for: ', tokenName, '\n', err);
      }
    }

    this.setState({ tokenURIs });
  }

  _startPollingData = (): void => {
    // this._pollDataInterval2 = setInterval(() => this.getTokenBalances(), 30000);

    // run once immediately so we don't have to wait for it
    this.getTokenBalances();
  }

  _stopPollingData = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clearInterval(this._pollDataInterval2!);
    this._pollDataInterval2 = undefined;
  }

}