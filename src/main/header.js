import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import CreateUserModal from "../components/createUserModal";
import ErrorModal from "../components/errorModal";

const Header = (props) =>{
    const searchRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState('campaign');
    const [selectedOption, setSelectedOption] = useState('admin');
    const [userInfo,setUserInfo]=useState(false);

    const [userName,setUserName] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [userCompanyName,setUserCompanyName] = useState('')

    const [errorModalIsOpen,setErrorModalIsOpen] = useState(false)
    /**
     * 탭 변경과 셀렉트영역 변경을 감지하여 콘텐츠영역으로 해당 값을 보냄
     */
    useEffect(()=>{
        if(selectedOption!='admin'){
            setSelectedTab('campaign')
        }
        props.getHeaderData({
            'selectedTab':selectedTab,
            'selectedOption':selectedOption
        })
    },[selectedOption,selectedTab])

    /**
     * 셀렉트영역 이외의 영역 선택시 셀렉트를 닫아줌
     */
    useEffect(()=>{
        function handleOutside(e){
            if(searchRef.current &&!searchRef.current.contains(e.target)){
                setUserInfo(false);
            }
        }
        document.addEventListener("mousedown",handleOutside);
        return()=>{
            document.removeEventListener("mousedown",handleOutside)
        }
    },[searchRef])

    /**
     * 헤더 로드
     */
    useEffect(()=>{
        // 서비스 추가 후 삭제 - START
        setUserName('신지환')
        setUserEmail('shin@naver.com')
        setUserCompanyName('와이드버즈')
        // 서비스 추가 후 삭제 - END
        const url = 'http://localhost:8080/api/auth/me'
        axios({
            url:url,
            method:'get',
        })
            .then((res)=>{
                setUserName(res['name'])
                setUserEmail(res['email'])
                setUserCompanyName(res['company']['name'])
            }).catch((error)=>{
                console.error(error)
                setErrorModalIsOpen(true)
            })
    },[])

    function getErrorModalStatus(status){
        setErrorModalIsOpen(status)
    }

    return(
        <React.Fragment>
        <div className={'flex'} style={{background:'#348EFC', justifyContent:'space-between'}}>
            <div className={'flex align-items-center'}>
                <div className={'headerBox'}>
                    <span className={'headerBoxText'}>Wisebrids</span></div>
                <div className={selectedTab=='campaign'?'headerBoxSelected':'headerBox'}
                     id={'campaignBtn'}
                     onMouseOver={() => {window.document.getElementById("campaignBtn").style.cursor = "pointer";}}
                     onMouseLeave={() => {window.document.getElementById("campaignBtn").style.cursor = "default";}}
                     onClick={()=>{setSelectedTab('campaign')}}
                >
                    <span className={'headerBoxText'}>캠페인</span>
                </div>
                <div className={selectedTab=='user'?'headerBoxSelectedUser':''}>
                    <div className={selectedOption=='admin'?'headerBox':'hidden'}
                         id={'userBtn'}
                         onMouseOver={() => {window.document.getElementById("userBtn").style.cursor = "pointer";}}
                         onMouseLeave={() => {window.document.getElementById("userBtn").style.cursor = "default";}}
                         onClick={()=>{setSelectedTab('user')}}
                    >
                    <span className={'headerBoxText'}>사용자</span>
                    </div>
                </div>
            </div>
            <div className={'flex align-items-center'}>
            <div className={userInfo==true?'headerBoxSelected':'headerBox'}
                 ref={searchRef}
                 id={'userInfo'}
                 style={{position:'relative'}}
                 onMouseOver={() => {window.document.getElementById("userInfo").style.cursor = "pointer";}}
                 onMouseLeave={() => {window.document.getElementById("userInfo").style.cursor = "default";}}
                 onClick={()=>{userInfo==true?setUserInfo(false):setUserInfo(true)}}>
                <span className={'headerBoxText'}>{userEmail}</span>
                <div className={userInfo==true?'':'hidden'}
                    style={{
                        position: "absolute",
                        zIndex: "9999",
                        background: "white",
                        borderRadius:10,
                        border: "1px solid #D5D5D5",
                        width: "auto",
                        minWidth: "180px",
                        height: "auto",
                        padding:'5px',
                        right:'10px',
                        top:'55px'
                    }}
                >
                    <div><span style={{fontSize:'larger'}}>{userName}</span></div>
                    <div className={'colorGray'}>{userEmail}</div>
                    <div className={'colorGray'}>{userCompanyName}</div>
                </div>
            </div>
                <select className={"headerSelect"} onChange={(event)=>{setSelectedOption(event.target.value)}}>
                    <option value={"admin"}>어드민</option>
                    <option value={"manager"}>매니저</option>
                    <option value={"viewer"}>뷰어</option>
                </select>
            </div>
        </div>
            <ErrorModal errorModalIsOpen={errorModalIsOpen} getErrorModalStatus={getErrorModalStatus}/>
        </React.Fragment>
    )
}
export default Header;
