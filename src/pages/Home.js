import React,{ useEffect } from 'react';

import {Row, Col, Form, Input, message, Button, List} from 'antd'
import {createUser} from '../api'

export default function Home(props) {
    const [form] = Form.useForm()
    const senData = async (data) => {
        form.resetFields()
        const success = await createUser(data).catch((err) => message.error(err))
        if(success) message.success(success)

    }
    return (
      <div className="App my-5 container">
        <Row justify="center">
            <Col lg={12} >
              <div id="logo" className="d-flex align-items-center mx-auto">
                <h5 className="text-white mx-auto text-center">
                    <b>#FVCKMEMPOOL</b>
                </h5>
              </div>
              <div className="mt-4">
              <p className="quote">
                “Fvckmempool is an ideal, It's bigger than us.  Fvckmempool will be wherever Fvckmempoolnians are.”
                </p>
              </div>
            </Col>
        </Row> 
        <div className="mt-5">
          <Row justify="center">
            <Col lg={12} md={24}>
            <p className="text-jusitfy">
            <b>#Fvckmempool</b> was born from the need of the blockchain community to break barriers. On our drive from Madrid to Liscon,
             we were so excited to share our ideas and doubts about this world with as many people as possible. This is when we stumbled upon
            parties that got hyped by building barriers, limiting entrance and creating an exclusivity that does not have space within this community.
            The people reacted, and dozens of us got together in the streets of Lisbon to share, party and thrive with the beautiful people of the 
            blockchain space. This must continue, and together, we will bring down the walls that society keeps putting up, in order to, together, change 
            the fvcking world. <b>So today, tomorrow, and always, FVCKMEMPOOL</b>.
            </p>
            <p className="mt-3">
            We want to thank all the people who have made us feel at home, so here you have a little gift from the <a href="https://nomu-ar.netlify.app/">nomu team</a>.
            </p>
            </Col>
          </Row>
        </div>
        <div className="mt-5">
          <Row justify="center">
            <Col lg={12} md={24}>
            <h2 className="text-white"><b>THE #FVCKMEMPOOL COLLECTION</b></h2>
            <p>
            With this collection we want to thank you for everything, and, gift you a memory of the good times we spent together in Lisbon. We hope to continue bringing collections in each of the #fvckmempools meetups that are organized around the world so we can continue to grow as a beautiful decentralized community. (This is a small preview of the collection)
            </p>
            <p>
              <p>
              Share this page with your friends using the <a target="_blank" rel="noreferrer" href="https://twitter.com/search?q=%23fvckmempool">hastag #fvckmempool</a>, and invite them to <a target="_blank" rel="noreferrer" href="https://t.me/fvckmempool">join the #fvckmempool army to win a free NFT of the #fvckmempool collection</a>.
              </p>
              <b>
              If you want to keep up to date with the latest news follow us on twitter <a href="https://twitter.com/nomu_nft">@nomu_nft</a>
              </b>
            </p>
            </Col>
          </Row>
          <Row justify="center">
            <Col lg={12} md={24}>
              <img src="/img/preview.jpeg" alt="" className="img-fluid"/>
            </Col>
          </Row>
          <Row justify="center" className="mt-5">
            <Col lg={12} md={24}>
              <div className="mb-5">
                <h3 className="text-white">How to claim your NFT?</h3>
                <List>
                  <List.Item className="text-white">
                    1. Join the #fvckmempool telegram group.
                  </List.Item>
                  <List.Item className="text-white">
                    2. Create a xDAI chain wallet.
                    <div>
                    <a target="_blank" rel="noreferrer" href="https://myterablock.medium.com/how-to-create-or-import-a-metamask-wallet-a551fc2f5a6b" className=" small text-white">
                    How to create a Metamask wallet? (Please store your private keys in a secure place)
                    </a>
                    </div>
                    <div>
                    <a target="_blank" rel="noreferrer" href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup#manual-instructions" className=" small text-white">
                      How to conect xDAI chain with Metamask?
                    </a>
                    </div>
                  </List.Item>
                  <List.Item className="text-white">
                    3. Fill the form.
                  </List.Item>
                  <List.Item className="text-white">
                    4. Confirm your email address.
                  </List.Item>
                  <List.Item className="text-white">
                    5. We will send you an email once you receive the NFT in your xDAI chain wallet.
                  </List.Item>
                  <List.Item className="text-white">
                  </List.Item>
                </List>
                <p className="small text-off">
                  <b>
                  If you have any problem during the process contact to the #fvckmempool admins on telegram.
                  </b>
                </p>
              </div>
              <Form form={form} onFinish={senData}>
              <Form.Item name="email" rules={[{ required: true}]} labelAlign="" extra={<span className="text-white small text-off">We need your email to avoid spammers and to notify you once we send the NFTs.</span>}>
                  <Input type="email" placeholder="Email"></Input>
                </Form.Item>
                <Form.Item name="telegram" rules={[{ required: true }]}>
                  <Input placeholder="Telegram username"></Input>
                </Form.Item>
                <Form.Item name="wallet" rules={[{ required: true }]}>
                  <Input placeholder="xDAI chain address"></Input>
                </Form.Item>
                <div className="my-3">
  
  
                </div>
                <Form.Item>
                  <Button htmlType="submit">Submit</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }