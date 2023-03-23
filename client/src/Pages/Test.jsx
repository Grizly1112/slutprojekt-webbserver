import React, { useEffect, useState } from 'react'
import { GetImgTest } from '../api/user'

export default function Test() {
    const [img, setImg] = useState("");

    useEffect(() => {
        GetImgTest().then(res => {
            console.log(res.data)
            setImg(res.data.myFile)
        }) 
    },[])
  
  
    return (
    <div>
      <img src={img} alt="" />
    </div>
  )
}
