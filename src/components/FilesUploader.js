import React,{useEffect, useState} from 'react'
import {Button, Row, Col, message} from 'antd'
import uuid from 'react-uuid'
import seedsMetadata from "../api/metadata"

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
        console.log(evt.target.files)
        const fileKeys = Object.keys(evt.target.files)
        const _files = fileKeys.map(async (k) => {
            const f = evt.target.files[k]
            const name = f.name.split(".")[0]
            const metadata = seedsMetadata[name]

            let nft = {
                name:metadata.name,
                description:"Fvckmempool is an ideal, It's bigger than us. Fvckmempool will be wherever Fvckmempoolnians are.",
                amount:1,
                files:[f],
                previewImage:f,
                metadata:JSON.stringify(metadata),
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
                        <input type="file" name="imgCollection" onChange={uploadFile} directory="" webkitdirectory="" />
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

