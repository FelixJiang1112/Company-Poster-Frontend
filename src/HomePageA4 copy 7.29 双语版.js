import React, { useEffect, useState } from 'react';
import HomePageA4_CN from './HomePageA4_CN';
import HomePageA4_EN from './HomePageA4_EN';

const HomePageA4 = () => {
  const [dataList, setDataList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('zh'); // 'zh' for Chinese, 'en' for English

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then((data) => {
        setDataList(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  if (loading) {
    return <div>{language === 'zh' ? '加载中...' : 'Loading...'}</div>;
  }

  if (language === 'zh') {
    return (
      <HomePageA4_CN 
        dataList={dataList} 
        currentIndex={currentIndex} 
        onLanguageToggle={toggleLanguage}
      />
    );
  } else {
    return (
      <HomePageA4_EN 
        dataList={dataList} 
        currentIndex={currentIndex} 
        onLanguageToggle={toggleLanguage}
      />
    );
  }
};

export default HomePageA4;