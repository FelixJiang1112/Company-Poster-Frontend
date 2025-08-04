import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './HomePageA4.css';
import footerImage from './assets/images/footer.png';
import loanIcon from './assets/images/贷款金额icon.png';
import projectIcon from './assets/images/项目估价icon.png';
import lvrIcon from './assets/images/借贷比icon.png';
import flyerImg from './assets/images/flyer.jpg';

const headerImages = [
  flyerImg,
  flyerImg,
  flyerImg,
  flyerImg,
];  

const HomePageA4_EN = ({ dataList, currentIndex, onLanguageToggle, onNext, onPrevious }) => {
  const containerRef = useRef(null);

  if (!dataList.length) {
    return <div>Loading...</div>;
  }

  const data = dataList[currentIndex];

  const exportAsImage = async () => {
    if (containerRef.current) {
      try {
        const exportButton = document.querySelector('.export-button');
        const languageToggleButton = document.querySelector('.language-toggle-button');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        if (exportButton) {
          exportButton.style.display = 'none';
        }
        if (languageToggleButton) {
          languageToggleButton.style.display = 'none';
        }
        if (prevButton) {
          prevButton.style.display = 'none';
        }
        if (nextButton) {
          nextButton.style.display = 'none';
        }

        const canvas = await html2canvas(containerRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 794,
          height: containerRef.current.offsetHeight,
          windowWidth: 794,
          onclone: (document, element) => {
            element.style.width = '794px';
            element.style.maxWidth = '794px';
          }
        });
        
        const link = document.createElement('a');
        link.download = `${data.suburb}-${data.postcode}-investment-info.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();

        if (exportButton) {
          exportButton.style.display = 'block';
        }
        if (languageToggleButton) {
          languageToggleButton.style.display = 'block';
        }
        if (prevButton) {
          prevButton.style.display = 'block';
        }
        if (nextButton) {
          nextButton.style.display = 'block';
        }
      } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed, please try again');
        
        const exportButton = document.querySelector('.export-button');
        const languageToggleButton = document.querySelector('.language-toggle-button');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        if (exportButton) {
          exportButton.style.display = 'block';
        }
        if (languageToggleButton) {
          languageToggleButton.style.display = 'block';
        }
        if (prevButton) {
          prevButton.style.display = 'block';
        }
        if (nextButton) {
          nextButton.style.display = 'block';
        }
      }
    }
  };

  return (
    <div className={'container lang-en'} ref={containerRef}>
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

      <div className="content-container">
        <div className="top-section">
          <div className="top-left">
            <div className="main-title-container">
              <div className="main-title">{data.suburb}</div>
              <div className="main-title-row">
                <span className="sub-title">{data.state}</span>
                <span className="sub-title sub-title-red">{data.postcode}</span>
              </div>
            </div>
          </div>
          <div className="top-right">
            <div className="yield-container">
              <div className="yield-text">
                <div className="right-title">Annual Rate</div>
                {/* <div className="right-sub">(Fixed annual rate, monthly interest)</div> */}
              </div>
              <div className="yield-rate">
                <span className="rate-num">{data.interest_rate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="middle-section">
          <div className="middle-left">
            <div className="property-description">
              {data.property_info?.en || data.info_en || 'Property description not available in English'}
            </div>
          </div>
          <div className="middle-right">
            <div className="info-table">
              {[
                ['Loan Nature', data.loan_nature?.en || data.loan_nature],
                ['Loan Purpose', data.loan_purpose?.en || data.loan_purpose],
                ['Exit Strategy', data.exit_strategy?.en || data.exit_strategy],
                ['Loan Start Date', data.loan_start_date],
                ['Expected Repayment Date', data.loan_repayment_date],
                ['Loan Term', data.loan_term ? `${data.loan_term} months` : ''],
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
            ['Loan Amount', data.loan_amount, loanIcon],
            ['Property Value', data.security_value, projectIcon],
            ['LVR Ratio', data.lvr_ration, lvrIcon], 
          ].map(([title, value, icon], idx) => (
            <div className={`data-col data-col-${idx + 1}`} key={idx}>
              <div className="data-icon-title-row">
                <div className="data-icon">
                  <img src={icon} alt={title} className="icon-img" />
                </div>
                <div className="data-title">{title}</div>
              </div>
              <div className="data-value">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <img src={footerImage} alt="Goodland Footer" className="footer-image" />
      </footer>
      
      <button 
        className="export-button"
        onClick={exportAsImage}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Export Image
      </button>
      
      <button 
        className="language-toggle-button"
        onClick={onLanguageToggle}
        style={{
          position: 'fixed',
          top: '20px',
          right: '160px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        中文
      </button>
      
      <button 
        className="prev-button"
        onClick={onPrevious}
        style={{
          position: 'fixed',
          top: '20px',
          right: '320px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
      >
        ← Previous
      </button>
      
      <button 
        className="next-button"
        onClick={onNext}
        style={{
          position: 'fixed',
          top: '20px',
          right: '430px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
      >
        Next →
      </button>
      
      <div 
        style={{
          position: 'fixed',
          top: '70px',
          right: '20px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 1000
        }}
      >
        {currentIndex + 1} / {dataList.length}
      </div>
    </div>
  );
};

export default HomePageA4_EN;