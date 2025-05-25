import "./Content.css";
import React from "react";
import ContentTop from '../../components/ContentTop/ContentTop';
import Heatmap from "../../my-map/Heatmap";
import Emergency from "../../my-emergency/Emergency";
import Contact from "../../my-contact/Contact";
import Enquiry from "../../my-enquiry/Enquiry";

const Content = (props) => {
  const [tab,setTab] = React.useState(props.main)
  React.useEffect(()=>{
    console.log(props.main)
    setTab(props.main)
  },[props])
  return (
    <div className='main-content'>
      <ContentTop />
      {(tab==0)?<div><Heatmap /></div>:(tab==1)?<div><Emergency /></div>:(tab==2)?<div><Enquiry /></div>:<div><Contact /></div>}
    </div>
  )
}

export default Content
