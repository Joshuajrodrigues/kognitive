import React, { FunctionComponent } from 'react'
import { stateTypes } from '../pages/History'

const CbrDrawer: FunctionComponent<{
    dataToView?: stateTypes
}> = ({ dataToView }) => {
    return (
        <div>
            <div>
                <u>Mood:</u>  {dataToView?.feelBefore}
            </div>
            <div>
                <u> Emotions:</u>  {dataToView?.emotions?.map((emotion) => (
                    <span className="tags">
                        {emotion + ' '}
                    </span>
                ))}
            </div>
            <div>
                <u> Elaboration:</u>  {dataToView?.elaboration}
            </div>
            {
                dataToView?.gratitudeThoughts &&
                <div>
                    <u> Gratitude thoughts: </u>   {dataToView?.gratitudeThoughts}
                </div>
            }
            {
                dataToView?.negativeThoughts &&
                <div>
                    <u> Negative thoughts:</u>  {dataToView?.negativeThoughts}
                </div>
            }
            {
                dataToView?.thoughtDistortions && dataToView?.thoughtDistortions?.length > 0 &&
                <div>
                    <u>Thought distortions: </u>   {dataToView?.thoughtDistortions?.map((distortion) => (
                        <span className="tags">
                            {distortion}
                        </span>
                    ))}
                </div>
            }

            {
                dataToView?.challengeNegative &&
                <div>
                    <u> Challenge Negatives:</u> {dataToView?.challengeNegative}
                </div>
            }
            {
                dataToView?.reinterpretNegative &&
                <div>
                    <u> Reinterpreting Negative:</u>   {dataToView?.reinterpretNegative}
                </div>
            }
        </div>
    )
}

export default CbrDrawer