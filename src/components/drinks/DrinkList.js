import React from 'react'
import {Row, Col} from 'antd'
import DrinkCard from './DrinkCard'
export default function DrinkList({drinks, parentCallback}){
    return(
        <Row justify="" gutter={[16,16]}>
            {
                drinks.map((drink,idx) => {
                        const tokenId = drink.tokenId - 14
                        return(drink && drink.metadata?(
                            <Col lg={6} md={8} sm={2}>
                                <div onClick={() => parentCallback(idx)}>
                                <DrinkCard  key={tokenId} drink={drink.metadata} id={tokenId}/>

                                </div>
                        </Col>
                        ):null
            
                        )
                })
            }
        </Row>
    )
}