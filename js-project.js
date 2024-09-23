/*
Assessment Requirements
1. Create a variable that can hold a number of NFT's. What type of variable might this be?
2. Create an object inside your mintNFT function that will hold the metadata for your NFTs. 
   The metadata values will be passed to the function as parameters. When the NFT is ready, 
   you will store it in the variable you created in step 1
3. Your listNFTs() function will print all of your NFTs metadata to the console (i.e. console.log("Name: " + someNFT.name))
4. For good measure, getTotalSupply() should return the number of NFT's you have created
*/

// create a variable to hold your NFT's
let currrentUserNFT = [];

// this function will take in some values as parameters, create an
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.
function mintNFT(network, minted) {
    const availableNetwork = ["solana", "etherium", "bitcoin", "polygon"];

    const listedNetwork = {
        "solana": "Solana",
        "etherium": "Etherium",
        "bitcoin": "Bitcoin",
        "polygon": "Polygon"
    };

    const listedToken = {
        "solana": "SOL",
        "etherium": "ETH",
        "bitcoin": "BTC",
        "polygon": "POL"
    };

    network = network.toString().toLowerCase();

    if (availableNetwork.includes(network)) {
        const existingNFT = currrentUserNFT.find(existingNetwork => existingNetwork.network === listedNetwork[network]);

        if (existingNFT) {
            existingNFT.minted += parseInt(minted);
            console.log(`Added ${minted} ${existingNFT.token} to existing ${existingNFT.network} wallet.`);
            console.log(`Current ${existingNFT.network} minted: ${existingNFT.minted} ${existingNFT.token}.\n`);
        } else {
            const userNFT = {
                "token": listedToken[network],
                "network": listedNetwork[network],
                "minted": parseInt(minted)
            };

            currrentUserNFT.push(userNFT);

            console.log(`You have successfully minted ${userNFT.network} with a value of ${userNFT.minted} ${userNFT.token}.\n`);
        }
    } else {
        console.log(`Token ${network} not listed in available tokens!\n`);
    }
}


// create a "loop" that will go through an "array" of NFT's
// and print their metadata with console.log()
function listNFTs() {
    if (!currrentUserNFT || currrentUserNFT.length === 0) {
        console.log("No NFTs available");
        return;
    }

    // Using the max and map function to get the max length of string per object properties
    const maxTokenLength = Math.max('Token'.length, ...currrentUserNFT.map(nft => (nft.token).toString().length));
    const maxNetworkLength = Math.max('Network'.length, ...currrentUserNFT.map(nft => (nft.network).toString().length));
    const maxMintedLength = Math.max('Value'.length, ...currrentUserNFT.map(nft => (nft.minted).toString().length));

    // Helper function to add spacing based on the longest length
    const padText = (text, maxLength) => {
        const content = text.toString(); // Ensure the value is a string
        return content + ' '.repeat(Math.max(0, maxLength - content.length));
    };

    const header = `| ${padText('Token', maxTokenLength)} | ${padText('Network', maxNetworkLength)} | ${padText('Value', maxMintedLength)} |`;
    const lineSeparator = '-'.repeat(header.length);

    console.log(lineSeparator);
    console.log(header);
    console.log(lineSeparator);

    for (const nft of currrentUserNFT) {
        const nftToken = padText(nft.token, maxTokenLength);
        const nftNetwork = padText(nft.network, maxNetworkLength);
        const nftMinted = padText(nft.minted, maxMintedLength);

        console.log(`| ${nftToken} | ${nftNetwork} | ${nftMinted} |`);
    }

    console.log(lineSeparator);
}

// print the total number of NFTs we have minted to the console
function getTotalSupply() {
    console.log(`You have ${parseInt(currrentUserNFT.length)} NFTs created`);
}

// call your functions below this line
mintNFT("SOLANA", 12)
mintNFT("EthErIuM", 3)
mintNFT("Polygon", 6)
mintNFT("bitc0in", 4)
mintNFT("SOLANA", 2)

listNFTs()

getTotalSupply()
