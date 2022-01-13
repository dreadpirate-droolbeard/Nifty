import React, { ReactElement, useContext, useEffect, useState } from "react";
import { eDegenTraitsKeys, eSortOptions, tDegenObject, tDegenTraitObject } from "../../common/types";
import { DappContext } from "../../contexts/MintContext";
import token from "../../resources/logos/NFTL.png";

// import degenData from "../../data/degen-data-abridged.json";
import degenData from "../../data/degen-data.json";

import { Loading } from "./Loading";
import { DegenBackgrounds } from "../../common/constants";
import { TokenInteractionContext } from "../../contexts/TokenInteractionContext";

export interface iDegenData extends tDegenObject{
  accumulatedNFTL: number;
  background: DegenBackgrounds;
}

export function Degens(): ReactElement {
  const { getAccumulatedNFTL, filterSelection, sortSelection } = useContext(DappContext);
  const { min: [minValue], max: [maxValue] } = useContext(TokenInteractionContext);
  const [degens, setDegens ] = useState<Array<JSX.Element | undefined> | JSX.Element | undefined>(undefined);
  // const [nftData, setNFTData] = useState<Map<number, number>>();
  const [nftData, setNFTData] = useState<iDegenData[]>([]);

  useEffect( () => {
    getDegenObjects()
  }, []);

  useEffect( () => {
    getDegenObjects();
  }, [filterSelection]);

  useEffect( () => {
    console.log('nftData changed useEffect:', nftData)
    renderDegens();
  }, [nftData]);

  useEffect( () => {
    sortData(sortSelection);
  }, [sortSelection]);

  function sortData(sort: eSortOptions | undefined): void {
    let sortedData = nftData;
    switch(sort){
      case eSortOptions.ACCUMULATED_H2L: {
        sortedData = [...nftData].sort( (a,b) => (a.accumulatedNFTL < b.accumulatedNFTL) ? 1 : -1);
        break;
      }
      case eSortOptions.TOKENID_L2H: {
        sortedData = [...nftData].sort((a,b) => (a.tokenId > b.tokenId) ? 1 : -1);
        break;
      }
      case eSortOptions.TOKENID_H2L: {
        sortedData = [...nftData].sort((a,b) => (a.tokenId < b.tokenId) ? 1 : -1);
        break;
      }
      default:
        break;
    }
    setNFTData(sortedData);
  }

  function filterSortedData(degen: iDegenData): boolean {
    const minVal = minValue as number;
    const maxVal = maxValue as number;

    console.log('Filter Sorted Data:', minVal, maxVal, sortSelection)
    if( sortSelection !== undefined && minVal !== 0 && minVal !== undefined && maxVal !== 0 && minVal !== 0) {
      switch(sortSelection){
        case eSortOptions.ACCUMULATED_H2L: {
          if( degen.accumulatedNFTL >= minVal && degen.accumulatedNFTL <= maxVal ) return true
          return false;
        }
        case eSortOptions.TOKENID_L2H:
        case eSortOptions.TOKENID_H2L: {
          if( degen.tokenId >= minVal && degen.tokenId <= maxVal ) return true
          return false;
        }
        default:
          return false;
      }
    } else {
      return true
    }
  }


  function renderImage(tokenId: number, background: string): ReactElement {
    
    const imageSource = `https://nifty-league.s3.amazonaws.com/degens/mainnet/images/${tokenId}${background === DegenBackgrounds.LEGENDARY ?  ".mp4" : ".png"}`
    
    if(background === DegenBackgrounds.LEGENDARY){
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
    // let degensList;
    // const nftDataMap = new Map<number, iDegenData>();
    const nftDataArray = Array<iDegenData>();

    if( filterSelection.length === 0 ) {
      console.log('FilterSelection Length === 0')
      setDegens(<div className="lack-of-bubos-message">Select background from list And connect Wallet</div>)
    } else {

      setDegens(<Loading/>);

      await Promise.all( Object.entries(degenData).map(async ([key, degen]) => {
        const background = degen.tokenData.attributes.find(x => x.trait_type === eDegenTraitsKeys.Background)?.value as string;
        const castBackground = background?.toUpperCase() as DegenBackgrounds;

        const degenAttributes: tDegenTraitObject = {  
          [eDegenTraitsKeys.Background]: "",
          [eDegenTraitsKeys.Tribe]: "",
          [eDegenTraitsKeys.Skin_Color]: "",
          [eDegenTraitsKeys.Fur_Color]: "",
          [eDegenTraitsKeys.Eye_Color]: "",
          [eDegenTraitsKeys.Mouth]: "",
          [eDegenTraitsKeys.Beard]: "",
          [eDegenTraitsKeys.Outerwear]: "",
          [eDegenTraitsKeys.Footwear]: "",
          [eDegenTraitsKeys.Hat]: "",
          [eDegenTraitsKeys.Eyewear]: "",
          [eDegenTraitsKeys.Wrist]: "",
          [eDegenTraitsKeys.Neckwear]: "",
          [eDegenTraitsKeys.Left_Item]: "",
          [eDegenTraitsKeys.Right_Item]: "",
          [eDegenTraitsKeys.Extra_Trait_Count]: "",
        }

        // degen.tokenData.attributes.map( (attr: any) => {
        degen.tokenData.attributes.forEach( (attr: any) => {
          // console.log('attr:', attr)
          const noSpaceAttr = attr.trait_type?.replace(" ", "_");
          // const thisAttr: tDegenTraitObject = {[noSpaceAttr]: attr.value};
          // console.log('thisAttr:', thisAttr)
          degenAttributes[noSpaceAttr as eDegenTraitsKeys] = attr.value;
          // return thisAttr;
        })

        // console.log('degenAttributes:', degenAttributes)
        
        if( filterSelection.includes(castBackground)) {
          const accumulatedNFTL = Math.round(await getAccumulatedNFTL(degen.tokenId)*100)/100;
          // const accumulatedNFTL = 0;
          // nftDataMap.set(tokenId, {...degen, accumulatedNFTL});
          nftDataArray.push({
            tokenId: degen.tokenId,
            tokenUri: degen.tokenUri,
            tokenData: {
              name: degen.tokenData.name,
              image: degen.tokenData.image,
              description: degen.tokenData.description,
              external_url: degen.tokenData.external_url,
              attributes: degenAttributes
            },
            accumulatedNFTL,
            background: castBackground
          })
        }
      }))
    }
    
    // console.log('degensList:', degensList)
    // console.log('nftDataMap:', nftData);
    // console.log('nftDataArray:', nftDataArray);
    // setDegens(degensList);
    // setNFTData(nftDataMap);
    setNFTData(nftDataArray);
  }

  function renderDegens(): void {
    console.log("Render Degens")
    const degens = nftData.map( (degen) => {
      if( filterSortedData(degen) ) {      
        return (
          <div className= {`degen-wrapper ${degen.background.toLowerCase()}`} key={degen.tokenId}>
            <div className="degen-name">{degen.tokenData.name}</div>
            {renderImage(degen.tokenId, degen.tokenData.attributes.Background as string)}
            <div className="degen-background" >{degen.background}</div>
            <div className="data-container">
              <div className="degen-token-id">TokenId: {degen.tokenId}</div>
              <div className="degen-nftl-wrapper">
                <div className="degen-nftl-accumulated">
                  NFTL: {degen.accumulatedNFTL}
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
    });

    setDegens(degens);
  }
  
  return(
      <div className="degens-container">
        { degens }
      </div>
  )
}

