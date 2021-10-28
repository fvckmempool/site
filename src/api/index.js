import axios from 'axios'

const endpoint = "https://localhost" //"https://trib3.app"


function createUser(data){
    return new Promise(async (resolve, reject) => {
        const response = await axios.post(endpoint + "/new", data).catch((err) => {
            if(err && err.response && err.response.data.message){
              reject(err.response.data.message)
            }else{
              reject("Something failed, please try again later.")
            }
          })
          if(response && response.data){
            resolve("Confirm your email address to receive the NFT.")
          }
    })
}
function verifyEmail(data){
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(endpoint + "/fvck/verify/" + data).catch((err) => {
            if(err && err.response && err.response.data.message){
              reject(err.response.data.message)
            }else{
              reject("Something failed, please try again later.")
            }
          })
          if(response && response.data){
            resolve(response.data)
          }
    })
}

export {
    createUser,
    verifyEmail
}