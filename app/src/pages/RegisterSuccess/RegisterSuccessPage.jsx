import { Button, Center, Container, Icon, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { useQuery } from 'react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { verifyusermail } from '../../api/Query/userQuery';


const RegisterSuccess = () => {

    const toast = useToast();   
     const navigate = useNavigate();


    const { token } = useParams()
    console.log(token);

    const { isSuccess, isLoading } = useQuery({
        queryKey: ["verify-email-token"],
        queryFn: () => verifyusermail({ token }),

        enabled: !!token,
        onError: (error) => {
            toast({
                title: "Verification Error",
                description: error.message,
                status: "error"

            })
            navigate("/signup");
        },
        onSuccess: navigate("/ResetPasswordAlert")
    })
    if(isLoading)
        return(
            <Center h={"100vh"}>
                <Spinner />
            </Center>
        )

    return (
        <Container>

            {isSuccess && (
                <Center w={'full'} h={"100vh"} alignItems={'center'} justifyContent={'center'}>
                    <Stack alignItems={"center"} borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"} p={"50px 0px 40px 0px"}>
                        <Icon as={FaCircleCheck} w={"44px"} h={"44px"} sx={{
                            path: {
                                fill: "#059669",
                            },
                        }} />
                        <Text as="h1" fontSize={20} fontWeight={500}>Successfully Registration</Text>
                        <Text as="p" w={"80%"} fontSize={"14px"} color={"#797E82"}>Hurray! You have successfully created your account. Enter the app to explore all it’s features.</Text>
                        <Stack w={"full"} alignItems={'center'}>

                            <Link to="/LoginPage" style={{
                                width: "80%"
                            }} >
                                <Button color={'white'} bgColor={"#5F00D9"} w={'100%'}>Enter the App</Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Center>

            )}
        </Container>
    )
}

export default RegisterSuccess