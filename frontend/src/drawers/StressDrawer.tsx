import React, { FunctionComponent } from 'react'
import { stateTypes } from '../pages/History'

const StressDrawer: FunctionComponent<{
    dataToView?: stateTypes
}> = ({ dataToView }) => {
    return (
        <div>
            <div>
                <u>Stress info:</u>  {dataToView?.stressInfo}
            </div>
            <div>
                <u>Source of stress:</u>  {dataToView?.source}
            </div>
            <div>
                <u>
                    What stress is telling you:
                </u> {dataToView?.cause}
            </div>
            <div>
                <u>What is within your control:</u>  {dataToView?.isWithinControl}
            </div>

            <div>
                <u>What is out of your control: </u>   {dataToView?.isOutOfControl}
            </div>

            <div>
                <u>What you can do to reduce:</u>  {dataToView?.canDoToReduce}
            </div>
        </div>
    )
}

export default StressDrawer