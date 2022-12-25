import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-js-pagination";
import styled from 'styled-components'

const Campaign = (props) =>{
    const[campaignData,setCampaignData]=useState([]);
    const[buttonDisabled,setButtonDisabled] = useState(false);
    const[activePage,setActivePage] = useState(1);

    /**
     * 캠페인 관리의 테이블 영역을 만듬
     */
    useEffect(()=>{
        let _campaignData = [];
        props.campaignContents.content.map((item,index)=>{
            _campaignData.push(
                <tr key={index}>
                    <td className={'textAlignCenter'}><div style={{height:'27px'}}><Switch onChange={()=>{props.changeEnabled(item)}} checked={item.enabled} disabled={buttonDisabled}/></div></td>
                    <td className={'textAlignLeft'}>{item.name}</td>
                    <td className={'textAlignRight'}>{setComma(item.impressions)}</td>
                    <td className={'textAlignRight'}>{setComma(item.clicks)}</td>
                    <td className={'textAlignRight'}>{Math.floor(Number(setComma(item.ctr)).toFixed(2)*100)+'%'}</td>
                    <td className={'textAlignRight'}>{setComma(item.video_views)}</td>
                    <td className={'textAlignRight'}>{Math.floor(Number(setComma(item.vtr)).toFixed(2)*100)+'%'}</td>
                </tr>
            )
        })
        setCampaignData(_campaignData)
    },[props.campaignContents,buttonDisabled])

    /**
     * 헤더의 셀렉트영역의 값 변경에 따라 사용자를 hidden처리함
     */
    useEffect(()=>{
        if(props.headerData.selectedOption=='admin'||props.headerData.selectedOption=='manager'){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[props.headerData.selectedOption])

    /**
     * 숫자에 콤마를 찍기위한 함수
     */
    function setComma(value){
        return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * 페이지네이션이 변경될때 변경된 값을 세팅하고, 해당값을 넘겨 페이지 재조회
     */
    function handlePageChange(pageNumber){
        setActivePage(pageNumber)
        props.onLoadCampaign(pageNumber)
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
        <div>
            <div className={"textAlignLeft mgt10"}><h4 className={"mgl20"}>{props.titleText}</h4></div>
            <div className={"borderTop"} style={{minHeight:props.tableHeight}}>
                <table className={'w-full textAlignLeft borderBottom table-border'} style={{tableLayout:'fixed', borderCollapse:'collapse'}}>
                    <colgroup>
                        <col width="5%" style={{minWidth:'100px'}}/>
                        <col width="20%"/>
                        <col width="15%"/>
                        <col width="15%"/>
                        <col width="15%"/>
                        <col width="15%"/>
                        <col width="15%"/>
                    </colgroup>
                    <thead>
                    <tr className={'colorGray'}>
                        <th className={'textAlignCenter'}>상태</th>
                        <th className={'textAlignLeft'}>캠페인 목적</th>
                        <th className={'textAlignRight'}>노출수</th>
                        <th className={'textAlignRight'}>클릭수</th>
                        <th className={'textAlignRight'}>CTR</th>
                        <th className={'textAlignRight'}>동영상조회수</th>
                        <th className={'textAlignRight'}>VTR</th>
                    </tr>
                    {campaignData}
                    </thead>
                </table>
            </div>
            <div className={'justify-content-center'}>
                <div style={{display:'inline-flex'}}>
                    <PaginationBox>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={25}
                        totalItemsCount={props.campaignContents.total_elements}
                        pageRangeDisplayed={4}
                        onChange={handlePageChange}

                    />
                    </PaginationBox>
                </div>
            </div>
        </div>
    )


}

export default Campaign;
