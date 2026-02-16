import { Card, Center, Container, Box, Text, Stack, FormControl, Flex, Checkbox, Button, FormErrorMessage, useToast } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from "formik"
import { object, string, ref } from 'yup';
import { useMutation } from 'react-query';
import { UserSignIn } from '../../api/Query/userQuery';
import useAuth from '../../hooks/useAuth';

const loginValidationSchema = object({
    email: string().email("Email is invalid").required("Email is required"),
    password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

const Login = () => {

    const toast = useToast();
    const {login} = useAuth();

    const {isLoading ,mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: UserSignIn,
        onSuccess: (data)=>{
            const {token} = data; 
            if(token){
                login(token)
            }

        },
        onError:(error)=>{
            toast({
                title:"SignIn error",
                description: error.message,
                status: "error",
            })
        }
    })

    return (
        <Container w={"100wh"} h={"fit-content"} bgColor={"white"}>
            <Center w={"100wh"} h={"100vh"} >
                <Card w={"456px"} padding={7} borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"} gap={"25px"} display={'flex'}>

                    <Box><Text textStyle="h1" fontWeight={500} >Welcome to Crypto App</Text></Box>
                    <Box> <Text color={"#797E82"} fontSize={14}>Enter your credentials to access the account.</Text></Box>
                    <Formik
                        initialValues={{
                            email: "1test@gmail.com",
                            password: "123456",
                        }}
                        onSubmit={(values) => {
                           mutate({
                            email: values.email,
                            password: values.password
                           })
                        }}
                        validationSchema={loginValidationSchema}
                    >
                        {() => (
                            <Form>
                                <Stack fontSize={14}>

                                    <Stack spacing={5}>
                                        <Field name="email">
                                            {({ field, meta }) => (

                                                <FormControl isInvalid={!!(meta.error && meta.touched)} display={'flex'} flexDirection={"column"}>
                                                    <label htmlFor="Email">Email</label>
                                                    <input type="Email" placeholder='Enter your Email'
                                                        {...field}
                                                        style={{
                                                            border: "2px solid #EEEEF4", borderRadius: '8px'
                                                            , padding: '8px 10px 8px 10px'
                                                        }} /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="password">
                                            {({ field, meta }) => (

                                                <FormControl isInvalid={!!(meta.error && meta.touched)} display={'flex'} flexDirection={"column"}>
                                                    <label htmlFor="Password">Password</label>
                                                    <input type="Password" placeholder='Enter your Password'
                                                        {...field}
                                                        style={{
                                                            border: "2px solid #EEEEF4", borderRadius: '8px', padding: '8px 10px 8px 10px'
                                                        }} /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Stack display={'flex'}  flexDir={"row"} justify={"space-between"} >
                                            
                                                <Checkbox > <Text as={"span"} fontSize={14} >Remember me</Text> </Checkbox>

                            
                                            <Link to={"/ForgetPasswordPage"}>
                                            <Text as={"span"} fontSize={14} fontWeight={500} color={"#5F00D9"}> Forget Password?</Text>
                                            </Link>
                                        </Stack>
                                        <Button isLoading={isLoading} type='submit'>
                                           login
                                        </Button>
                                        <Link to={"/signup"} >
                                        <Button type='submit' bgColor={"#EEEEF4"} color={"black"} w={'full'} variant={'outline'} border={"0px"}>
                                        Create New Account
                                        </Button>
                                        </Link>
                                       
                                    </Stack>
                                </Stack>

                            </Form>
                        )}
                    </Formik>
                </Card>
            </Center>
        </Container>
    )
}

export default Login