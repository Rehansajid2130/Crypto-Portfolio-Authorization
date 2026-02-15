import { Button, Center, Container, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';


const ForgetSuccess = () => {
    const {email} = useParams()
    const decodedEmail = decodeURIComponent(email);
    console.log(decodedEmail);

    return (
        <Container>
            <Center w={'full'} h={"100vh"} alignItems={'center'} justifyContent={'center'}>
                <Stack alignItems={"center"} borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"} p={"50px 0px 40px 0px"}>
                    <Stack>

                        <Icon as={FaCircleCheck} w={"44px"} h={"44px"} sx={{
                            path: {
                                fill: "#059669",
                            },
                        }} />
                    </Stack>
                    <Text as="h1" fontSize={20} fontWeight={500}>Successfully Sent</Text>
                    <Text as="p" w={"80%"} fontSize={"14px"} color={"#797E82"}>We have sent instructions on how to reset your password to <Text as={"span"} color={"black"}>
                       {email}</Text>  Please follow the instructions from the email.</Text>
                </Stack>
            </Center>
        </Container>
    )
}

export default ForgetSuccess