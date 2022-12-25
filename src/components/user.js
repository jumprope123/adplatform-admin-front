import React, {useEffect, useRef, useState} from "react";
import Switch from "react-switch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft, faAngleDoubleRight, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ko';
import CreateUserModal from "./createUserModal";
import UpdateUserModal from "./updateUserModal";
import ErrorModal from "./errorModal";

const User = (props) =>{
    const[userData,setUserData]=useState([]);
    const[activePage,setActivePage] = useState(1);
    const[userContents,setUserContents] = useState({"content":[],"total_elements":0})
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [updateRow,setUpdateRow] = useState('');

    const [errorModalIsOpen,setErrorModalIsOpen] = useState(false)

    /**
     * 유저 관리의 테이블 영역을 만듬
     */
    useEffect(()=>{
        let _userData = [];
        userContents.content.map((item,index)=>{
            _userData.push(
                <tr key={index}>
                    <td style={{height:'27px'}} className={'textAlignLeft'}>{item.email}</td>
                    <td className={'textAlignLeft'}>{item.name}</td>
                    <td className={'textAlignLeft'}>{moment(new Date(item.last_login_at)).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td className={'textAlignCenter'}>
                        <span
                            id={'updateBtn'+index}
                            style={{color:'blue'}}
                            onMouseOver={() => {window.document.getElementById('updateBtn'+index).style.cursor = "pointer";}}
                            onMouseLeave={() => {window.document.getElementById('updateBtn'+index).style.cursor = "default";}}
                            onClick={()=>{
                                setUpdateRow(item)
                                setUpdateModalIsOpen(true)
                            }}
                        >
                            수정
                        </span>
                    </td>
                </tr>
            )
        })
        setUserData(_userData);
    },[userContents])

    /**
     * 사용자 탭이 눌렸을경우 페이지 로드
     */
    useEffect(()=>{
        if(props.headerData.selectedTab=='user'){
            onLoadUser();
        }
    },[props.headerData.selectedTab])


    /**
     * 페이지 로드 함수
     */
    function onLoadUser(pageNumber=1){
        // 서비스 추가시 삭제 - START
        setUserContents(
            {
                "content":[
                    {
                        "id":1,
                        "email":"user1@wisebirds.ai",
                        "name":"사용자1",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":2,
                        "email":"user2@wisebirds.ai",
                        "name":"사용자2",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":3,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":4,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":5,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },{
                        "id":6,
                        "email":"user1@wisebirds.ai",
                        "name":"사용자1",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":7,
                        "email":"user2@wisebirds.ai",
                        "name":"사용자2",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":8,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":9,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":10,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },{
                        "id":11,
                        "email":"user1@wisebirds.ai",
                        "name":"사용자1",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":12,
                        "email":"user2@wisebirds.ai",
                        "name":"사용자2",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":13,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":14,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":15,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },{
                        "id":16,
                        "email":"user1@wisebirds.ai",
                        "name":"사용자1",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":17,
                        "email":"user2@wisebirds.ai",
                        "name":"사용자2",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":18,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":19,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":20,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },{
                        "id":21,
                        "email":"user1@wisebirds.ai",
                        "name":"사용자1",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":22,
                        "email":"user2@wisebirds.ai",
                        "name":"사용자2",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":23,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":24,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                    {
                        "id":25,
                        "email":"user3@wisebirds.ai",
                        "name":"사용자3",
                        "last_login_at":"2022-11-14T07:37:24.914Z"
                    },
                ],
                "size": 25,
                "total_elements": 51,
                "total_pages": 3,
                "number":1
            }
        )
        // 서비스 추가시 삭제 - END

        // 서비스 추가시 주석 해제 - START
        const url = 'http://localhost:8080/api/users'
        axios({
            url:url,
            method:'get',
            params:{
                page:pageNumber,
                size:25
            }
        })
            .then((res)=>{
                setUserContents(res['content'])
            }).catch((error)=>{
                console.error(error)
                setErrorModalIsOpen(true)
            })
        // 서비스 추가시 주석 해제 - END
    }

    /**
     * 페이지네이션이 변경될때 변경된 값을 세팅하고, 해당값을 넘겨 페이지 재조회
     */
    function handlePageChange(pageNumber){
        setActivePage(pageNumber)
        onLoadUser(pageNumber)
    }

    /**
     * user창의 modal 상태값 변경
     */
    function getCreateUserModalStatus(status){
        setCreateModalIsOpen(status)
    }

    function getUpdateUserModalStatus(status){
        setUpdateModalIsOpen(status)
    }

    function getErrorModalStatus(status){
        setErrorModalIsOpen(status)
    }


    /**
     * 페이지 네이션의 스타일 지정
     */
    const PaginationBox = styled.div`
  .pagination { display: flex; justify-content: center; margin-top: 15px;}
  ul { list-style: none; padding: 0; }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem; 
  }
  ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
  ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
  ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
  ul.pagination li.active a { color: white; }
  ul.pagination li.active { background-color: #337ab7; }
  ul.pagination li a:hover,
  ul.pagination li a.active { color: blue; }
  `

    return(
        <React.Fragment>
        <div className={'row gx-0'}>
            <div className={"textAlignLeft mgt10"}><h4 className={"mgl20"}>{props.titleText}</h4></div>
            <div className={"borderTop"}>
            <div className={"textAlignLeft mgl20"}>
                <button
                    id={'creatBtn'}
                    className={'creatBtn'}
                    onMouseOver={() => {window.document.getElementById("creatBtn").style.cursor = "pointer";}}
                    onMouseLeave={() => {window.document.getElementById("creatBtn").style.cursor = "default";}}
                    onClick={()=>{setCreateModalIsOpen(true)}}
                >생성</button>
            </div>
            </div>
            <div style={{minHeight:props.tableHeight-35}}>
                <table className={'w-full textAlignLeft borderBottom table-border'} style={{tableLayout:'fixed', borderCollapse:'collapse'}}>
                    <colgroup>
                        <col width="30%"/>
                        <col width="30%"/>
                        <col width="30%"/>
                        <col width="10%"/>
                    </colgroup>
                    <thead>
                    <tr className={'colorGray'}>
                        <th className={'textAlignLeft'}>아이디</th>
                        <th className={'textAlignLeft'}>이름</th>
                        <th className={'textAlignLeft'}>마지막 로그인 일시</th>
                        <th className={'textAlignCenter'}>수정</th>
                    </tr>
                    {userData}
                    </thead>
                </table>
            </div>
            <div className={'justify-content-center'}>
                <div style={{display:'inline-flex'}}>
                    <PaginationBox>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={25}
                            totalItemsCount={userContents.total_elements}
                            pageRangeDisplayed={4}
                            onChange={handlePageChange}
                        />
                    </PaginationBox>
                </div>
            </div>
        </div>
            <CreateUserModal createModalIsOpen={createModalIsOpen} getCreateUserModalStatus={getCreateUserModalStatus} onLoadUser={onLoadUser}/>
            <UpdateUserModal updateModalIsOpen={updateModalIsOpen} getUpdateUserModalStatus={getUpdateUserModalStatus} onLoadUser={onLoadUser} updateRow={updateRow}/>
            <ErrorModal errorModalIsOpen={errorModalIsOpen} getErrorModalStatus={getErrorModalStatus}/>
        </React.Fragment>
    )
}

export default User;
