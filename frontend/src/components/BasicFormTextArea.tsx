import { Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { FunctionComponent } from "react";
const BasicFormTextArea: FunctionComponent<{
    fieldValue?: string,
    title: string,
    placeHolder?: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}> = ({ fieldValue, onChange, title, placeHolder }) => {
    return (
        <>  <Text color={"purple.500"} fontWeight={"semibold"}>
            {title}
        </Text>
            <Textarea
                autoFocus
                placeholder={placeHolder}
                value={fieldValue}
                onChange={(e) => onChange(e)}
                color={"purple.600"}
                mt={4}
                height={"sm"}
            /></>
    )
}

export default BasicFormTextArea