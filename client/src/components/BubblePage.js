import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";


  const getColors = () => {
    return axiosWithAuth()
    .get("/api/colors")
    .then(res => {return res.data})
    .catch(err => console.log(err.response))
  }
const BubblePage = () => {
  const [colorList, setColorList] = useState([]);


  useEffect(() =>{
    getColors()
    .then(res =>{
      setColorList(res)
    });
  },[])
  console.log(colorList)

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export {BubblePage, getColors};
