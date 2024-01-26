import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findBoard } from '../../_actions/board_action';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if (response.data.success) {
        navigate('/login')
      } else {
        alert('로그아웃 실패했습니다')
      }
    })
  }

  const boards = useSelector(state => state.board.findBoardData.boardInfo); // state에서 필요한 부분만 가져오기

 /*  useEffect(async () => {
    async function() {
      try{
        await dispatch(findBoard())
      } catch (err) {
        console.error('Error fetching boards:', err);
      }
  }
  },[]) */


 /*  const createHandler = () => {

  }; */

  return (
    <div>Home
      <button onClick={logoutHandler}>로그아웃</button><br/>
      <button /* onClick={createHandler} */>만들기</button>
      {/* <ul>
        {boards.map(e => (
          <li key={e._id}>{e.title}{e.content}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default Home