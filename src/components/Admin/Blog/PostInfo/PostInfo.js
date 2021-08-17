import React, { useState, useEffect } from 'react';
import { Spin, notification } from "antd";
import moment from "moment";
import { Helmet } from "react-helmet"
import { getPostApi } from "../../../../api/post";
import "./PostInfo.scss";
import "moment/locale/es";
export default function PostInfo(props) {
  const { url } = props;
  const [postInfo, setPostInfo] = useState(null);
  useEffect(() => {
    getPostApi(url).then(response => {
      if(response?.code !== 200){
        notification["warning"]({
          message: response.message,
          placement: "bottomRight"
        });
      }else{
        setPostInfo(response.post);
      }
    }).catch(()=> {
      notification["error"]({
        message: "Error del Servidor, Intente de nuevo mas tarde",
        placement: "bottomRight"
      });
    });
  }, [url]);
  if(!postInfo){
    return <Spin  tip="Cargando..." style={{width: "100%", padding: "200px 0"}}/>
  }
  return (
    <>
      <Helmet>
        <title>{postInfo.title} | Ivan Gabriel Tacuapan Reyes </title>
      </Helmet>
      <div className="post-info">
        <h1 className="post-info__title">{postInfo.title}</h1>
        <div className="post-info__creation-date">
          {moment(postInfo.date).local("es").format("LL")}
        </div>
        <div className="post-info__description" dangerouslySetInnerHTML={{__html: postInfo.description}}/>
      </div>
    </>
  )
}
