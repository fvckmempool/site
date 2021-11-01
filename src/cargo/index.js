import {Cargo} from '@cargo-eth/js';

const projectId = "617cfa7dc30abf0008466463"
const contractId = "0x1df1b7C5fd0329BA2792F28FC6615aCe6079CFaA"
const nomuAddress = "0x4E805C2d330af3164f65951eC354FD0359dd8d2D"

// Create a new instance of the Cargo class
const cargo = new Cargo({ network: 'production' });
function enableCargo() {
    return new Promise(async (resolve, reject) => {
    // Check if user has a web3 provider available
    if (cargo.hasProvider) {
        // Enable Cargo
        const enabled = await cargo.enable();
        
        if(enabled) {
            cargo.api.authenticate().then((response) => {
                if(response && response.status === 200){
                        resolve(response.data)
                    }else if(response && response.status === 401){
                        cargo.api.register().then((registerResponse) => {
                            if(registerResponse && registerResponse.status === 200){
                                resolve(response.data)
                            }else{
                                reject()
                            }
                        })
                    }else{
                        reject()
                    }
            });            
        }else {
           reject()
        }
    }else{
        reject()
    }
    })
}
function connectWallet(){
    return new Promise(async (resolve, reject) => {
        if (cargo.hasProvider) {
            // Enable Cargo
            const enabled = await cargo.enable();
            
            if(enabled) {
                resolve(true)
            }else {
               reject()
            }
        }else{
            reject()
        }
    })
}

function createMintingSession(){
    return new Promise(async (resolve, reject) => {
        const sessionId = await cargo.api.createMintingSession(projectId).catch((err) => {
            reject(err)
        });
        if(sessionId){
           resolve(sessionId)
        }
    })
}
function mintNft(sessionId){
    return new Promise(async (resolve,reject) => {
        const address = "0x4E805C2d330af3164f65951eC354FD0359dd8d2D"
        cargo.api.wizardMint(sessionId, address).then(txHash => {
            resolve(txHash)
        }).catch((err) => {
            reject(err)
        });
})
}
function saveNftDataIntoSession(sessionId, nfts){
    console.log(nfts)
    return new Promise(async (resolve, reject) => {
        const onSaved = (id) => {
            console.log("Saved: " + id)
        }
        const onError = (id,err) => {
            console.log(id)
            console.log(err)
            reject()
        }
        await cargo.api.saveNft(sessionId, nfts, onSaved, onError)
        resolve(true)

    })
}

function getCollection(){
    return new Promise(async (resolve, reject) => {
        const options = {
            projectId:projectId,
            limit:100
        }
        const collection = await cargo.api.getTokensByProject(options).catch((err) => reject(err))
        if(collection && collection.status === 200 && collection.err === false){
            resolve(collection.data.results)
        }
    })
}
function getCollectible(address, page){
    return new Promise(async (resolve, reject) => {
        const options = {
            contractId:projectId,
            address:address,
            limit:50, 
            page:page?page:1
                }
        const collection = await cargo.api.getUserTokensByContract(options).catch((err) => reject(err))
        if(collection && collection.status === 200 && collection.err === false){
            resolve(collection.data)
        }
    })
}
function getRoyalties(){
    const params = {
        projectId:projectId,
        tokenId:16
    }
    cargo.api.getRoyalty(params).then(res => {
        console.log(res)
    })
}
function setRoyalties(tokenId){
    return new Promise(async (resolve, reject) => {
        const options = {
            projectId:projectId,
            tokenId:tokenId,
            payees:[nomuAddress],
            commissions:[0.15]
        }
        console.log(tokenId)
        cargo.api.addRoyalty(options).then(res => {
            console.log(res)
            resolve(res)
        }).catch((err) => reject(err));
    })
}
function transferNFTs(){
    return new Promise(async (resolve,reject) => {
        const wallets = [
            // "0xA39350448668A6d19B80AbD8772fAA65d4311bd4",
            // "0xffd91D21aada737a54902E5C09f4af5A8E52252D",
            // "0xE6e3Bb4CAfcb5388bb142021a84B7528a9aAa4ee",
            // "0x75DB7796b8874785dE207b925a1d8a448F0266e0",
            // "0xB69892529af5f6261930eC8aCD0B0AB092833551",
            // "0xE0A703E24De2f2510FB3a8e2208B7383758f03b3",
            // "0x0E7B7141a9168B088b98307565E186B0a6a61A94",
            // "0xA55E8f346a2E48045F0418AAe297aae166F614ce",
            // "0xe6d41527E692BBeE73655281913AA7E482F14866",
            // "0x2cbd785ae43f796E29D4F15c5F16502de6292361",
            // "0xf3ea39310011333095CFCcCc7c4Ad74034CABA63",
            // "0x0DC825282d60cEB87c87A58AB1B1d47384ae9Aa5",
            // "0x53Eee223Dfe19694C46C0b7B973871807EF2888E",
            // "0xF18eb7De4A8F3e9d8d0e516BeD6a169BC330B7a4",
            // "0x3B2BE61D948fB65D510062c43206D1fDfE7FaFaC",
            // "0x9CCaC6d11c306317c99b8882e17bE4b1Eb8d7f3D",
            // "0xd11256d99f8833beE0B99203DDcfe4cd6c823d8D",
            // "0xB5806a701c2ae0366e15BDe9bE140E82190fa3d6",
            // "0x873351e707257C28eC6fAB1ADbc850480f6e0633",
            // "0xcb44375bA55a072A8A43452F9F6F1e24AEbf4666",
            // "0x31Eb2d493a204cb97e146dD1b117f179751c994c",
            // "0x79635b386B9bd6636Cd701879C32E6dd181C853F",
            // "0x19214CFB9439eEd6DCfd5e315bf6Dc786A6E1108", 

            "0x770569f85346B971114e11E4Bb5F7aC776673469",
            "0x8289432ACD5EB0214B1C2526A5EDB480Aa06A9ab",
            "0x707159Cc743A639CE289d2D987b4f58a084bBa1B",
            "0xce7298E5ef1aE8AF0573eDC2eBd03aB0F837E214",
            "0x8463CBfD1c37D5E1b169ebFD0e3e458ABd820a5f",
            "0xaC4361f56c82Ed59D533d45129F407015D84702a",
            "0xFC4CAEa2b67A157d145Bd3b98f84149951601C4b",
            "0x0176FD71667689Cd47E2770cC5f0389826bb33c4",
            "0xb3aF24c7C96E9438122E4796817bF5ddC8753278",
            "0xca768c37ba6EC3d67bE7B47bbE1F1C94CA216f46",
            "0x2B1a6dD2a80f7e9A2305205572Df0F4B38b205A1",
            "0x82004CEAC84aF108d40f02B5F82887eA3f654Db0",
            "0x1e4c43768C624d4ee324aE90a030c88182Bbc703",
            "0xFA79C55400D13689E2D81be2a087eb3D57B0B7e9",
            "0xA39742852645F6A6e4b03249ec20bba0Ae40847A",
            "0x3E099aF007CaB8233D44782D8E6fe80FECDC321e",
            "0xd03e867Ea9d797b35BAb7710a5C578AA7DE54E90",
            "0xa88Df405795A6e66F822Aeb81785B6446fd678c3",
            "0x55F5429343891f0a2b2A8da63a48E82DA8D9f2F6",
            "0xe085327c5AD2F77147F10973Fed45Fb19d734F7e",
            "0x81366EEfbb88CA85d58dB113B929fbc908A5B5DF",
            "0x5fabF9C1bc97964890adf0b719eAcAA07252A1cF",
            "0xfd37f4625ca5816157d55a5b3f7dd8dd5f8a0c2f",
            "0xE6164aad4D9Bc81Cc089fc376bdedaD59EAA2840",
            "0x4f0a1940De411285ad0455a7F40C81B5E0BC8492",
            "0x5ae25ec8afc816f9b5aa8cca64217761179a7393",
            "0x7fD5821C42Ae28103927d6586F66648bcdC1dAB5",
            "0x068549d24A2258127EaaF5838647247975341D5b",
            "0x878352E85371884E8b8c7f7A483c06f2BdbC4B4A",
            "0x14306f86629e6bc885375a1f81611a4208316b2b",
            "0xfb8108B2AC6f8Ba61b3997fb4D4B4e86b64cED6a",
            "0x71B9AB61caD1b6d4f6Dafcd795F346DB36f3B55E",
            "0xDf9007b0c308dA2294b42055b4659d6166e68Ba4",
            "0x05d70690B3d3D130b75B8aAA5C6a923F2aE1269f",
            "0x0A6e115971005254887433a0B50f9738Ec5516D5",
            "0x7d4e6c91b4D6dA24790A6574294B4bF0e58D9bE1",
            "0x1E3Fe690eeaCA1bC9DEde96ece39241cCD5DF640",
            "0x845eD9721B289BdaEb01a47160849ADe90277873"
            ]
        const response = await getCollectible(nomuAddress).catch((err) => {
            reject(err)
        })
        let collectibles = response.results
        if(collectibles){
            console.log(collectibles)
            const result = wallets.map(async (el) => {
                const randItem = collectibles.splice(randomNumber(0,collectibles.length),1)
                const tokenId = randItem[0].tokenId
                const data = await cargo.api.transferCollectible(contractId, tokenId, el).catch((err) => {
                    reject(err)
                })
                return data;
            })
            Promise.all(result).then((data) => {
                console.log(data)
                resolve(data)
            })
        }
    })
}
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 
function importToken(){
    return new Promise(async (resolve, reject) => {
        try {

            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const { ethereum } = window

            const wasAdded = await ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                  address: contractId, // The address that the token is at.
                  symbol: "FVKC", // A ticker symbol or shorthand, up to 5 chars.
                  decimals: 0, // The number of decimals in the token
                  image: "https://fvckmempool.netlify.app/android-icon-144x144.png", // A string url of the token logo
                },
              },
            });
          
            if (wasAdded) {
                resolve()
              console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
                reject()
            }
          } catch (error) {
            reject(error);
          }
    })
}
export {
enableCargo, 
createMintingSession,
saveNftDataIntoSession,
mintNft,
getCollection,
getCollectible,
connectWallet,
getRoyalties,
setRoyalties,
transferNFTs,
importToken
}