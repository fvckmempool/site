import React,{useEffect, useState} from 'react'
import {Button, Upload, Modal, Row, Col, message} from 'antd'
import uuid from 'react-uuid'

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

export default function FileUploader({parentCallback}){
    const [files, setFiles] = useState([])

    const uploadFile = async (evt) => {
        const fileKeys = Object.keys(evt.target.files)
        const _files = fileKeys.map(async (k) => {
            const f = evt.target.files[k]
            const name = f.name.split(".")[0]
            const metadata = {
                bg:name[0],
                cup:name[1],
                label:name[2],
                lava:name[3],
                element:name[4],
                number:name,
            }

            let nft = {
                name:name,
                description:"Fvckmempool is an ideal, It's bigger than us. Fvckmempool will be wherever Fvckmempoolnians are.",
                amount:1,
                files:[f],
                previewImage:f,
                metadata:metadata,
                id:uuid()
            }
            nft.preview = await getBase64(f) 
            return nft
        })
        Promise.all(_files).then((data) => {
            setFiles(data)
        }).catch((err) => message.error("Algo ha salido mal."))
    }
    useEffect(() => {
        console.log(files)
    },[files])
    return (

            <div className="mt-5">
                    <div className="form-group mb-5">
                        <input type="file" name="imgCollection" onChange={uploadFile} multiple />
                    </div>
                    <Row gutter={[16,16]}>
                {
                    files.map((file) => {
                        return(
                            <Col span={4}>
                                <img src={file.preview} alt="" className="img-fluid"/>
                            </Col>
                        )
                    })
                }
                </Row>
                {
                    files.length > 0 ?(
                        <div className="mt-3">
                            <Button onClick={() => parentCallback(files)}>Mint</Button>
                        </div>
                    ):null
                }
            </div>
    )
    }

