import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../../hoc/auth';
import axios from 'axios';
import { Row, Col, List, Avatar } from 'antd';
import SideVideo from './SideVideo';
import Subscribe from './Subscribe';
import Comment from './Comment';
import LikeAndDislike from './LikeAndDislike';

function VideoDetailPage() {
    const variable = {videoId: useParams().videoId}
    const [VideoDetail, setVideoDetail] = useState([]);
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
        .then(response => {
            if (response.data.success) {
                setVideoDetail(response.data.videoDetail)
            } else {
                alert("비디오 정보를 가져오기 실패했습니다.");
            }
        })

        axios.post('/api/comment/getComments', variable)
        .then(response => {
            if (response.data.success) {
                setAllComments(response.data.resultData)
            } else {
                alert("댓글 정보를 가져오기 실패했습니다.");
            }
        })
    }, [])

    const refreshFn = (newComment) => {
        setAllComments(allComments.concat(newComment))
    };

    if (VideoDetail.writer) {
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
        
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
        
                        <List.Item
                        actions={[<LikeAndDislike video userId={localStorage.getItem('userId')} videoId={variable.videoId}/>, subscribeButton]}>
                            <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer.image} />}
                            title={VideoDetail.writer.name}
                            description={VideoDetail.description}
                            />
                        </List.Item>
                        <Comment refreshFn={refreshFn} commentList={allComments} videoId={variable.videoId} />
                    </div>
                
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
            </Row>
          )
    } else {
        return (
            <div>...Loding</div>
        )
    }
}

export default Auth(VideoDetailPage, null)