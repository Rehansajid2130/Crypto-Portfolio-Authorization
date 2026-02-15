import { Button, Center, Container, Icon, Stack ,Text} from '@chakra-ui/react'
import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const ResetPasswordAlert = () => {
  return (
   <Container>
    <Center w={'full'} h={"100vh"} alignItems={'center'} justifyContent={'center'}>
       <Stack alignItems={"center"}  borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"} p={"50px 0px 40px 0px"} width={"488px"} gap={5}>
        <Icon as={FaCircleCheck} w={"44px"} h={"44px"} sx={{
                            path: {
                                fill: "#059669",
                            },
                        }}/>
        <Text as= "h1" fontSize={22} fontWeight={500} alignItems={"center"} >Password Reset Done</Text>
        <Text as="p"w={"80%"} fontSize={"14px"} color={"#797E82"} display={'flex'} justifyContent={"center"}>Now you can access you account. </Text>
        <Stack w={"full"} alignItems={'center'}>

        <Link to="/signin" style={{
            width:"80%"
        }} >
        <Button color={'white'} bgColor={"#5F00D9"} w={'100%'}>Sign in</Button>
        </Link>
        </Stack>
       </Stack>
    </Center>
   </Container>
  )
}

export default ResetPasswordAlert