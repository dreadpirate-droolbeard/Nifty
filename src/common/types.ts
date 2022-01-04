
export interface iFormControls {
  tokenId: number,
  showForm: boolean,
  setShowForm: (showForm: boolean) => void;
}

export enum eDegenTraits {
  Background = "Background",
  Tribe = "Tribe",
  Skin_Color = "Skin Color",
  Fur_Color = "Fur Color",
  Eye_Color = "Eye Color",
  Mouth = "Mouth",
  Beard = "Beard",
  Outerwear = "Outerwear",
  Footwear = "Footwear",
  Hat = "Hat",
  Eyewear = "Eyewear",
  Wrist = "Wrist",
  Neckwear = "Neckwear",
  Left_Item = "Left Item",
  Right_Item = "Right Item",
  Extra_Trait_Count = "Extra Trait Count",
}

export type tDegenTraitObejct = {
  trait_type: eDegenTraits;
  value: string | number;
}


export type tDegenObject = {
  tokenId: number;
  tokenUri: string;
  tokenData: {
    name: string;
    image: string;
    description: string;
    externalUrl: string;
    attributes: tDegenTraitObejct[];
  }
}

const DPDB = {
  "name": "Dread Pirate Drool Beard",
  "image": "ipfs://bafybeiauguchrbvtn2y2emj7ns37q6akhrjou5z4mmxwx3uw7fhc7nhy3u/nifty-degens/1847.png",
  "description": "Original collection of your favorite 10k DEGENs 🎮",
  "external_url": "https://nifty-league.com/degens/1847",
  "attributes": [
    {"display_type":"number","trait_type":"Generation","value":1},
    {"trait_type":"Background","value":"Rare"},
    {"trait_type":"Tribe","value":"Doge"},
    {"trait_type":"Skin Color","value":"Latin Charm"},
    {"trait_type":"Fur Color","value":"White"},
    {"trait_type":"Eye Color","value":"White"},
    {"trait_type":"Mouth","value":"Brown Pipe"},
    {"trait_type":"Beard","value":"Black Circle Beard"},
    {"trait_type":"Outerwear","value":"Red Dinner Jacket"},
    {"trait_type":"Footwear","value":"Duck Shoes"},
    {"trait_type":"Hat","value":"Pirate Hat"},
    {"trait_type":"Eyewear","value":"White Skull Eyepatch"},
    {"trait_type":"Wrist","value":"Gold Watch"},
    {"trait_type":"Neckwear","value":"Black Bowtie"},
    {"trait_type":"Left Item","value":"Key"},
    {"trait_type":"Right Item","value":"Sickle"},
    {"trait_type":"Extra Trait Count","value":10,"display_type":"number"}
  ]}