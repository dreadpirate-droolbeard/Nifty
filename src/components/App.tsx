import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { GlobalHeader } from "./pages/GlobalHeader";
import { Team } from "./pages/Team";
import { Background } from "./pages/Mint";
import { DappContext, DappContextProvider } from "../contexts/MintContext";
import { Wallet } from "./pages/Wallet";
import { pathDegen } from "../common/configs";
import { TokenDataContextProvider } from "../contexts/TokenDataContext";

export function App(): React.ReactElement {
  return(
    <Router basename={pathDegen}>
      <DappContextProvider>
        <DappContext.Consumer>
        { ({userAddress}): React.ReactElement => {
          return(
            <TokenDataContextProvider getTokenData={ userAddress !== undefined } >
              <Switch>
                <Route exact path={"/mint"}>
                  <GlobalHeader />
                  <Background />
                </Route>
                <Route exact path={"/wallet"}>
                  <GlobalHeader />
                  <Wallet />
                </Route>
                <Route exact path={"/team"}>
                  <GlobalHeader />
                  <Team />
                </Route>
                <Route exact path={"/"}>
                  <Redirect to={"/mint"}/>
                </Route>
              </Switch>
            </TokenDataContextProvider>
          )
        }}
        </DappContext.Consumer>
      </DappContextProvider>
    </Router>
  )
}