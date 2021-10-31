import React from 'react'
import {Row, Col, Button} from 'antd'

export default function DrinksCategories({categories, parentCallBack}){
    return(
        <Row gutter={[16,16]}>
            {
                categories.map((cat) => (
                    <Col>
                        <Button type="primary" onClick={() => parentCallBack(cat.strCategory)}>{cat.strCategory}</Button>
                    </Col>
                ))
            }
        </Row>
    )
}