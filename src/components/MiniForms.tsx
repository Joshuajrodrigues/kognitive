import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const MiniForms: FunctionComponent<{
    svg: string,
    formName: string,
    goto: string
}> = ({ svg, formName, goto }) => {
    return (
        <Link to={goto} className='mini-form'>
            <div className="lottie-container">
                <img src={svg} alt="" className="hero-image" />
            </div>
            <div>
                {formName}
            </div>
        </Link>
    )
}

export default MiniForms