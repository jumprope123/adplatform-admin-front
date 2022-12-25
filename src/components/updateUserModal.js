import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ErrorModal from "./errorModal";

const UpdateUserModal = (props) =>{
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [modalId,setModalId]=useState('')
    const [modalName,setModalName]=useState('')

    const [validationName,setValidationName]=useState(false)
    const [validationNameText,setValidationNameText]=useState()

    const [errorModalIsOpen,setErrorModalIsOpen] = useState(false)

    useEffect(()=>{
        setModalId(props.updateRow.email)
        setModalName(props.updateRow.name)
    },[props.updateRow])

    useEffect(()=>{
        setUpdateModalIsOpen(props.updateModalIsOpen)
    },[props.updateModalIsOpen])


    //이름 정규식 체크
    function name_check(name){
        const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{1,16}$/;
        return reg.test(name)
    }

    function checkValidation(){

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
            !(modalName==null||modalName==''||modalName==undefined)
            &&(name_check(modalName))
        ){
            // 서비스 추가 필요 - START
            const url = 'http://localhost:8080/api/users/'+modalId
            const data = {
                'name':modalName,
            }
            axios({
                url:url,
                method:'PATCH',
                data:data
            })
                .then((res)=>{
                    clearState();
                    setUpdateModalIsOpen(false);
                    props.getUpdateUserModalStatus(false)
                    props.onLoadUser()
                }).catch((error)=>{
                    console.error(error)
                    setErrorModalIsOpen(true)})
            // 서비스 추가 필요 - END
        }
    }

    function clearState(){
        setModalId('')
        setModalName('')
        setValidationName(false)
        setValidationNameText('')
    }

    function getErrorModalStatus(status){
        setErrorModalIsOpen(status)
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
            top: "30%",
            left: "30%",
            right:"30%",
            bottom:"30%",
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10,
        },
    };

    return(
        <Modal
            isOpen={updateModalIsOpen}
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
                                     setUpdateModalIsOpen(false);
                                     props.getUpdateUserModalStatus(false)
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
                                    className={'createInputStyleDisabled'}
                                    id={'modalId'}
                                    name={'modalId'}
                                    value={modalId}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        {/*아이디 - END*/}
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
                    {/*하단 취소,저장 버튼 - START*/}
                    <div className={'col-12 mgt25 mgb-10'} style={{textAlign:'center'}}>
                    <button
                        className={"createModalCancel"}
                        onClick={()=> {
                        setUpdateModalIsOpen(false);
                        props.getUpdateUserModalStatus(false)
                        clearState();
                    }}>취소</button>
                        <button
                            className={"createModalCreate"}
                            onClick={()=> {
                            //저장추가
                                checkValidation();
                        }}>저장</button>
                    </div>
                    {/*하단 취소,저장 버튼 - END*/}
                </div>
                <ErrorModal errorModalIsOpen={errorModalIsOpen} getErrorModalStatus={getErrorModalStatus}/>
            </React.Fragment>
        </Modal>
    )
}

export default UpdateUserModal;
