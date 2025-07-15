import React, { useEffect, useState } from 'react';
import './HomePage.css';
import propertyData from './propertyData.json';
import footerImage from './assets/images/footer.png';
import loanIcon from './assets/images/贷款金额icon.png';

const headerImages = [
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
];

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(propertyData);
  }, []);

  if (!data) return <div>加载中...</div>;

  const { property, loan, investment } = data;

  return (
    <div className="container">
      {/* Header 四宫格图片 */}
      <header className="header-grid">
        {headerImages.map((img, idx) => (
          <div className="header-img" key={idx}>
            <div className="image-container">
              <img src={img} alt={`header-${idx}`} className="header-img-el" />
              {idx === 2 && ( // 修改为左下角图片（索引2）
                <>
                  <div className="mortgage-label">
                    <span>二级抵押</span>
                  </div>
                  <div className="mortgage-bar"></div>
                </>
              )}
            </div>
          </div>
        ))}
      </header>

      {/* 顶部：左边标题，右边收益 */}
      <div className="top-section">
        <div className="top-left">
          <div className="main-title-container">
            <div className="main-title">Guildford</div>
            <div className="main-title-row">
              <span className="sub-title">NSW</span>
              <span className="sub-title sub-title-red">2790</span>
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="yield-container">
            <div className="yield-text">
              <div className="right-title">年化收益净回报</div>
              <div className="right-sub">(固定年化，每月付息）</div>
            </div>
            <div className="yield-rate">
              <span className="rate-num">14.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 中间：左边介绍，右边列表 */}
      <div className="middle-section">
        <div className="middle-left">
          <div className="property-description">
            位于悉尼中央商务区以西约25公里，抵押资产为一栋1955年建成的独立住宅，Torrens产权，设有2间卧室、1间浴室和1个停车位，土地面积537平方米，室内面积101平方米。Guildford区域独立屋市场活跃，中位价为123万澳元，过去12个月增长7.2%，房产平均挂牌时间为52天，全年成交量达153套(平均每月13套)，整体流动性稳定，属于悉尼西区较具需求的住宅板块之一。          
          </div>
        </div>
        <div className="middle-right">
          <div className="info-table">
            <div className="table-row">
              <div className="table-label">贷款性质</div>
              <div className="table-value">过桥贷款</div>
            </div>
            <div className="table-row">
              <div className="table-label">贷款用途</div>
              <div className="table-value">商业投资机会</div>
            </div>
            <div className="table-row">
              <div className="table-label">退出机制</div>
              <div className="table-value">借款人其他项目的投资回款</div>
            </div>
            <div className="table-row">
              <div className="table-label">借款开始时间</div>
              <div className="table-value">19/01/2024</div>
            </div>
            <div className="table-row">
              <div className="table-label">预计还款时间</div>
              <div className="table-value">18/01/2025</div>
            </div>
            <div className="table-row">
              <div className="table-label">借款周期</div>
              <div className="table-value">12个月</div>
            </div>
            <div className="table-row">
              <div className="table-label">最低投资金额</div>
              <div className="table-value">$100,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部：三列数据 */}
      <div className="bottom-section">
        <div className="data-col">
          <div className="data-icon-title-row">
            <div className="data-icon">
              <img src={loanIcon} alt="贷款金额" className="icon-img" />
            </div>
            <div className="data-title">贷款金额</div>
          </div>
          <div className="data-value">$2,000,000</div>
          <div className="data-note">(一押银行ANZ $506,631)</div>
        </div>
        <div className="data-col">
          <div className="data-icon-title-row">
            <div className="data-icon">
              <img src={loanIcon} alt="项目估价" className="icon-img" />
            </div>
            <div className="data-title">项目估价</div>
          </div>
          <div className="data-value">$5,900,000</div>
          <div className="data-note">(地块分割后价值约 $12,000,000)</div>
        </div>
        <div className="data-col">
          <div className="data-icon-title-row">
            <div className="data-icon">
              <img src={loanIcon} alt="LVR借贷比" className="icon-img" />
            </div>
            <div className="data-title">LVR 借贷比</div>
          </div>
          <div className="data-value">33%</div>
          <div className="data-note">(地块分割后 LVR 17%)</div>
        </div>
      </div>

      {/* Footer 固定内容 */}
      <footer className="footer">
        {/* <div>Goodland | 联系方式：0411 229 119 | 邮箱：Hal.weng@goodlandcapital.com.au | 地址：Level 7/9 Help St Chatswood, NSW 2067</div> */}
        <img src={footerImage} alt="Goodland Footer" className="footer-image" />
      </footer>
    </div>
  );
};

export default HomePage; 