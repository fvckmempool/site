import React from 'react'
import {Row, Col} from 'antd'
import DrinkCard from './DrinkCard'
export default function DrinkList({drinks}){
    return(
        <Row justify="" gutter={[16,16]}>
            {
                drinks.map((drink) => {
                        const tokenId = drink.tokenId - 14
                        return(drink && drink.metadata?(
                            <Col lg={6} md={8} sm={2}>
                            <DrinkCard key={tokenId} drink={drink.metadata} id={tokenId}/>
                        </Col>
                        ):null
            
                        )
                })
            }
        </Row>
    )
}