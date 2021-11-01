import React, { useEffect, useState } from 'react'
import {Button, message, Modal, Row, Col} from 'antd'
import {enableCargo, getCollectible, importToken} from '../../cargo/'
import DrinkInfo from './DrinkInfo';
import DrinkList from './DrinkList';

export default function ConnectWallet({parentCallback}){
    const [address,setAddress] =  useState(null);
    const [visible,setVisible] =  useState(false);
    const [collectibles, setCollectibles] = useState(null)
    const [selected, setSelected] = useState(null)
    const connect = async () => {
        const _connected = await enableCargo().catch((err) => {
            console.log(err)
            message.error("Somenthing failed, please try it again later.")
        })
        if(_connected){
            setAddress(_connected.address)
            message.success("Wallet connected.")
        }
    }
    const getOwnedDrink = async () => {
        const _collectibles = await getCollectible(address).catch((err) => {
            console.log(err);
            message.error("Somenthing failed please try it again later")
        })
        console.log(_collectibles)
        if(_collectibles){
            console.log(_collectibles)
                setCollectibles(_collectibles.results)
        }
    }

    const _importToken = () => {
        importToken().then(() =>  {
            message.success("FVCK token succesfully imported")

        }).catch((err) => {
             console.log(err)
            message.error("Somenthing failed please try it again later")
        })
    }

    useEffect(() => {
        connect()
    },[])
    useEffect(() => {
        if(address !== null){
            getOwnedDrink()
            console.log(address)
        }
    // eslint-disable-next-line
    },[address])
    useEffect(() => {
        if(collectibles && collectibles.length > 0){
            setSelected(collectibles[0])
        }
    },[collectibles])

    return (
        <div>
            {
                collectibles !== null && selected !== null ?(
                    <Modal footer={null} visible={visible} width={1000} onCancel={() => setVisible(false)}>
                        {
                            <div>
                                <Row justify="start">
                                    <Col>
                                        <Button type="primary" onClick={() => _importToken()}>Add $FVCK token to Metamask</Button>
                                    </Col>
                                </Row>
                                <DrinkInfo drink={selected.metadata}/>
                                <div className="mt-3">
                                    <DrinkList drinks={collectibles} parentCallback={(idx) => setSelected(collectibles[idx])} />
                                </div>
                            </div>
                        }
                    </Modal>
                ):null                
            }
            {
                address !== null && collectibles !== null?(
                    collectibles.length > 0 ? (
                        <Button type="primary" onClick={ () => setVisible(true)}>
                        Check your NFT
                    </Button>
                    ):(
                        <Button type="default" disabled onClick={ () => setVisible(true)}>
                        You don't own any NFT
                    </Button> 
                    )

                ):(
                    <Button type="default" onClick={() => connect()}>
                        Connect Wallet
                    </Button>
                )
            }
        </div>
    )
}