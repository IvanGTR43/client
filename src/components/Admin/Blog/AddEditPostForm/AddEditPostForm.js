import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/post";
import "./AddEditPostForm.scss";
export default function AddEditPostForm(props) {

  const { setReloadPosts, setIsVisibleModal, post } = props;

  const [postData, setPostData] = useState({});
  useEffect(() => {
    post ? setPostData(post) : setPostData({});
  }, [post]);

  const processPost = () => {
    const { title, url, date, description } = postData;
    if(!title || !url || !date || !description){
      notification["warning"]({
        message: "Todos los Campos son Obligatorios",
        placement: "bottomRight"
      });
    }else{
      if(!post){
        addPost(postData);
      }else{
        updatePost(postData);
      }
    }
    
  }

  const addPost = (data) => {
    const token = getAccessTokenApi();
    addPostApi(token, data).then(response => {
      const type = response?.code !== 200 ? "warning" : "success";
      notification[type]({
        message: response.message,
        placement: "bottomRight"
      });
      setIsVisibleModal(false);
      setReloadPosts(true);
      setPostData({});

    }).catch(() => {
      notification["error"]({
        message: "Error del Servidor, intentelo mas tarde",
        placement: "bottomRight"
      });
    });
  }
  const updatePost = (post) => {
    const token = getAccessTokenApi();
    updatePostApi(token, post._id, post).then(response => {
      if(response?.code !== 200){
        notification["warning"]({
          message: response.message,
          placement: "bottomRight"
        });
      }else{
        notification["success"]({
          message: response.message,
          placement: "bottomRight"
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      }
    }).catch(()=> {
      notification["error"]({
        message: "Error del Servidor, Inténtelo mas tarde",
        placement: "bottomRight"
      });
    });
  }
  return (
    <div className="add-edit-post-form">
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}/>
    </div>
  )
}

function AddEditForm(props){
  const { postData, setPostData, post, processPost } = props;
  const editorRef = useRef(null);
  return(
    <Form
      className="add-edit-post-form"
      layout="inline"
      onFinish={processPost}
      >
      <Row
        gutter={24}>
          <Col span={8}>
            <Input
              prefix={<FontSizeOutlined />}
              placeholder="titulo"
              value={postData.title}
              onChange={ e => setPostData({...postData, title: e.target.value})}
            />
          </Col>
          <Col span={8}>
            <Input
              prefix={<LinkOutlined />}
              placeholder="url"
              value={postData.url}
              onChange={ e => setPostData({...postData, url: transformTextToUrl(e.target.value)})}
            />
          </Col>
          <Col span={8}>
            <DatePicker
              style={{width: "100%"}}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder="Fecha de Publicacion"
              showTime={{defaultValue: moment("00:00:00", "HH:mm:ss")}}
              value={ postData.date && moment(postData.date)}
              onChange={(e, value) => setPostData({...postData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()})}
              // onOk={}
            />
          </Col>
      </Row>
      <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         value={postData.description ? postData.descrciption : ""}
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
         onBlur={e => setPostData({...postData, description: e.target.getContent()})}
       />
       <Button
        type="primary"
        htmlType="submit"
        className="btn-submit">
          {post ? "Actualizar Post" : "Agregar Post"}
       </Button>
    </Form>
  );
}

function transformTextToUrl(text){
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}