import React, { useEffect, useState } from 'react'
import Auth from '../../hoc/auth';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { Card, Avatar, Col, Typography, Row } from 'antd';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate('/register')
  }
  const navigateToLogin = () => {
    navigate('/login')
  }

  const [Video, setVideo] = useState([]);

  useEffect(() => {
    axios.get('/api/video/getvideos')
    .then(response => {
      if (response.data.success) {
        setVideo(response.data.video)
      } else {
        alert('비디오 가져오기에 실패했습니다.');
      }
    })
  }, [])

  const renderCards = Video.map((video, idx) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return <Col key={video._id} lg={6} md={8} xs={2}>
    <a href={`/video/${video._id}`}>
      <div style={{position:'relative'}}>
        <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
        <div className='duration'>
          <span>{minutes} : {seconds}</span>
        </div>
      </div>
    </a>
    <br/>
    <Meta 
      avatar={
        <Avatar src={video.writer.image} />
      }
      title={video.title}
      description=""
    />
    <span>{video.writer.name}</span> <br/>
    <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
  </Col>
  })

  return (
    <div style={{ width:'85%',marin: '3rem auto' }}>
      <Title level={2}>Recommended</Title>
      <hr/>
      <Row gutter={[32, 16]}>

        {renderCards}
        
      </Row>
    </div>
  )
}

export default Auth(LandingPage, null)


{/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
          <h2>시작 페이지</h2>
          <button onClick={navigateToRegister}>sign up</button>
          <button onClick={navigateToLogin}>sign on</button>

          
        </div> */}