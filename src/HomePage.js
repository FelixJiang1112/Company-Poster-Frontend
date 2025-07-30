import React, { useEffect, useState } from 'react';
import './HomePage.css';
import rawData from './assets/data/formattedData.json';  // 更新为格式化后的JSON文件
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
    setData(rawData);
  }, []);

  if (!data) return <div>加载中...</div>;

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
                    <span>{data.mortgageType}</span>
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

      {/* 中间：左边介绍，右边列表 */}
      <div className="middle-section">
        <div className="middle-left">
          <div className="property-description">
            {data.propertyDescription}
          </div>
        </div>
        <div className="middle-right">
          <div className="info-table">
            <div className="table-row">
              <div className="table-label">贷款性质</div>
              <div className="table-value">{data.loanDetails.loanNature}</div>
            </div>
            <div className="table-row">
              <div className="table-label">贷款用途</div>
              <div className="table-value">{data.loanDetails.loanPurpose}</div>
            </div>
            <div className="table-row">
              <div className="table-label">退出机制</div>
              <div className="table-value">{data.loanDetails.exitMechanism}</div>
            </div>
            <div className="table-row">
              <div className="table-label">借款开始时间</div>
              <div className="table-value">{data.loanDetails.startDate}</div>
            </div>
            <div className="table-row">
              <div className="table-label">预计还款时间</div>
              <div className="table-value">{data.loanDetails.endDate}</div>
            </div>
            <div className="table-row">
              <div className="table-label">借款周期</div>
              <div className="table-value">{data.loanDetails.loanTerm}</div>
            </div>
            <div className="table-row">
              <div className="table-label">最低投资金额</div>
              <div className="table-value">{data.loanDetails.minimumInvestment}</div>
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
          <div className="data-value">{data.financialMetrics.loanAmount.value}</div>
          <div className="data-note">({data.financialMetrics.loanAmount.note})</div>
        </div>
        <div className="data-col">
          <div className="data-icon-title-row">
            <div className="data-icon">
              <img src={loanIcon} alt="项目估价" className="icon-img" />
            </div>
            <div className="data-title">项目估价</div>
          </div>
          <div className="data-value">{data.financialMetrics.propertyValue.currentValue}</div>
          <div className="data-note">({data.financialMetrics.propertyValue.potentialValue})</div>
        </div>
        <div className="data-col">
          <div className="data-icon-title-row">
            <div className="data-icon">
              <img src={loanIcon} alt="LVR借贷比" className="icon-img" />
            </div>
            <div className="data-title">LVR 借贷比</div>
          </div>
          <div className="data-value">{data.financialMetrics.lvrRatio.current}</div>
          <div className="data-note">({data.financialMetrics.lvrRatio.potential})</div>
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