import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ErrorModal from "./errorModal";

const CreateUserModal = (props) =>{
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [modalId,setModalId]=useState('')
    const [modalPassword,setModalPassword]=useState('')
    const [modalPasswordCheck,setModalPasswordCheck]=useState('')
    const [modalName,setModalName]=useState('')

    const [validationId,setValidationId]=useState(false)
    const [validationIdText,setValidationIdText]=useState()
    const [validationPassword,setValidationPassword]=useState(false)
    const [validationPasswordText,setValidationPasswordText]=useState()
    const [validationCheckPassword,setValidationCheckPassword]=useState(false)
    const [validationCheckPasswordText,setValidationCheckPasswordText]=useState()
    const [validationName,setValidationName]=useState(false)
    const [validationNameText,setValidationNameText]=useState()

    const [errorModalIsOpen,setErrorModalIsOpen] = useState(false)

    useEffect(()=>{
        setCreateModalIsOpen(props.createModalIsOpen)
    },[props.createModalIsOpen])

    //이메일 정규식 체크
    function email_check(email) {
        const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return reg.test(email);
    }

    //비밀번호 정규식 체크
    function password_check(password) {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
        return reg.test(password);
    }

    //이름 정규식 체크
    function name_check(name){
        const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{1,16}$/;
        return reg.test(name)
    }

    function checkValidation(){
        //이메일 확인
        //이메일 중복의 경우는 서비스가 필요한데 없어서 보류
        if(modalId==null||modalId==''||modalId==undefined){
            setValidationId(true)
            setValidationIdText('아이디(이메일)을 입력하세요.')
        }else if(modalId.length<9 || modalId.length>50 || !email_check(modalId)){
                setValidationId(true)
                setValidationIdText('올바른 이메일 주소를 입력하세요.')
        }

        //비밀번호 확인
        if(modalPassword==null||modalPassword==''||modalPassword==undefined){
            setValidationPassword(true)
            setValidationPasswordText('비밀번호를 입력하세요.')
        }else if(!password_check(modalPassword)){
            setValidationPassword(true)
            setValidationPasswordText('8~15자 영문,숫자,특수문자를 사용하세요.')
        }

        //비밀번호 확인 확인
        if(modalPasswordCheck==null||modalPasswordCheck==''||modalPasswordCheck==undefined){
            setValidationCheckPassword(true)
            setValidationCheckPasswordText('비밀번호를 입력하세요.')
        }else if(!(modalPassword==modalPasswordCheck)){
            setValidationCheckPassword(true)
            setValidationCheckPasswordText('비밀번호가 일치하지 않습니다.')
        }

        //이름 확인
        if(modalName==null||modalName==''||modalName==undefined){
            setValidationName(true)
            setValidationNameText('이름을 입력하세요.')
        }else if(!name_check(modalName)){
            setValidationName(true)
            setValidationNameText('이름을 올바르게 입력하세요.(숫자,특수문자,공백 입력불가)')
        }

        //모든 validation을 통과 후 생성버튼 실행
        if(
            !(modalId==null||modalId==''||modalId==undefined)&&
            !(modalId.length<9 || modalId.length>50 || !email_check(modalId))&&
            !(modalPassword==null||modalPassword==''||modalPassword==undefined)&&
            (password_check(modalPassword))&&
            !(modalPasswordCheck==null||modalPasswordCheck==''||modalPasswordCheck==undefined)&&
            (modalPassword==modalPasswordCheck)&&
            !(modalName==null||modalName==''||modalName==undefined)&&
            (name_check(modalName))
        ){
            // 서비스 추가 필요 - START
            const url = 'http://localhost:8080/api/users'
            const data = {
                'name':modalName,
                'email':modalId,
                'password':modalPassword,
                'repeat_password':modalPasswordCheck
            }
            axios({
                url:url,
                method:'POST',
                data:data
            })
                .then((res)=>{
                    clearState();
                    setCreateModalIsOpen(false);
                    props.getCreateUserModalStatus(false)
                    props.onLoadUser()
                }).catch((error)=>{
                    console.error(error)
                    setErrorModalIsOpen(true)
                })
            // 서비스 추가 필요 - START
        }
    }

    function getErrorModalStatus(status){
        setErrorModalIsOpen(status)
    }

    function clearState(){
        setModalId('')
        setModalPassword('')
        setModalPasswordCheck('')
        setModalName('')
        setValidationId(false)
        setValidationIdText('')
        setValidationPassword(false)
        setValidationPasswordText('')
        setValidationCheckPassword(false)
        setValidationCheckPasswordText('')
        setValidationName(false)
        setValidationNameText('')
    }

    /**
     * 모달스타일
     */
    const modalStyle = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 10,
        },
        content: {
            display: "flex",
            justifyContent: "center",
            background: "white",
            overflow: "auto",
            top: "20%",
            left: "30%",
            right:"30%",
            bottom:"20%",
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10,
        },
    };

    return(
        <Modal
            isOpen={createModalIsOpen}
            style={modalStyle}
            ariaHideApp={false}
        >
            <React.Fragment>
                <div className={"row w-full"}>
                    {/*상단 사용자생성 및 X박스 - START*/}
                    <div className={"col-12"}>
                        <div className={'row'}>
                            <div className={'col-9'}>
                                <b>사용자 생성</b>
                            </div>
                            <div className={'col-3 textAlignRight'}
                                 id={'xMark'}
                                 onMouseOver={() => {window.document.getElementById("xMark").style.cursor = "pointer";}}
                                 onMouseLeave={() => {window.document.getElementById("xMark").style.cursor = "default";}}
                                 onClick={()=>{
                                     setCreateModalIsOpen(false);
                                     props.getCreateUserModalStatus(false)
                                     clearState();
                                 }}
                            >
                                <FontAwesomeIcon icon={faXmark} className={"ft40"} />
                            </div>
                        </div>
                    </div>
                    {/*상단 사용자생성 및 X박스 - END*/}
                    {/*가운데 콘텐츠영역 - START*/}
                    <div className={'col-12'}>
                        {/*아이디 - START*/}
                        <div className={'row'}>
                            <div className={'col-12'}><b>아이디</b><span className={'col-red'}>*</span></div>
                            <div className={'col-12'}>
                                <input
                                    className={'createInputStyle'}
                                    id={'modalId'}
                                    name={'modalId'}
                                    value={modalId}
                                    onChange={(event)=>{
                                        setModalId(event.target.value)
                                        setValidationId(false)
                                    }}
                                />
                                <div className={validationId?'task-tooltip':'hidden'}>{validationIdText}</div>
                            </div>
                        </div>
                        {/*아이디 - END*/}
                        {/*비밀번호 - START*/}
                        <div className={'row mgt25'}>
                            <div className={'col-12'}><b>비밀번호</b><span className={'col-red'}>*</span></div>
                            <div className={'col-12'}>
                                <input
                                    className={'createInputStyle'}
                                    id={'modalPassword'}
                                    name={'modalPassword'}
                                    value={modalPassword}
                                    type={'password'}
                                    placeholder={'영문,숫자,특수문자 조합 8~15자 입력가능'}
                                    onChange={(event)=>{
                                        setModalPassword(event.target.value)
                                        setValidationPassword(false)
                                    }}
                                />
                                <div className={validationPassword?'task-tooltip':'hidden'}>{validationPasswordText}</div>
                            </div>
                        </div>
                        {/*비밀번호 - END*/}
                        {/*비밀번호 확인 - START*/}
                        <div className={'row mgt25'}>
                            <div className={'col-12'}><b>비밀번호 확인</b><span className={'col-red'}>*</span></div>
                            <div className={'col-12'}>
                                <input
                                    className={'createInputStyle'}
                                    id={'modalPasswordCheck'}
                                    name={'modalPasswordCheck'}
                                    value={modalPasswordCheck}
                                    type={'password'}
                                    onChange={(event)=>{
                                        setModalPasswordCheck(event.target.value)
                                        setValidationCheckPassword(false)
                                    }}
                                />
                                <div className={validationCheckPassword?'task-tooltip':'hidden'}>{validationCheckPasswordText}</div>
                            </div>
                        </div>
                        {/*비밀번호 확인 - END*/}
                        {/*이름 - START*/}
                        <div className={'row mgt25'}>
                            <div className={'col-12'}><b>이름</b><span className={'col-red'}>*</span></div>
                            <div className={'col-12'}>
                                <input
                                    className={'createInputStyle'}
                                    id={'modalName'}
                                    name={'modalName'}
                                    value={modalName}
                                    onChange={(event)=>{
                                        setModalName(event.target.value)
                                        setValidationName(false)
                                    }}
                                />
                                <div className={validationName?'task-tooltip':'hidden'}>{validationNameText}</div>
                            </div>
                        </div>
                        {/*이름 - END*/}
                    </div>
                    <div className={'border-bottom'}></div>
                    {/*가운데 콘텐츠영역 - END*/}
                    {/*하단 취소,생성 버튼 - START*/}
                    <div className={'col-12 mgt25 mgb-10'} style={{textAlign:'center'}}>
                    <button
                        className={"createModalCancel"}
                        onClick={()=> {
                        setCreateModalIsOpen(false);
                        props.getCreateUserModalStatus(false)
                        clearState();
                    }}>취소</button>
                        <button
                            className={"createModalCreate"}
                            onClick={()=> {
                            //생성추가
                                checkValidation();
                        }}>생성</button>
                    </div>
                    {/*하단 취소,생성 버튼 - END*/}
                </div>
            </React.Fragment>
            <ErrorModal errorModalIsOpen={errorModalIsOpen} getErrorModalStatus={getErrorModalStatus}/>
        </Modal>
    )
}

export default CreateUserModal;
