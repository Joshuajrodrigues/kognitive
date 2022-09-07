import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../helper/supabaseClient'
import { CbtFormType } from '../../hooks/useCbtForm'
import useUser from '../../hooks/useUser'
import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);
const History = () => {
    const user = useUser((state) => state.user)
    const [data, setData] = useState<CbtFormType[]>([])

    const fetchUserData = async () => {
        await supabase
            .from('cbtForm')
            .select("*")
            .range(0, 9)
            .eq('user_id', user.user?.id)
            .then((response) => {
                console.log("user data", { data });
                {/* @ts-ignore */ }
                setData(response.data)
            })
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
                    <Tbody>
                        {
                            data && data?.length > 0 && data?.map((dataItem) => (
                                <Tr>
                                    <Td>{dataItem.feelBefore}</Td>
                                    <Td>{dayjs.utc(dataItem.created_at).local().format("MMM D, YYYY h:mm A")}</Td>

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