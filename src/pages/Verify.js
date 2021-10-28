import React,{useEffect, useState} from 'react'
import { verifyEmail } from '../api';
import {Result, Row, Col, Spin} from 'antd'
export default function Verify(props){
    const [verified,setVerified] = useState(null)
    const [message, setMessage] = useState("")
    useEffect(() => {
        const hash = props.match.params.hash
        verifyEmail(hash).then((data) => {
            if(data){
                setVerified(true)
                setMessage("The email: " + data + " has been verified, you will receive your NFT soon.")
            }
        }).catch((err) => {
            if(err){
                setVerified(false)
                setMessage(err)
            }
        })
    },[props])
    switch(verified){
        case verified === false:
            return(
                <Result
                status="error"
                title={<span className="text-white">Error in the email verification!</span>}
                subTitle={<span className="text-white">{message}</span>}
              />
            )
        case verified === true:
                return(
                    <Result
                    status="success"
                    title={<span className="text-white">Successfully verified email!</span>}
                    subTitle={<span className="text-white">{message}</span>}
                  />
                )
        default:
            return(
                <Row justify="center">
                    <Col>
                    <Spin size="large" />
                    <h1 className="text-white">We are verifying your email...</h1>
                    </Col>
                </Row>
            )
    }   
}