import React, { FunctionComponent } from 'react'
import { stateTypes } from '../pages/History'

const WorriesDrawer: FunctionComponent<{
    dataToView?: stateTypes
}> = ({ dataToView }) => {
    return (
        <div>
            <div>
                <u>Current worry:</u>  {dataToView?.currentWorry}
            </div>
            <div>
                <u>Historical evidence against:</u>  {dataToView?.historical}
            </div>
            <div>
                <u>If not true then:</u>  {dataToView?.ifNotTrueThen}
            </div>

            <div>
                <u>If true then: </u>   {dataToView?.ifTrueThen}
            </div>

            <div>
                <u>Chances you will be ok:</u>  {dataToView?.future}
            </div>
        </div>
    )
}

export default WorriesDrawer