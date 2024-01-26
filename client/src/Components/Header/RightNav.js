import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';

function RightMenu(props) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
        .then(response => {
            if (response.status === 200) {
            dispatch(logoutUser());
            navigate("/login");
            } else {
            alert('Log Out Failed');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
            alert('Log Out Failed');
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="mail">
              <a href="/login">Sign in</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="/register">Sign up</a>
            </Menu.Item>
          </Menu>
        )
      } else {
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="upload">
              <a href="/video/upload">Video</a>
            </Menu.Item>
            <Menu.Item key="logout">
              <a onClick={logoutHandler}>Logout</a>
            </Menu.Item>
          </Menu>
        )
      }
    }

export default RightMenu;