import s from './WelcomePage.module.css'


import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'



export const WelcomePage = () => {
  const [queryParameters] = useSearchParams()
  // const [url, setUrl] = useState('')
  // fetch('https://t.me/i/userpic/320/BmM7sbyj1BXJ7SZryVhvp-3SByGojYQPAHZUlYT9Btc.jpg')
  // .then(response => response.blob())
  // .then(blob => {
  //   setUrl(URL.createObjectURL(blob));
  // });
  
  return (
    <div className={s.root}>
      <h1>Hello {queryParameters.get("username")}, welcome to our website!</h1>
      {/* {url && <img src={url}></img>} */}
    </div>
  );
}

