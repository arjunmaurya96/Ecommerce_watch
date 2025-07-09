import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Spinner = ({ path = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((prevValue) => { --prevValue })
  //   }, 1000)
  //   count === 0 && navigate('/login')
  //   return () => clearInterval(interval)
  // }, [count, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => {
        if (prevValue <= 1) {
          clearInterval(interval);
          navigate(`/${path}`, {
            state: location.pathname
          });
          return 0;
        }
        return prevValue - 1;
      });
    }, 1000);
    // const interval = setInterval(() => {
    //   setCount((prevValue) => --prevValue)
    // }, 1000);
    // count === 0 && navigate('/login')

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);


  return (
    <>
      <div
        className="d-flex flex-colume justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className='text-center'> Redirecting to you in{count} second</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
