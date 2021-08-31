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

  // const handleshow = (
  //   setState ((prevState) => {
  //     return {
  //     show : !prevState.show
  //   }})
  // )

  // const optionButton = () => {
  //   const [showResults, setShowResults] = React.useState(false)
  //   const onClick = () => setShowResults(true)
  //   return (
  //     <div>
  //       <Button type="default" shape="round" value="Search" onClick={onClick} >
  //       </Button>
  //       { showResults ? <Results /> : null }
  //     </div>
  //   )
  // }
  
  // const Results = () => (
  //   <div id="results" className="search-results">
  //     Some Results
  //   </div>
  // )

  return (
    <>
      {/* <PreSaleBanner auction={heroAuction} /> */}
      <Layout style={{ maxWidth:'90vw' }}>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Choose eye section */}
          {/* <Col style={{ width: '100%', marginTop: 10 }}>
            {liveAuctions.length >= 0 && (
              <Row>
                <Tabs
                  activeKey={activeKey}
                  onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
                >
                  <TabPane
                    tab={<span className="tab-title">Generate your Own ChibiChans!</span>}
                    key={LiveAuctionViewState.All}
                  >
                    {liveAuctionsView}
                    <Button type="default" shape="round" value="Search">lalala</Button>
                    <Button type="default" shape="round" value="Search">lalala</Button>
                    <Button type="default" shape="round" value="Search">lalala</Button>
                    <Button type="default" shape="round" value="Search">lalala</Button>
                    <Button type="default" shape="round" value="Search">lalala</Button>
                    <Button type="default" shape="round" value="Search">lalala</Button>
                  </TabPane>
                  {auctionsEnded.length > 0 && (
                    <TabPane
                      tab={
                        <span className="tab-title">Secondary Marketplace</span>
                      }
                      key={LiveAuctionViewState.Resale}
                    >
                      {liveAuctionsView}
                    </TabPane>
                  )}
                  {auctionsEnded.length > 0 && (
                    <TabPane
                      tab={<span className="tab-title">Ended Auctions</span>}
                      key={LiveAuctionViewState.Ended}
                    >
                      {endedAuctions}
                    </TabPane>
                  )}
                  {
                    // Show all participated live and ended auctions except hero auction
                  }
                  {connected && (
                    <TabPane
                      tab={<span className="tab-title">Participated</span>}
                      key={LiveAuctionViewState.Participated}
                    >
                      {liveAuctionsView}
                    </TabPane>
                  )}
                </Tabs>
              </Row>
            )}
          </Col> */}
          
          {/* Choose eye section */}
          <Row style={{ width:'100vw', height:'100vh' }} gutter={16}>
            <Col span={8}>
              <Button value="1" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/1.jpg" />}
                  >
                    <Meta title="Black"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button value="2" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/2.jpg" />}
                  >
                    <Meta title="Glasses"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button value="3" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/3.jpg" />}
                  >
                    <Meta title="Red & Blue"/>
                </Card>
              </Button>
            </Col>
          </Row>

          {/* Choose hair section */}
          <Row style={{ width:'100vw', height:'100vh' }} gutter={16}>
            <Col span={8}>
              <Button value="1" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outhair/1.jpg" />}
                  >
                    <Meta title="Pink"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button value="2" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outhair/2.jpg" />}
                  >
                    <Meta title="Red Hat"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button value="3" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outhair/3.jpg" />}
                  >
                    <Meta title="Brown"/>
                </Card>
              </Button>
            </Col>
          </Row>

          {/* Choose hair section */}
          <Row style={{ width:'100vw', height:'100vh' }} gutter={16}>
            <Col span={6}>
              <Button value="1" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outpant/1.jpg" />}
                  >
                    <Meta title="Short"/>
                </Card>
              </Button>
            </Col>
            <Col span={6}>
              <Button value="2" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outpant/2.jpg" />}
                  >
                    <Meta title="Blue"/>
                </Card>
              </Button>
            </Col>
            <Col span={6}>
              <Button value="3" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outpant/3.jpg" />}
                  >
                    <Meta title="Red"/>
                </Card>
              </Button>
            </Col>
            <Col span={6}>
              <Button value="4" style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outpant/4.jpg" />}
                  >
                    <Meta title="Green"/>
                </Card>
              </Button>
            </Col>
          </Row>

          {/* Choose pant */}
          <Row style={{ width:'100vw', height:'100vh' }} gutter={16}>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/1.jpg" />}
                  >
                    <Meta title="Black"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/2.jpg" />}
                  >
                    <Meta title="Glasses"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/3.jpg" />}
                  >
                    <Meta title="Red & Blue"/>
                </Card>
              </Button>
            </Col>
          </Row>

          {/* Choose skin section */}
          <Row style={{ width:'100vw', height:'100vh' }} gutter={16}>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/1.jpg" />}
                  >
                    <Meta title="Black"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/2.jpg" />}
                  >
                    <Meta title="Glasses"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/3.jpg" />}
                  >
                    <Meta title="Red & Blue"/>
                </Card>
              </Button>
            </Col>
          </Row>

          {/* Choose tee section */}
          <Row style={{ width:'100vw', height:'100vh' }} gutter={16}>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/1.jpg" />}
                  >
                    <Meta title="Black"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/2.jpg" />}
                  >
                    <Meta title="Glasses"/>
                </Card>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ border:'none' }} onClick={() => alert("Hello from here")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="/ImageFiles/outeye/3.jpg" />}
                  >
                    <Meta title="Red & Blue"/>
                </Card>
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
