import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Subscribe(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribe, setSubscribe] = useState(false);


    useEffect(() => {
        let variable = {userTo: props.userTo};

        axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if (response.data.success) {
                setSubscribeNumber(response.data.subscribeNumber);
            } else {
                alert("구독자 수 정보를 받아오지 못했습니다.");
            }
        });

        let subscribedVariable = {userTo: props.userTo, userFrom: props.userFrom}

        axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.success)
                setSubscribe(response.data.subscribed)
            } else {
                alert('정보를 받아오지 못했습니다.');
            }
        })
    }, [])

    const onSubscribe = () => {
        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        };

        if (Subscribe) { //구독중일 경우
            axios.post('/api/subscribe/unsubscribe', subscribeVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setSubscribeNumber(SubscribeNumber - 1);
                    setSubscribe(!Subscribe)
                } else {
                    alert("구독 취소 실패했습니다.")
                }
            })
        } else { // 구독중이 아닐경우
            axios.post('/api/subscribe/subscribe', subscribeVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribe(!Subscribe)
                } else {
                    alert("구독을 실패했습니다.")
                }
            })
        }
    }

  return (
    <div>
        <button style={{backgroundColor: `${Subscribe ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px', color: 'white',
                        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
            onClick={onSubscribe}
        >
            {SubscribeNumber} {Subscribe ? 'Subscribed' : 'Subscribe'}
        </button>
    </div>
  )
}

export default Subscribe