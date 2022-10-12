import React, { FunctionComponent } from 'react'
import { stateTypes } from '../pages/History'

const ArgumentDrawer: FunctionComponent<{
    dataToView?: stateTypes
}> = ({ dataToView }) => {
    return (
        <div>
            <div>
                <u>What the other person said:</u>  {dataToView?.whatSaid}
            </div>
            <div>
                <u>What you said:</u>  {dataToView?.whatYouSaid}
            </div>
            <div>
                <u>Were you respectful, how was your attitude ?:</u>  {dataToView?.didYouAck}
            </div>

            <div>
                <u>How did the other person feel ?: </u>   {dataToView?.howDidOtherFeel}
            </div>

            <div>
                <u>How can you revise your response:</u>  {dataToView?.howCanRevise}
            </div>
        </div>
    )
}

export default ArgumentDrawer