import React from 'react'
import {Row, Col, List, Tag} from 'antd'

export default function DrinkInfo({drink,id}){
    return(
        <Row justify="space-between" gutter={[16,16]} className="py-5">
        <Col lg={16}>
            <img src={drink.image} alt={drink.name} className="img-fluid"/>
        </Col>
        <Col lg={8} >
            <h1 className="bold text-center">{drink.name}</h1>
            <div className="mt-1">
                <p className="text-off text-center">
                    {id}/86
                </p>
                </div>
                <div className="mt-2">
                <Row gutter={[16,16]} justify="center">
                    <Col>
                    <Tag className="mx-auto" color="blue">
                    {drink.category}
                    </Tag>
                    </Col>

                    <Col>
                    <Tag className="mx-auto" color="gold">
                    {drink.glass}
                    </Tag>
                    </Col>
                </Row>
            </div>                            
            <div className="mt-5">
            <h2>Recipe</h2>
            <p>
                {drink.instructions}
            </p>
            </div>
            <hr/>
                <div className="mt-3">
                    <h2>Ingredients</h2>
                    <List>
                    {
                        drink.ingredients.map((el, idx) => (
                            <List.Item>
                                <Row justify="space-between" gutter={[16,16]}>
                                    <Col>
                                    {el}:
                                    </Col>
                                    <Col>
                                    {drink.measures[idx]}
                                    </Col>
                                </Row>
                            </List.Item>
                        ))
                    }
                    </List>

                </div>
                <hr/>
                <div className="mt-5">
                </div>
                <p className="text-off text-center">Seed: {drink.seed}</p>


        </Col>

    </Row>
    )
}