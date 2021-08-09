import React, { useState, useEffect } from 'react';
import { Button, notification } from "antd";
import queryString from "query-string";
import { withRouter } from "react-router-dom"
import Modal from "../../../components/Modal";
import PostList from "../../../components/Admin/Blog/PostList";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from '../../../components/Admin/Blog/AddEditPostForm';
import { getPostsApi } from "../../../api/post";
import "./Blog.scss";
function Blog(props) {
  const { location, history } = props
  const [modalTitle, setModalTitle] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reloadPosts, setReloadPosts] = useState(false)
  const { page=1 } =queryString.parse(location.search);

  useEffect(() => {
      getPostsApi(3, page).then(response => {
        if(response?.code !== 200){
          notification["warning"]({
            message: response.message
          })
        }else{
          setPosts(response.post);
        }
      }).catch(() => {
        notification["error"]({
          message: "Error del Servidor",
          placement: "bottomRight"
        });
      });
      setReloadPosts(false);
  }, [page, reloadPosts]);

  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear Post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={null}/>)
  }
  const editPost = post => {
    setIsVisibleModal(true);
    setModalTitle("Editando Post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={post}/>
    );
  }

  if(!posts){
    return <h2>Not Found</h2>;
  }

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button
          type="primary"
          onClick={addPost}>
            Nuevo Post
          </Button>
      </div>
      <PostList
        posts={posts}
        setReloadPosts={setReloadPosts}
        editPost={editPost}
        />
      <Pagination
        location={location}
        history={history}
        posts={posts}/>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
        children={modalContent}/>
    </div>
  )
}
export default withRouter(Blog);