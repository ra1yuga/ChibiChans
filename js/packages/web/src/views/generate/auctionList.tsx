import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs, Card, Button } from 'antd';
import BN from 'bn.js';
import React, { useMemo, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { AuctionRenderCard } from '../../components/AuctionRenderCard';
import { CardLoader } from '../../components/MyLoader';
import { PreSaleBanner } from '../../components/PreSaleBanner';
import { useMeta } from '../../contexts';
import { AuctionView, AuctionViewState, useAuctions } from '../../hooks';

const { TabPane } = Tabs;
const { Content } = Layout;
const { Meta } = Card;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

export const AuctionListView = () => {
  const auctions = useAuctions(AuctionViewState.Live);
  const auctionsEnded = useAuctions(AuctionViewState.Ended);
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { connected, publicKey } = useWallet();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  // const [showStep_hair, setShowStep_hair] = useState(false);
  // const [showStep_pant, setShowStep_pant] = useState(false);
  // const [showStep_skin, setShowStep_skin] = useState(false);
  // const [showStep_tee, setShowStep_tee] = useState(false);
  // const [showStep_completed, setShowStep_completed] = useState(false);
  const [showStep, setShowStep] = useState({
    eye: true,
    hair: false,
    pant: false,
    skin: false,
    tee: false,
    completed: false,
  });
  const onClick_eye = () => { 
    setShowStep({
      eye: false,
      hair: true,
      pant: false,
      skin: false,
      tee: false,
      completed: false,
    })
  }
  const onClick_hair = () => { 
    setShowStep({
      eye: false,
      hair: false,
      pant: true,
      skin: false,
      tee: false,
      completed: false,
    })
  }
  const onClick_pant = () => { 
    setShowStep({
      eye: false,
      hair: false,
      pant: false,
      skin: true,
      tee: false,
      completed: false,
    })
  }
  const onClick_skin = () => { 
    setShowStep({
      eye: false,
      hair: false,
      pant: false,
      skin: false,
      tee: true,
      completed: false,
    })
  }
  const onClick_tee = () => { 
    setShowStep({
      eye: false,
      hair: false,
      pant: false,
      skin: false,
      tee: false,
      completed: true,
    })
  }
  // const onClick_hair = () => setShowStep_pant(true);
  // const onClick_pant = () => setShowStep_skin(true);
  // const onClick_skin = () => setShowStep_tee(true);
  // const onClick_tee = () => setShowStep_completed(true);

  const ButtonEye = () => <div><Row className="fixed" style={{ width:'100vw', height:'100vh' }} gutter={16}>
    <Col span={8}>
      <Button value="1" style={{ border:'none' }} onClick={onClick_eye}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outeye/1.jpg" />}
          >
            <Meta title="Black"/>
        </Card>
      </Button>
    </Col>
    <Col span={8}>
      <Button value="2" style={{ border:'none' }} onClick={onClick_eye}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outeye/2.jpg" />}
          >
            <Meta title="Glasses"/>
        </Card>
      </Button>
    </Col>
    <Col span={8}>
      <Button value="3" style={{ border:'none' }} onClick={onClick_eye}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outeye/3.jpg" />}
          >
            <Meta title="Red & Blue"/>
        </Card>
      </Button>
    </Col>
  </Row>
  </div>;

  {/* Choose hair section */}
  const ButtonHair = () => <div><Row className="fixed" style={{ width:'100vw', height:'100vh' }} gutter={16}>
    <Col span={8}>
      <Button value="1" style={{ border:'none' }} onClick={onClick_hair}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outhair/1.jpg" />}
          >
            <Meta title="Pink"/>
        </Card>
      </Button>
    </Col>
    <Col span={8}>
      <Button value="2" style={{ border:'none' }} onClick={onClick_hair}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outhair/2.jpg" />}
          >
            <Meta title="Red Hat"/>
        </Card>
      </Button>
    </Col>
    <Col span={8}>
      <Button value="3" style={{ border:'none' }} onClick={onClick_hair}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outhair/3.jpg" />}
          >
            <Meta title="Brown"/>
        </Card>
      </Button>
    </Col>
  </Row>
  </div>;

  

  {/* Choose Pant section */}
  const ButtonPant = () => <div><Row className="fixed" style={{ width:'100vw', height:'100vh' }} gutter={16}>
    <Col span={5}>
      <Button value="1" style={{ border:'none' }} onClick={onClick_pant}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outpant/1.jpg" />}
          >
            <Meta title="Short"/>
        </Card>
      </Button>
    </Col>
    <Col span={5}>
      <Button value="2" style={{ border:'none' }} onClick={onClick_pant}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outpant/2.jpg" />}
          >
            <Meta title="Blue"/>
        </Card>
      </Button>
    </Col>
    <Col span={5}>
      <Button value="3" style={{ border:'none' }} onClick={onClick_pant}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outpant/3.jpg" />}
          >
            <Meta title="Red"/>
        </Card>
      </Button>
    </Col>
    <Col span={5}>
      <Button value="4" style={{ border:'none' }} onClick={onClick_pant}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outpant/4.jpg" />}
          >
            <Meta title="Green"/>
        </Card>
      </Button>
    </Col>
  </Row>
  </div>;

  {/* Choose skin section */}
  const ButtonSkin = () => <div><Row className="fixed" style={{ width:'100vw', height:'100vh' }} gutter={16}>
    <Col span={5}>
      <Button value="1" style={{ border:'none' }} onClick={onClick_skin}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outskin/1.jpg" />}
          >
            <Meta title="Black"/>
        </Card>
      </Button>
    </Col>
    <Col span={5}>
      <Button value="2" style={{ border:'none' }} onClick={onClick_skin}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outskin/2.jpg" />}
          >
            <Meta title="Glasses"/>
        </Card>
      </Button>
    </Col>
    <Col span={5}>
      <Button value="3" style={{ border:'none' }} onClick={onClick_skin}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outskin/3.jpg" />}
          >
            <Meta title="Red & Blue"/>
        </Card>
      </Button>
    </Col>
    <Col span={5}>
      <Button value="4" style={{ border:'none' }} onClick={onClick_skin}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outskin/4.jpg" />}
          >
            <Meta title="Red & Blue"/>
        </Card>
      </Button>
    </Col>
    <Col span={5}>
      <Button value="5" style={{ border:'none' }} onClick={onClick_skin}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outskin/5.jpg" />}
          >
            <Meta title="Red & Blue"/>
        </Card>
      </Button>
    </Col>
  </Row>
  </div>;

  {/* Choose tee section */}
  const ButtonTee = () => <div><Row className="fixed" style={{ width:'100vw', height:'100vh' }} gutter={16}>
    <Col span={8}>
      <Button value="1" style={{ border:'none' }} onClick={onClick_tee}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outtee/1.jpg" />}
          >
            <Meta title="Black"/>
        </Card>
      </Button>
    </Col>
    <Col span={8}>
      <Button value="2" style={{ border:'none' }} onClick={onClick_tee}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outtee/2.jpg" />}
          >
            <Meta title="Glasses"/>
        </Card>
      </Button>
    </Col>
    <Col span={8}>
      <Button value="3" style={{ border:'none' }} onClick={onClick_tee}>
        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt="example" src="/ImageFiles/outtee/3.jpg" />}
          >
            <Meta title="Red & Blue"/>
        </Card>
      </Button>
    </Col>
  </Row>
  </div>;

const ButtonComplete = () => <Button>
    Complete
  </Button>

  // Check if the auction is primary sale or not
  const checkPrimarySale = (auc: AuctionView) => {
    var flag = 0;
    auc.items.forEach(i => {
      i.forEach(j => {
        if (j.metadata.info.primarySaleHappened == true) {
          flag = 1;
          return true;
        }
      });
      if (flag == 1) return true;
    });
    if (flag == 1) return true;
    else return false;
  };

  const resaleAuctions = auctions
    .sort(
      (a, b) =>
        a.auction.info.endedAt
          ?.sub(b.auction.info.endedAt || new BN(0))
          .toNumber() || 0,
    )
    .filter(m => checkPrimarySale(m) == true);

  // Removed resales from live auctions
  const liveAuctions = auctions
    .sort(
      (a, b) =>
        a.auction.info.endedAt
          ?.sub(b.auction.info.endedAt || new BN(0))
          .toNumber() || 0,
    )
    .filter(a => !resaleAuctions.includes(a));

  let items = liveAuctions;

  switch (activeKey) {
    case LiveAuctionViewState.All:
      items = liveAuctions;
      break;
    case LiveAuctionViewState.Participated:
      items = liveAuctions
        .concat(auctionsEnded)
        .filter(
          (m, idx) =>
            m.myBidderMetadata?.info.bidderPubkey ==
            publicKey?.toBase58(),
        );
      break;
    case LiveAuctionViewState.Resale:
      items = resaleAuctions;
      break;
    case LiveAuctionViewState.Ended:
      items = auctionsEnded;
      break;
  }

  const heroAuction = useMemo(
    () =>
      auctions.filter(a => {
        // const now = moment().unix();
        return !a.auction.info.ended() && !resaleAuctions.includes(a);
        // filter out auction for banner that are further than 30 days in the future
        // return Math.floor(delta / 86400) <= 30;
      })?.[0],
    [auctions],
  );

  const liveAuctionsView = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
            if (m === heroAuction) {
              return;
            }

            const id = m.auction.pubkey;
            return (
              <Link to={`/auction/${id}`} key={idx}>
                <AuctionRenderCard key={id} auctionView={m} />
              </Link>
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  const endedAuctions = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? auctionsEnded.map((m, idx) => {
            if (m === heroAuction) {
              return;
            }

            const id = m.auction.pubkey;
            return (
              <Link to={`/auction/${id}`} key={idx}>
                <AuctionRenderCard key={id} auctionView={m} />
              </Link>
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  return (
    <>
      {/* <PreSaleBanner auction={heroAuction} /> */}
      <Layout style={{ maxWidth:'90vw' }}>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          
          {/* Choose eye section */}
          <div>
            {showStep.eye ? <ButtonEye /> : null}
            {showStep.hair ? <ButtonHair /> : null}
            {showStep.pant ? <ButtonPant /> : null}
            {showStep.skin ? <ButtonSkin /> : null}
            {showStep.tee ? <ButtonTee /> : null}
            {showStep.completed ? <ButtonComplete /> : null}
          </div>
          
        </Content>
      </Layout>
    </>
  );
};

