import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tooltip, Icon } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

function LikeAndDislike(props) {
    const [like, setLike] = useState(0);
    const [likeAction, setLikeAction] = useState(null);
    const [dislike, setDislike] = useState(0);
    const [dislikeAction, setDisLikeAction] = useState(null);
    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId };
    } else {
        variable = { commentId: props.commentId, userId: props.userId };
    }

    useEffect(() => {
        axios.post('/api/like/getLike', variable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
                setLike(response.data.resultData.length)

                response.data.resultData.map(e => {
                    if (e.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('좋아요 정보를 가져오지 못했습니다.');
            }
        })

        axios.post('/api/like/getDislike', variable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
                setDislike(response.data.resultData.length)

                response.data.resultData.map(e => {
                    if (e.userId === props.userId) {
                        setDisLikeAction('disliked')
                    }
                })
            } else {
                alert('싫어요 정보를 가져오지 못했습니다.');
            }
        })
    }, [])

    const onLike = () => {
        if (likeAction === null) {
            axios.post('/api/like/upLike', variable)
            .then(response => {
                if (response.data.success) {
                    setLike(like + 1);
                    setLikeAction('liked');

                    if (dislikeAction !== null) {
                        setDisLikeAction(null);
                        setDislike(dislike - 1);
                    }
                } else {
                    alert('좋아요 누르기에 실패했습니다.');
                }
            })
        } else {
            axios.post('/api/like/unlike', variable)
            .then(response => {
                if (response.data.success) {
                    setLike(like - 1);
                    setLikeAction(null);
                } else {
                    alert('좋아요 내리기에 실패했습니다.');
                }
            })
        }
    };

    const onDislike = () => {
        if (dislikeAction === null) {
            axios.post('/api/like/upDislike', variable)
            .then(response => {
                if (response.data.success) {
                    setDislike(dislike + 1);
                    setDisLikeAction('disliked');

                    if (likeAction !== null) {
                        setLikeAction(null);
                        setLike(like - 1);
                    }
                } else {
                    alert('싫어요 누르기에 실패했습니다.');
                }
            })
        } else {
            axios.post('/api/like/unDislike', variable)
            .then(response => {
                if (response.data.success) {
                    setDislike(dislike - 1);
                    setDisLikeAction(null);
                } else {
                    alert('싫어요 내리기에 실패했습니다.');
                }
            })
        }
    }

  return (
    <div>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <LikeOutlined theme={likeAction === 'liked' ? 'filled' : 'outlined'} onClick={onLike} />
            </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {like} </span>
        </span>
        <span key="comment-basic-dislike">
            <Tooltip title="dislike">
                <DislikeOutlined theme={likeAction === 'disliked' ? 'filled' : 'outlined'} onClick={onDislike} />
            </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {dislike} </span>
        </span>
    </div>
  )
}

export default LikeAndDislike