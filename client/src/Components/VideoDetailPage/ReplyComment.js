import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [moreCommentCnt, setMoreCommentCnt] = useState(0);
    const [openReqlyComment, setOpenReplyComment] = useState(false)
    
    useEffect(() => {
        let commentNumber = 0;
        
        props.commentList.map(e => {
            if (e.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })

        setMoreCommentCnt(commentNumber)
    }, [props.commentList])

    const renderReplyComment = (parentCommentId) => {
        return props.commentList.map(commentList => {
            return <React.Fragment key={commentList._id}>
                {commentList.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFn={props.refreshFn} comment={commentList} videoId={props.videoId} />
                        <ReplyComment commentList={props.commentList} videoId={props.videoId} parentCommentId={commentList._id} refreshFn={props.refreshFn}/>
                    </div>
                }
            </React.Fragment>
        })
    };

    const onHandleChange = () => {
        console.log("test")
        setOpenReplyComment(!openReqlyComment)
        console.log(openReqlyComment)
    };

  return (
    <div>
        {moreCommentCnt > 0 && 
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                View {moreCommentCnt} more comment(s)
            </p>
        }
        {openReqlyComment &&
            renderReplyComment(props.parentCommentId)
        }
        
        
    </div>
  )
}

export default ReplyComment