import './App.css';
import Header from './main/header'
import  Content from './main/content'
import './custom.css'
import {useState} from "react";

function App() {
    const [headerData,setHeaderData] = useState({
        'selectedTab':'',
        'selectedOption':''
    });

    /**
     * Header에서 조작된 데이터를 받아오는 함수
     */
    function getHeaderData(data){
        setHeaderData(data);
    }
  return (
    <div className="App">
      {/* 간단한 화면이라 App.js 밑에 바로 Header와 Content를 생성 */}
      <Header getHeaderData={getHeaderData}/>
      <Content headerData={headerData}/>
    </div>
  );
}

export default App;
