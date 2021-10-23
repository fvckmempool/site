import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Row, Col} from 'antd'
function App() {
  return (
    <div className="App mt-5 container">
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
          We want to thank all the people who have made us feel at home, so here you have a little gift from the nomu team.
          </p>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <Row justify="center">
          <Col lg={12} md={24}>
            <div className="">
            <input type="text"  class="input p-1" placeholder="Email address"/>
            <p className="mt-3 small text-off">
            We need your email to avoid spammers and to verify that you filled the #fvckmempool form.
            </p>
            </div>
            <div className="mt-5">
            <input type="text"  class="input p-1" placeholder="xDAI address"/>
            <a href="#" className="mt-3 small">
              How to conect xDAI chain with Metamask?
            </a>
            <div>
            <a href="#" className="mt-3 small">
            How to create a Metamask wallet? (Please store your private keys in a secure place)
            </a>
            </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
