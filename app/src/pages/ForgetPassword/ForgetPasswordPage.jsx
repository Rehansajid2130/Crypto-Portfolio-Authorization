import {Button, Center, Container, Icon, Stack, Text, useToast } from '@chakra-ui/react'
import { Field, Formik, Form } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { IoArrowBackOutline } from "react-icons/io5";
import { object, string } from 'yup';
import { useMutation } from 'react-query';
import { sendForgertMail } from '../../api/Query/userQuery';

const ForgetPasswordPage = () => {

    const forgetValidationSchema = object({
        email: string().email("Email is invalid ").required("Email is required")
    })


    const navigate = useNavigate()
    const toast = useToast();

    const [email, setEmail] = useState("")

    const {mutate , isloading } = useMutation({
        mutationKey: ["ForgetMail"],
        mutationFn: sendForgertMail,
        onSuccess: (_,{email})=>{
            console.log("Email before navigate:", email);
            navigate(`/forgot-success/${encodeURIComponent(email)}`)            
        },
        onError:(error)=>{
            toast({
                title:"Email verification error",
                description: error.message,
                status: "error",
            })
        },
    })
  

    return (
        <Container>
            <Center w={'full'} h={"100vh"}>
                <Stack borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"} p={"30px 0px 40px 40px"}>
                    <Stack w={'full'}>
                        <Link to={"/LoginPage"}>
                        <Icon as={IoArrowBackOutline} w={"20px"} h={"44px"} bgColor={"5F00D9"} color="#5F00D9"cursor={"pointer"} />
                        </Link>
                    </Stack>
                    <Text as="h1" fontSize={30} fontWeight={500}>Forget Password</Text>
                    <Text as="p" w={"80%"} fontSize={"14px"} color={"#797E82"}>Enter your email address for which account you want to reset your password.</Text>
                    <Formik
                        initialValues={
                            { email: ""}
                        }
                        onSubmit={(values) => {
                            setEmail((prev) => (prev = values.email))
                            mutate({email : values.email})
                        }}

                        validationSchema={forgetValidationSchema}
                    >
                        <Form style={{
        
                        }}>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                style={
                                    {
                                      border:"1px solid #EEEEF4",
                                      marginTop:"10px",
                                      marginBottom:"15px",
                                      padding:"5px",
                                      width:"85%",
                                      borderRadius:"8px"
                                    }
                                }
                            />
                            <Button isLoading= {isloading} type='submit' color={'black'} bgColor={"#EEEEF4"} w={'85%'}>Re-Sent Email</Button>
                        </Form>
                    </Formik>
                </Stack>
            </Center>
        </Container>
    )
}

export default ForgetPasswordPage