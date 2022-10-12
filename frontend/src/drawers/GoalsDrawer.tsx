import React, { FunctionComponent } from 'react'
import { stateTypes } from '../pages/History'

const GoalsDrawer: FunctionComponent<{
    dataToView?: stateTypes
}> = ({ dataToView }) => {
    return (
        <div>
            <div>
                <u>Goal:</u>  {dataToView?.goal}
            </div>
            <div>
                <u> Specifics:</u>  {dataToView?.specifics}
            </div>
            <div>
                <u> Measure:</u>  {dataToView?.measure}
            </div>

            <div>
                <u>Archivable: </u>   {dataToView?.archivable}
            </div>

            <div>
                <u> Timebound:</u>  {dataToView?.timebound}
            </div>
        </div>
    )
}

export default GoalsDrawer