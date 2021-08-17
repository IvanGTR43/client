import React, { useState, useEffect } from 'react';
import { Spin, List, notification } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../Pagination";
import { getPostsApi } from "../../../api/post";
import "moment/locale/es";
import "./PostListWeb.scss";
export default function PostListWeb(props) {
  const { location, history } =props;
  const [posts, setPosts] = useState([]);
  const {page = 1 } = queryString.parse(location.search);
  useEffect(() => {
    getPostsApi(3, page).then(response => {
      if(response?.code !== 200){
        notification["warning"]({
          message: response.message,
          placement: "bottomRight"
        });
      }else{
        setPosts(response.post);
      }
    }).catch( () => {
      notification["error"]({
        message: "Error del Servidor, intentelo mas tarde",
        placement: "bottomRight"
      })
    })
  }, [page]);
  if(!posts){
    return(
      <Spin
        tip="Cargando"
        style={{width: "100%", padding: "200px"}}/>
    )
  }
  return (
    <>
    <Helmet>
      <title>Blog de Programación | Ivan Gabriel Tacuapan Reyes</title>
    </Helmet>
    <div className="post-list-web">
      <h1>Blog</h1>
      <List
        dataSource={posts.docs}
        renderItem={post => <Post post={post}/>}
      />
      <Pagination
        posts={posts}
        location={location}
        history={history}
      />
    </div>
    </>
  )
}

function Post(props){
  const { post } = props;
  const day = moment(post.date).format("DD");
  const month = moment(post.date).format("MMMM");
  return(
    <List.Item className="post" key={post._id}>
      <div className="post__date">
        <span>{day}</span>
        <span>{month}</span>
      </div>
        <List.Item.Meta title={<Link to={`/blog/${post.url}`} >{post.title}</Link>}/>
    </List.Item>
  );

}
