import React, { useEffect, useState } from "react";
import axios from "axios";
import Campaign from '../components/campaign'
import User from '../components/user'
import ErrorModal from "../components/errorModal";

const Content = (props) =>{
    const [tableHeight,setTableHeight] = useState(window.innerHeight-177);
    const [titleText,setTitleText] = useState('캠페인 관리')
    const [campaignContents,setCampaignContents] = useState({ "content":[]})
    const [errorModalIsOpen,setErrorModalIsOpen] = useState(false)

    useEffect(()=>{
        //캠페인관리 서비스호출
        onLoadCampaignFirst();
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions)
    },[])

    useEffect(()=>{
        if(props.headerData.selectedTab=="campaign"){
            setTitleText('캠페인 관리')
        }else if(props.headerData.selectedTab=="user"){
            setTitleText('사용자 관리')
        }
    },[props])

    const updateWindowDimensions = () => {
        const newHeight = window.innerHeight;
        setTableHeight(newHeight-177);
    }

    function onLoadCampaignFirst() {
        //서비스 추가시 주석처리 - START
        setCampaignContents({
            "content":[
            {
                "id":1,
                "name":"캠페인1",
                "enabled":true,
                "campaign_objective":"WEBSITE_TRAFFIC",
                "impressions":384057,
                "clicks":1974,
                "ctr":0.8752,
                "video_views":948,
                "vtr":0.95123
            },
            {
                "id":2,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":3,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },
            {
                "id":4,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":5,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },{
                "id":6,
                "name":"캠페인1",
                "enabled":true,
                "campaign_objective":"WEBSITE_TRAFFIC",
                "impressions":384057,
                "clicks":1974,
                "ctr":0.8752,
                "video_views":948,
                "vtr":0.95123
            },
            {
                "id":7,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":8,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },
            {
                "id":9,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":10,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },{
                "id":11,
                "name":"캠페인1",
                "enabled":true,
                "campaign_objective":"WEBSITE_TRAFFIC",
                "impressions":384057,
                "clicks":1974,
                "ctr":0.8752,
                "video_views":948,
                "vtr":0.95123
            },
            {
                "id":12,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":13,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },
            {
                "id":14,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":15,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },{
                "id":16,
                "name":"캠페인1",
                "enabled":true,
                "campaign_objective":"WEBSITE_TRAFFIC",
                "impressions":384057,
                "clicks":1974,
                "ctr":0.8752,
                "video_views":948,
                "vtr":0.95123
            },
            {
                "id":17,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":18,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },
            {
                "id":19,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":20,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },{
                "id":21,
                "name":"캠페인1",
                "enabled":true,
                "campaign_objective":"WEBSITE_TRAFFIC",
                "impressions":384057,
                "clicks":1974,
                "ctr":0.8752,
                "video_views":948,
                "vtr":0.95123
            },
            {
                "id":22,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":23,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            },
            {
                "id":24,
                "name":"캠페인2",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":705575,
                "clicks":6726,
                "ctr":0.8733,
                "video_views":40,
                "vtr":0.135
            },
            {
                "id":25,
                "name":"캠페인3",
                "enabled":true,
                "campaign_objective":"LEAD",
                "impressions":538086,
                "clicks":1171,
                "ctr":0.3833,
                "video_views":512,
                "vtr":0.2512
            }
        ],
            "size": 25,
            "total_elements": 51,
            "total_pages": 3,
            "number":0
        })
        //서비스 추가시 주석처리 - END

        // 서비스 추가시 주석 해제 - START
        const url = 'http://localhost:8080/api/campaigns'
        axios({
            url:url,
            method:'get',
            params:{
                page:1,
                size:25
            }
        })
            .then((res)=>{
                setCampaignContents(res['content'])
            }).catch((error)=>{
                console.error(error)
                setErrorModalIsOpen(true)
            })
        // 서비스 추가시 주석 해제 - END
    }

    function onLoadCampaign(pageNumber) {
        //서비스 추가시 주석처리 - START
        setCampaignContents({
            "content":[
                {
                    "id":26,
                    "name":"캠페인1",
                    "enabled":true,
                    "campaign_objective":"WEBSITE_TRAFFIC",
                    "impressions":384057,
                    "clicks":1974,
                    "ctr":0.8752,
                    "video_views":948,
                    "vtr":0.95123
                },
                {
                    "id":27,
                    "name":"캠페인2",
                    "enabled":true,
                    "campaign_objective":"LEAD",
                    "impressions":705575,
                    "clicks":6726,
                    "ctr":0.8733,
                    "video_views":40,
                    "vtr":0.135
                },
                {
                    "id":28,
                    "name":"캠페인3",
                    "enabled":true,
                    "campaign_objective":"LEAD",
                    "impressions":538086,
                    "clicks":1171,
                    "ctr":0.3833,
                    "video_views":512,
                    "vtr":0.2512
                },
                {
                    "id":29,
                    "name":"캠페인2",
                    "enabled":true,
                    "campaign_objective":"LEAD",
                    "impressions":705575,
                    "clicks":6726,
                    "ctr":0.8733,
                    "video_views":40,
                    "vtr":0.135
                },
                {
                    "id":30,
                    "name":"캠페인3",
                    "enabled":true,
                    "campaign_objective":"LEAD",
                    "impressions":538086,
                    "clicks":1171,
                    "ctr":0.3833,
                    "video_views":512,
                    "vtr":0.2512
                }
            ],
            "size": 5,
            "total_elements": 51,
            "total_pages": 3,
            "number":1
        })
        //서비스 추가시 주석처리 - END

        // 서비스 추가시 주석 해제 - START
        const url = 'http://localhost:8080/api/campaigns'
        axios({
            url:url,
            method:'get',
            params:{
                page:pageNumber,
                size:25
            }
        })
            .then((res)=>{
                setCampaignContents(res['content'])
            }).catch((error)=>{
                console.error(error)
                setErrorModalIsOpen(true)
            })
        // 서비스 추가시 주석 해제 - END
    }

    function changeEnabled(item){
        // 서비스 추가시 주석해제 - START
        const url ='http://localhost:8080/api/campaigns/'+item.id
        axios.patch(url)
            .then((res)=>{
                // onLoadCampaign();
            }).catch((error)=>{
                console.error(error)
                setErrorModalIsOpen(true)
            })
        //서비스 추가시 주석해제 - END

        //서비스 추가시 주석처리 - START
        let newData = JSON.parse(JSON.stringify(campaignContents));
        newData.content.map((data=>{
            if(item.id==data.id){
                data.enabled==true?data.enabled=false:data.enabled=true
            }
        }))
        setCampaignContents(newData)
        //서비스 추가시 주석처리 - END
    }

    function getErrorModalStatus(status){
        setErrorModalIsOpen(status)
    }

    return(
        <React.Fragment>
            <ErrorModal errorModalIsOpen={errorModalIsOpen} getErrorModalStatus={getErrorModalStatus}/>
            {props.headerData.selectedTab=='campaign'?<Campaign tableHeight={tableHeight} titleText={titleText} campaignContents={campaignContents} headerData={props.headerData} changeEnabled={changeEnabled} onLoadCampaign={onLoadCampaign}/>:<></>}
            {props.headerData.selectedTab=='user'?<User tableHeight={tableHeight} titleText={titleText} headerData={props.headerData}/>:<></>}
        </React.Fragment>
    )
}
export default Content;
