import React,{useState} from 'react'
import {Row, Col, Modal, List} from 'antd'


export default function DrinkCard({drink, id}){
    const [visible, setVisible] = useState(false)
    return(
        <div className="">
            <Modal width={1200} visible={visible} footer={null} onCancel={() => setVisible(false)}>
                <Row justify="space-between" gutter={[16,16]}>
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

                    </Col>

                </Row>
            </Modal>
            <div  onClick={() => setVisible(true)} className="drinkCard">
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