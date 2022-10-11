import React, { FunctionComponent } from 'react'
interface MoodTableType {
    [key: string]: number
}
const MoodGraph: FunctionComponent<{
    datasource: MoodTableType
}> = ({ datasource }) => {
    console.log(Object.values(datasource), "ddd");

    return (
        <div className='mood-stats-container'>
            <table>
                <caption>Your stats</caption>
                <thead>
                    <tr>
                        {
                            Object.getOwnPropertyNames(datasource).map((title) => (
                                <th>
                                    {title}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tr>
                    {
                        Object.values(datasource).map((count) => (
                            <th>
                                {count}
                            </th>
                        ))
                    }
                </tr>
            </table>
        </div>
    )
}

export default MoodGraph