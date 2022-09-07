import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../helper/supabaseClient'
import { CbtFormType } from '../../hooks/useCbtForm'
import useUser from '../../hooks/useUser'
import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { DeleteIcon } from '@chakra-ui/icons'
dayjs.extend(utc);
const History = () => {
    const user = useUser((state) => state.user)
    const [data, setData] = useState<CbtFormType[]>([])
    const toast = useToast()
    const fetchUserData = async () => {
        await supabase
            .from('cbtForm')
            .select("*")
            .range(0, 9)
            .eq('user_id', user.id)
            .then((response) => {
                console.log("user data", { data });
                {/* @ts-ignore */ }
                setData(response.data)
            })
    }
    const handleDelete=async(id?:string)=>{
        try {
            
            await supabase
            .from('cbtForm')
            .delete()
            .eq('id',id)
            .then(async()=>{
            
                   await fetchUserData()
                    toast({
                        title: "Entry deleted.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                
            })
        } catch (error) {
            toast({
                title: "An error occured.",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <>
            <TableContainer>
                <Table variant={"striped"} colorScheme={"purple"}>
                    <Thead>
                        <Tr>
                            <Th>Mood</Th>
                            <Th>Created on</Th>

                        </Tr>
                    </Thead>
                    <Tbody >
                        {
                            data && data?.length > 0 && data?.map((dataItem) => (
                                <Tr>
                                    <Td>{dataItem.feelBefore}</Td>
                                    <Td>{dayjs.utc(dataItem.created_at).local().format("MMM D, YYYY h:mm A")}</Td>
                                    <Td><IconButton onClick={()=>handleDelete(dataItem.id)} colorScheme={"red"} icon={<DeleteIcon />} aria-label={'Delete entry'} /> </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default History