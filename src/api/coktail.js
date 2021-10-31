import axios from 'axios'

const endpoint = "https://www.thecocktaildb.com/api/json/v1/1/"


function getAllCategories(){
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(endpoint + "/list.php?c=list").catch((err) => reject(err));
        if(response && response.data) resolve(response.data)
    }) 
}
function getDrinksByCategory(category){
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(endpoint + "/filter.php?c=" + category).catch((err) => reject(err));
        if(response && response.data) resolve(response.data)
    }) 
}
export {
    getAllCategories,
    getDrinksByCategory
}