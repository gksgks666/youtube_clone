import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const videoId = props.videoId;
    const user = useSelector(state => state.user)
    const [comment, setComment] = useState('');

    const handleClick = (event) => {
        setComment(event.currentTarget.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const variable = {
            content: comment,
            writer: user.userData._id,
            videoId: videoId
        };

        axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
                props.refreshFn(response.data.resultData)
                setComment('');
            } else {
                alert("댓글을 저장하지 못했습니다.");
            }
        })
    }

  return (
    <div>
        <br/>
        <p>댓글 목록</p>
        <hr/>

        {props.commentList && props.commentList.map(commentList => {
            return commentList.responseTo ?
            '' :
            <React.Fragment key={commentList._id}>
                <SingleComment refreshFn={props.refreshFn} comment={commentList} videoId={videoId} />
                <ReplyComment parentCommentId={commentList._id}  videoId={videoId} commentList={props.commentList} refreshFn={props.refreshFn}/>
            </React.Fragment>
        })}


        <form style={{display:'flex'}} onSubmit={onSubmit} >
            <textarea
                style={{width:'100%', borderRadius:'5px'}}
                onChange={handleClick}
                value={comment}
                placeholder='댓글을 작성해 주세요.'
            />
            <br/>
            <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>작성</button>
        </form>
    </div>
  )
}

export default Comment