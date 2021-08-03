import React, {useState, useEffect} from 'react';
import { Form, Input, Button, notification } from "antd";
import { KeyOutlined, GiftOutlined, DollarCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/courses";
import "./AddEditCourseForm.scss";
export default function AddEditCourseForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    course ? setCourseData(course) : setCourseData({});
  }, [course])
  const addCourse = () => {
    if(!courseData.idCourse){
      notification["warning"]({
        message: "EL ID del Curso es Obligatorio",
        placement: "bottomRight"
      })
    }else{
      const token = getAccessTokenApi();
      addCourseApi(token, courseData).then(response => {
        if(response.code === 200){
          notification["success"]({
            message: response.message,
            placement: "bottomRight"
          });
          setReloadCourses(true);
          setIsVisibleModal(false);
          setCourseData({});
        }else{
          notification["warning"]({
            message: response.message,
            placement: "bottomRight"
          })
        }
      }).catch(err => {
        notification["error"]({
          message: "Error del Servidor, Intente de Nuevo mas Tarde",
          placeholder: "bottomRight"
        });
        console.log(err);
      })
    }

  }
  const updateCourse = () => {
    if(!course){
      notification["warning"]({
        message: "EL ID del curso es obligatorio"
      })
    }else{
      const token = getAccessTokenApi();
      updateCourseApi(token, courseData, course._id).then(response => {
        if(response.code === 200){
          notification["success"]({
            message: response.message,
            placement: "bottomRight"
          });
          setReloadCourses(true);
          setIsVisibleModal(false);
          setCourseData({});
        }else{
          notification["warning"]({
            message: response.message,
            placement: "bottomRight"
          });
        }
      }).catch(err => {
        notification["error"]({
          message: "Error del Servidor, Intente de nuevo mas tarde"
        });
        console.log(err);
      });
    }
  }
  return (
    <div className="add-edit-course-form">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        setReloadCourses={setReloadCourses}
        courseData={courseData}
        setCourseData={setCourseData}/>
    </div>
  )
}
function AddEditForm(props){
  const { course, addCourse, updateCourse, setReloadCourses, courseData, setCourseData } = props;
  return(
    <Form className="form-add-edit" onFinish={course ? updateCourse: addCourse}>
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="ID del Curso"
          value={courseData.idCourse}
          onChange={(e)=>setCourseData({...courseData, idCourse: e.target.value})}
          disabled={course ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="Url del Curso"
          value={courseData.link}
          onChange={(e)=>setCourseData({...courseData, link: e.target.value})}/>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GiftOutlined />}
          placeholder="Cupon de Descuento"
          value={courseData.coupon}
          onChange={(e)=>setCourseData({...courseData, coupon: e.target.value})}/>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarCircleOutlined />}
          placeholder="Precio del Curso"
          value={courseData.price}
          onChange={(e)=>setCourseData({...courseData, price: e.target.value})}/>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit">
            {course ? "Actualizar Curso" : "Agregar Curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}
