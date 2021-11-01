import {Cargo} from '@cargo-eth/js';
const projectId = "617cfa7dc30abf0008466463"
// const contractId = "0x1df1b7C5fd0329BA2792F28FC6615aCe6079CFaA"
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
                    }else {
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
function getCollectible(address){
    return new Promise(async (resolve, reject) => {
        const options = {
            contractId:projectId,
            address:address
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
export {
enableCargo, 
createMintingSession,
saveNftDataIntoSession,
mintNft,
getCollection,
getCollectible,
connectWallet,
getRoyalties,
setRoyalties
}