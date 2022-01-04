import React, { ReactElement, useContext, useEffect, useState } from "react";
import { eDegenTraits, tDegenObject } from "../../common/types";
import { DappContext } from "../../contexts/MintContext";
import token from "../../resources/logos/NFTL.png";

import degenData from "../../data/degen-data.json";

import { Loading } from "./Loading";

export function Degens(): ReactElement {
  const { getAccumulatedNFTL } = useContext(DappContext);
  const [degens, setDegens ] = useState<Array<JSX.Element | undefined> | JSX.Element | undefined>(undefined);

  useEffect( () => {
    getDegenObjects()
  }, []);

  // useEffect( () => {
  //   renderDegens();
  // }, [tokenURIs]);

  // function renderDegens(): void {
    
  //   if ( tokenURIs === undefined ) {
  //     setDegens(<Loading/>);
  //     return;
  //   } else if ( tokenURIs.length === 0 ) {
  //     setDegens(
  //       <div className="lack-of-degens-message">
  //         You have no Degens in this wallet
  //       </div>
  //     );
  //     return;
  //   } else {
  //     getDegenObjects();
  //   }
  // }

  function renderImage(tokenId: number, background: string): ReactElement {
    
    const imageSource = `https://nifty-league.s3.amazonaws.com/degens/mainnet/images/${tokenId}${background === "Legendary" ?  ".mp4" : ".png"}`
    
    if(background === "Legendary"){
      return( 
        <video
          className="degen-img"
          id="degen-img"
          src={imageSource}
        />
      )
    }

    return (
      <img
        className="degen-img"
        id="degen-img"
        alt="degen-img"
        // src={degen.tokenData.image}
        src={imageSource}
      />
    )

  } 
  
  async function getDegenObjects(): Promise<void> {

    const degensList = await Promise.all( Object.entries(degenData).map(async ([key, degen]) => {
      const tokenId = degen.tokenId;
      const background = degen.tokenData.attributes.find(x => x.trait_type === eDegenTraits.Background)?.value
      const rarity = background === "Rare" || background === "Meta" || background === "Legendary";
      // const rarity = background !== "Common";
      
      if(rarity){
        const accumulatedNFTL = Math.round(await getAccumulatedNFTL(tokenId)*100)/100;

        return (
          <div className= {`degen-wrapper ${background.toLowerCase()}`} key={tokenId}>
            <div className="degen-name">{degen.tokenData.name}</div>
              {renderImage(tokenId, background)}
              <div className="degen-background" >{background}</div>
              <div className="data-container">
                <div className="degen-token-id">TokenId: {tokenId}</div>
                <div className="degen-nftl-wrapper">
                  <div className="degen-nftl-accumulated">
                    NFTL: {accumulatedNFTL}
                  </div>
                  <img
                    className="token-img"
                    id="token-img"
                    alt="token-img"
                    src={token}
                  />
                </div>
              </div>
            </div>
          )
        }
        else {
          return undefined
        }
    }))
    
    // console.log('degensList:', degensList)
    setDegens(degensList);
  }
  
  return(
      <div className="degens-container">
        { degens }
      </div>
  )
}

