import {Cargo} from '@cargo-eth/js';
import Web3 from 'web3'
const projectId = "617cfa7dc30abf0008466463"
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
                if(response.status === 200){
                        resolve()
                    }
            });            
        }else {
           reject()
        }
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
export {
enableCargo, 
createMintingSession,
saveNftDataIntoSession,
mintNft
}