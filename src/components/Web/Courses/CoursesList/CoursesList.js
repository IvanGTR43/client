import React, { useState, useEffect } from 'react';
import { Row, Col, Card, notification, Rate, Button} from "antd";
import { getCourseDataUdemyApi } from "../../../../api/courses";
import "./CoursesList.scss";
export default function CoursesList(props) {
  const { courses } = props;
  return (
    <div className="courses-list">
      <Row>
        
        {courses.map(course => (
          
          <Col md={8} key={course._id} className="courses-list__course">
            <CourseCard course={course}/>
          </Col>
        ) )}
      </Row>
    </div>
  )
}

function CourseCard(props){
  const { course } = props;
  const [courseInfo, setCourseInfo] = useState(null);
  const [urlCourse, setUrlCourse] = useState("");
  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse).then(response => {
      if(response?.code !== 200){
        notification["warning"]({
          message: response.message
        });
      }else{
        setCourseInfo(response);
        mountUrl(response.data.url);
      }
    }).catch(() => {
      notification["error"]({
        message: "Error del Servidor, intelo mas tarde",
        placement: "bottomRight"
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);
  const mountUrl = url => {
    if(!course.link){
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl = baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");
      setUrlCourse(finalUrl);
    }else{
      setUrlCourse(course.link);
    }
  }
  return(

    <a href={urlCourse} target="_balnk" rel="noopener noreferrer">
      {courseInfo && (
        <Card
        cover={<img src={courseInfo.data.image_480x270}/>}>
        <Card.Meta title={courseInfo.data.title} description={courseInfo.data.headline}/>
        <Button>Entrar En El Curso</Button>
        <div className="courses-list__course-footer">
          
          <span>
            {course.price ? `$ ${course.prece} ` : courseInfo.data.price}
          </span>
          <Rate disabled={true} defaultValue={5}/>
        </div>
      </Card>
      )}
      
    </a>
  );
}