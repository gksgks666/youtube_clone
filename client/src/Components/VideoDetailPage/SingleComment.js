import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Button, Input } from 'antd';
import { Comment } from '@ant-design/compatible';
import axios from 'axios';
import LikeAndDislike from './LikeAndDislike';

function SingleComment(props) {
  const user = useSelector(state => state.user)
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const onClickReply = () => {
    setOpenReply(!openReply)
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value)
  };

   const onSubmit = (event) => {
     event.preventDefault();

    const variable = {
        content: commentValue,
        writer: user.userData._id,
        videoId: props.videoId,
        responseTo: props.comment._id
    };

    axios.post('/api/comment/saveComment', variable)
    .then(response => {
        if (response.data.success) {
            props.refreshFn(response.data.resultData)
            setCommentValue('');
            setOpenReply(false);
        } else {
            alert("답글을 저장하지 못했습니다.");
        }
    })
  };

  const actions = [
    <LikeAndDislike userId={localStorage.getItem('userId')} commentId={props.comment._id} />,
    <span onClick={onClickReply} key="comment-basic-reply-to">답글 달기</span>
  ];

  return (
    <div>
        <Comment 
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} />}
        content={props.comment.content}
        />


        {openReply && <form  style={{display:'flex'}} onSubmit={onSubmit} >
            <textarea
                style={{width:'100%', borderRadius:'5px'}}
                onChange={onHandleChange}
                value={commentValue}
                placeholder='답글을 작성해 주세요.'
            />
            <br/>
            <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >작성</button>
        </form>}
        
    </div>
  )
}

export default SingleComment