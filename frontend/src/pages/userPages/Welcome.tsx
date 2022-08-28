import React, { FunctionComponent } from 'react'
import { Session } from '@supabase/supabase-js'
const Welcome:FunctionComponent<{
    key:string,
    session:Session
}> = () => {
  return (
    <div>Welcome</div>
  )
}

export default Welcome