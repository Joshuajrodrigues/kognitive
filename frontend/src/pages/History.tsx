import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { supabase } from '../helper/supabaseClient'
import { CbtFormType } from '../hooks/useCbtForm'
import useUser from '../hooks/useUser'
import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { DeleteIcon } from '@chakra-ui/icons'
import { useToast } from '../hooks/useToast'
import BackButton from '../components/BackButton'
import { appRoutes } from '../AppConstants'
import { Link } from 'react-router-dom'
dayjs.extend(utc);
const History = () => {
    const user = useUser((state) => state.user)
    const [data, setData] = useState<CbtFormType[]>([])
    const { toast } = useToast()
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
    const handleDelete = async (id?: string) => {
        try {

            await supabase
                .from('cbtForm')
                .delete()
                .eq('id', id)
                .then(async () => {

                    await fetchUserData()
                    toast.success("Entry deleted.")


                })
        } catch (error) {
            toast.error("An error occured.")

        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <div className='history-page'>
            <div className='history-table-container'>

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
                                    <Td><IconButton onClick={() => handleDelete(dataItem.id)} colorScheme={"red"} icon={<DeleteIcon />} aria-label={'Delete entry'} /> </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>

            </div>
            <Link style={{ "margin": "12px" }} className="outline-button" to={appRoutes.root}>
                Back
            </Link>

        </div>
    )
}

export default History