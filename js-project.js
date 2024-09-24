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
const crypto = require('crypto');
let mintedNFTs = [];

// this function will take in some values as parameters, create an
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.
function mintNFT(name, network="etherium", value=0, description=undefined) {
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

    const hashItem = (input) => {
        const hash = crypto.createHash('sha256');
        hash.update(input);
        return hash.digest('hex').toString();
    }

    const getDateNow = () => {
        const date = new Date();
        const formattedDate = date.getFullYear().toString()+
                                date.getHours().toString()+
                                date.getMinutes().toString()+
                                date.getSeconds().toString();
        return formattedDate;
    }

    network = network.toString().toLowerCase();

    if (availableNetwork.includes(network)) {
        const nftMetadata = {
            "unique": hashItem(name.toString()+getDateNow()),
            "name": name,
            "description": description !== undefined ? description : '',
            "network": listedNetwork[network],
            "currency": listedToken[network],
            "value": parseFloat(value)
        };

        mintedNFTs.push(nftMetadata);

        console.log(`You have successfully minted ${nftMetadata.network} with a value of ${nftMetadata.value} ${nftMetadata.token}.\n`);
    } else {
        console.log(`Token ${network} not listed in available tokens!\n`);
    }
}


// create a "loop" that will go through an "array" of NFT's
// and print their metadata with console.log()
function listNFTs() {
    if (!mintedNFTs || mintedNFTs.length === 0) {
        console.log("No NFTs available");
        return;
    }

    const maxIdLen = Math.max(...mintedNFTs.map(nft => (nft.unique).toString().length));

    const lineSeparator = '-'.repeat(maxIdLen);

    console.log(lineSeparator);

    for (const nft of mintedNFTs) {
        const listTemplate = `ID: ${nft.unique}\nName: ${nft.name}\nDescription: ${nft.description}\nNetwork: ${nft.network}\nValue: ${nft.value} ${nft.currency}`;

        console.log(listTemplate);
        console.log(lineSeparator);
    }
}

// print the total number of NFTs we have minted to the console
function getTotalSupply() {
    console.log(`You have ${parseInt(mintedNFTs.length)} NFTs in your collection`);
}

// call your functions below this line
mintNFT("BAYC #10", "etherium", 0.25, "Bored Ape Society Collection")
mintNFT("BAKC #1224")

listNFTs()

getTotalSupply()
