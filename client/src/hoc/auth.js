import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function(SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                if (!response.payload.isAuth) {
                    if (option) {
                        navigate('/')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if (option === false) {
                            navigate('/')
                        }
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}