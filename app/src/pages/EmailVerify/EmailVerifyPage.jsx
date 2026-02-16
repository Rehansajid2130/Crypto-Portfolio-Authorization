import { Button, Center, Container, Icon, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { IoMdMail } from "react-icons/io";
import { useMutation } from 'react-query';

import { useParams } from 'react-router-dom';
import { sendVerificationMail } from '../../api/Query/userQuery';


const EmailVerifyPage = () => {
  const { email } = useParams()


  const toast = useToast();

  const { mutate, isloading } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: sendVerificationMail,
    onSettled: (data) => {
      console.log(data);

    },
    onError: (error) => {
      toast({
        title: "Email verification error",
        description: error.message,
        status: "error",
      })
    }, enabled: !!email,
  })

  useEffect(() => {
    mutate({ email })
  }, [email])

  if (email === "")
    return <Center h={"100vh"}>invalid mail</Center>

  return (
    <Container>
      <Center w={'full'} h={"100vh"} alignItems={'center'} justifyContent={'center'}>
        <Stack alignItems={"center"} borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"} p={"50px 0px 40px 0px"}>
          <Icon as={IoMdMail} w={"44px"} h={"44px"} bgColor={"5F00D9"} color="#5F00D9" />
          <Text as="h1" fontSize={20} fontWeight={500}>Email Verification</Text>
          <Text as="p" w={"80%"} fontSize={"14px"} color={"#797E82"}>We have sent you an email verification to <Text as={"span"} fontWeight={600}>
            {email}
          </Text>
            . If you didn’t receive it, click the button below.</Text>
          <Button color={'black'} bgColor={"#EEEEF4"} w={'85%'}
            onClick={() => {
              mutate({ email })
            }}
            isloading={isloading}
          >Re-Sent Email</Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default EmailVerifyPage