import React from 'react'

export default function DrinkCard({drink, id}){
    return(
        <div className="">
            <div  className="drinkCard">
            <figure>
            <img src={drink.image} alt="" className="img-fluid"/>
            </figure>
            <div className="pb-2">
            <h5 className=" text-center">{drink.name}</h5>
            <p className="text-off text-center">
                {id}/86
            </p>
            </div>
            </div>

        </div>
    )
}