import React, { FunctionComponent } from 'react'
import { Session } from '@supabase/supabase-js'
import useUser from '../../hooks/useUser';
import { Text } from '@chakra-ui/react';
const Welcome:FunctionComponent<{

}> = () => {
  const user = useUser((state) => state.user);
  return (

      <Text ml={4} mt={4}>
         Welcome,{user.user?.user_metadata.name ||"Anon"}
      </Text>
  )
}

export default Welcome