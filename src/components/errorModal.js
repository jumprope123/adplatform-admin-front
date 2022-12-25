import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-modal';
import "bootstrap/dist/css/bootstrap.min.css";


const ErrorModal = (props) =>{
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

    useEffect(()=>{
        setErrorModalIsOpen(props.errorModalIsOpen)
    },[props.errorModalIsOpen])


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
            top: "37%",
            left: "35%",
            right:"35%",
            bottom:"37%",
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10,
        },
    };

    return(
        <Modal
            isOpen={errorModalIsOpen}
            style={modalStyle}
            ariaHideApp={false}
        >
            <React.Fragment>
                <div className={"row w-full"}>
                    {/*가운데 내용 - START*/}
                    <div className={'col-12'}>
                        <div>
                            <div>에러가 발생했습니다.</div>
                            <div>같은 현상이 반복되면 고객센터로 문의 바랍니다.</div>
                        </div>
                        <div className={'mgt25'}>
                            <div>※고객센터</div>
                            <div>-email: helpdesk@wisebirds.ai</div>
                        </div>
                    </div>
                    {/*가운데 콘텐츠영역 - END*/}
                    {/*하단 취소,저장 버튼 - START*/}
                    <div className={'col-12 mgt25 mgb-10'} style={{textAlign:'right'}}>
                        <button
                            className={"createModalCreate"}
                            onClick={()=> {
                                setErrorModalIsOpen(false);
                                props.getErrorModalStatus(false)
                        }}>확인</button>
                    </div>
                    {/*하단 취소,저장 버튼 - END*/}
                </div>
            </React.Fragment>
        </Modal>
    )
}

export default ErrorModal;
