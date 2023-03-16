import s from './WelcomePage.module.css'


import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'



export const WelcomePage = () => {
  const [queryParameters] = useSearchParams()
  
  return (
    <div className={s.root}>
      <h1>Hello {queryParameters.get("username")}, welcome to our website!</h1>
    </div>
  );
}

