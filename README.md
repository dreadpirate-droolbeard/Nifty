# Super Nifty Degen Filter

This Project is a pet project (can't wait for Degen pets!)... wish I had more time to tinker on it (hence my job app with Nifty League!). It was built off the bones of my 3rd generation frontend for Web3 minting projects... so ignore the "mint" screen... and a lot of the other severely lacking UX and UI aspects, as well as clunky functionality.

To use this:
 - Checkout this repo
 - run `npm install` or `yarn install` whatever your flavor
 - run `npm run start` or `yarn start`
Once the webpage has launced:
 - Ignore the placeholder "Mint" screen... ignore the "Home" button that fails...
 - Navigate to "Wallet" (Caution - if you select the "common" background, the app is sluggish and might be unresponsive for a bit)
  - If you want accumualted NFTL data - Click the "Connect" button in the top right (this isn't required for contract interaction, but 
  was the easiest way to ensure Ethers/Metamask is installed in the browser from building off the previous projects. This is one of the many things on the "ToDo" list for this project)
  - Click the desired Background/Rarity Filter (note you can do this without connecting wallet... but Accumulated NFTL for each degen won't appear, but you should still get the Id/Name/Image to load)
 - Once the Degens have loaded, you can now apply the other filters, like "Accumulated NFTL High To Low" and the min/max restrictions on these filters). 
 
 If you change the background filter (note: you can multi select, or remove selections with holding control while clicking)
 There is definitely a lot of improvements that could be made on data filtering respecting the Sorting before/after a rarity is selected.

If you click the `Home` link, it will take you to the splash page of the other 3 Web3 frontend projects I have created (and that are the skeleton of this project)