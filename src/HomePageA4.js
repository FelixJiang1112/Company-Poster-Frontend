import React, { useEffect, useState } from 'react';
import './HomePageA4.css';
import rawData from './assets/data/formattedData.json';
import footerImage from './assets/images/footer.png';
import loanIcon from './assets/images/贷款金额icon.png';
import projectIcon from './assets/images/项目估价icon.png';
import lvrIcon from './assets/images/借贷比icon.png';

const headerImages = [
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
  'https://www.haopou.com/static/upload/2023/202302094519.jpg',
];

const HomePageA4 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(rawData);
  }, []);

  if (!data) return <div>加载中...</div>;

  return (
    <div className="container">
      <header className="header-grid">
        {headerImages.map((img, idx) => (
          <div className="header-img" key={idx}>
            <div className="image-container">
              <img src={img} alt={`header-${idx}`} className="header-img-el" />
              {idx === 2 && (
                <>
                  <div className="mortgage-label">
                    <span>{data.mortgageType}</span>
                  </div>
                  <div className="mortgage-bar"></div>
                </>
              )}
            </div>
          </div>
        ))}
      </header>

      <div className="top-section">
        <div className="top-left">
          <div className="main-title-container">
            <div className="main-title">{data.location.suburb}</div>
            <div className="main-title-row">
              <span className="sub-title">{data.location.state}</span>
              <span className="sub-title sub-title-red">{data.location.postcode}</span>
            </div>
          </div>
        </div>
        <div className="top-right">
          <div className="yield-container">
            <div className="yield-text">
              <div className="right-title">{data.investment.annualReturn.type}</div>
              <div className="right-sub">({data.investment.annualReturn.note})</div>
            </div>
            <div className="yield-rate">
              <span className="rate-num">{data.investment.annualReturn.rate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="middle-section">
        <div className="middle-left">
          <div className="property-description">
            {data.propertyDescription}
          </div>
        </div>
        <div className="middle-right">
          <div className="info-table">
            {[
              ['贷款性质', data.loanDetails.loanNature],
              ['贷款用途', data.loanDetails.loanPurpose],
              ['退出机制', data.loanDetails.exitMechanism],
              ['借款开始时间', data.loanDetails.startDate],
              ['预计还款时间', data.loanDetails.endDate],
              ['借款周期', data.loanDetails.loanTerm],
              // ['最低投资金额', data.loanDetails.minimumInvestment],
            ].map(([label, value], idx) => (
              <div className="table-row" key={idx}>
                <div className="table-label">{label}</div>
                <div className="table-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-section">
        {[
          ['贷款金额', data.financialMetrics.loanAmount.value, data.financialMetrics.loanAmount.note, loanIcon],
          ['项目估价', data.financialMetrics.propertyValue.currentValue, data.financialMetrics.propertyValue.potentialValue, projectIcon],
          ['LVR 借贷比', data.financialMetrics.lvrRatio.current, data.financialMetrics.lvrRatio.potential, lvrIcon],
        ].map(([title, value, note, icon], idx) => (
          <div className="data-col" key={idx}>
            <div className="data-icon-title-row">
              <div className="data-icon">
                <img src={icon} alt={title} className="icon-img" />
              </div>
              <div className="data-title">{title}</div>
            </div>
            <div className="data-value">{value}</div>
            <div className="data-note">({note})</div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <img src={footerImage} alt="Goodland Footer" className="footer-image" />
      </footer>
    </div>
  );
};

export default HomePageA4;
