// import React,{useState, useEffect} from 'react'
// import {useParams} from 'react-router-dom'
// import DrinkInfo from '../components/drinks/DrinkInfo'
// import {getCollectible} from './../cargo/index'
// export default function Drink(props){
//     const idToken = props.match.params.id
//     const loadData = async () => {
//                 console.log(idToken)
//                 const response = await getCollectible(idToken).catch((err) => {
//                     console.log(err)
//                 })
//                 console.log(response)
//                 console.log("HOLA")
//     }
//     useEffect(() => {
//         loadData()
//     },[])
//     return(
//         {
//             drink?(
//                 <div className="container">
//                 <DrinkInfo></DrinkInfo>
//             </div>
//             ):null
//         }
//     )
// }