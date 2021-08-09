import React from 'react';
import { List, Button, Modal, notification } from "antd";
import { EyeOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostApi } from "../../../../api/post";
import "./PostList.scss";

const { confirm } = Modal
export default function PostList(props) {
  const { posts, setReloadPosts, editPost } = props;
  const deletePost = post => {
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminando Post",
      content: `¿Estas Seguro que deseas eliminar el post: ${post.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostApi(token, post._id).then(response => {
          console.log(response);
          const typeNotification = response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message,
            placement: "bottomRight"
          });
          setReloadPosts(true);
        }).catch(err => {
          notification["error"]({
            message: err,
            placement: "bottomRight"
          });
        });
      }
    })

  }
  return (
    <div className="post-list">
      <List
        dataSource={posts.docs}
        renderItem={post => <Post post={post} deletePost={deletePost} editPost={editPost}/>}/>
    </div>
  )
}

function Post(props){
  //console.log(props.post);
  const { post, deletePost, editPost } = props;
  return(
    <List.Item
      actions={[
        <Link
          to={`/blog/${post.url}`}
          target="_blank">
        <Button
          type="primary"
          href={`http://localhost:3000/blog/${post.url}`}
          target="_blank">
            <EyeOutlined />
        </Button>
        </Link>
        ,
        <Button type="primary" onClick={ () => editPost(post) }>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={ () => deletePost(post) }>
        <DeleteFilled />
      </Button>
      ]
      }>
        <List.Item.Meta
          title={post.title}
        />
      </List.Item>
  );
}
