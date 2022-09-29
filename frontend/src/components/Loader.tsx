import React from 'react'
import { FunctionComponent } from "react";
import { CircleNotch } from "phosphor-react";
export const Loader:FunctionComponent <{color?:string}> = ({color}) => {
  return (
 <CircleNotch color={color||"#fff"} size={32}>
    <animate
      attributeName="opacity"
      values="0;1;0"
      dur="4s"
      repeatCount="indefinite"
    ></animate>
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      dur="5s"
      from="0 0 0"
      to="360 0 0"
      repeatCount="indefinite"
    ></animateTransform>
  </CircleNotch>
  )
}
