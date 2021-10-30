import React,{useEffect, useState} from 'react'
import {Button, Upload, Modal, Row, Col, message, Spin, Result} from 'antd'
import {enableCargo, createMintingSession, saveNftDataIntoSession, mintNft} from '../cargo'

import FilesUploader from '../components/FilesUploader'

export default function Mint(props){
    const [enabled, setEnabled] = useState(false)
    const [sessionId, setSessionId] = useState(null)
    const [txId, setTxId] = useState(null)
    const [storedIntoSession, setStoredIntoSession] = useState(null)
    const [mintingModal, setMintingModal] = useState(false)
    const [minted, setMinted] = useState(false)
    const [loading, setLoading] = useState(false)

    const connectMetamask = () => {
        enableCargo().then(() => setEnabled(true)).catch((err) => setEnabled(false))
    }
    const generateSessionId = async () => {
        const _session = await createMintingSession().catch((err) => {
            console.log(err);
            message.error("Algo ha salido mal, intentalo de nuevo.")
        })
        setSessionId(_session)
    }
    const callback = (data) => {
        setMintingModal(true)
        setLoading(true)
        saveNftDataIntoSession(sessionId,data).then((response) => {
            if(response){
                setLoading(false);
                setStoredIntoSession(true);
            }
        }).catch((err) => {
            setLoading(false)
            setStoredIntoSession(false);

        })
    }
    const mintNFTs = async () => {
        const _txId = await mintNft(sessionId).catch((err) => {
            console.log(err)
            setMinted(false)
        })
        if(_txId){
            setMinted(true)
            setTxId(_txId)
        }
    }
    useEffect(() => {
        connectMetamask()
    },[props])
    useEffect(() => {
        if(enabled === true){
            generateSessionId()
        }
    },[enabled])
    return(
        <div className="container">
            <h1 className="text-white">
                NOMU MINTING PLATFORM
            </h1>
            <h4 className="text-white">
                {sessionId?("SESSION ID: " + sessionId):null} 
            </h4>
            {
                enabled?(
                    sessionId !== null ? (
                        <div>
                            <Modal visible={mintingModal} onCancel={null} footer={null}>
                                {
                                    loading ? (
                                        <div className="w-100 d-flex justify-content-center align-items-center">
                                            <Spin></Spin>
                                            <h4>Minting the NFTs...</h4>
                                        </div>
                                    ):(
                                        <Result
                                        status={storedIntoSession?"success":"error"}
                                        title={storedIntoSession?"NFT Successfully Upload!":"Somenthing falied during the minting process."}
                                        subTitle={storedIntoSession?"Now yo have to mint your NFT. :)":"Please close this modal and try it again"}
                                        extra={[
                                            minted && txId ? (
                                                <div className="my-3">
                                                <h4>
                                                    NFT Successfully minted, checkout the cargo collection to confirm.
                                                </h4>
                                                    <Button href="https://app.cargo.build/dashboard/collection/617cfa7dc30abf0008466463">
                                                        Check collection
                                                    </Button>
                                                </div>
                                            ):null,

                                            storedIntoSession && !minted ? (
                                                <Button type="primary" onClick={() => mintNFTs()}>
                                                    Mint
                                                </Button>
                                            ):(
                                                <Button type="danger" onClick={() => setMintingModal(false)}>
                                                    Close modal
                                                </Button>                                                
                                            )

                                        ]}
                                        >

                                        </Result>
                                        )
                                }
                            </Modal>
                        <FilesUploader parentCallback={callback}></FilesUploader>
                        </div>
                    ):null
                ):(
                    <div>
                        <div class="alert alert-warning" role="alert">
                        You have to connect your metamask wallet to Mint a NFT 
                        </div>
                        <div className="d-flex w-100 justify-content-center">
                        <div className="mm-logo d-flex justify-content-center align-items-center">
                            <div className="">
                            <img src="/img/mm-logo.svg" alt="" className="img-fluid"/>

                                <Button onClick={() => connectMetamask()}>Connect Metamask</Button>                                            
                            </div>
                        </div>
                        </div>
                    </div>
                )
            }
        </div>
    )    
}

