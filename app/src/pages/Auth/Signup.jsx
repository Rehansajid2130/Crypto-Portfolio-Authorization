import { Card, Center, Container, Box, Text, Stack, FormControl, Flex, Checkbox, Button, FormErrorMessage,useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from "formik"
import { object, string, ref} from 'yup';
import { useMutation, useQuery } from 'react-query';
import { Usersignup } from '../../api/Query/userQuery';



const signupValidationSchema = object({
        name:string().required("Name is required"),
        surname:string().required("Surname is required"),
        email:string().email("Email is invalid").required("Email is required"),
        password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
        repeatPassword:string().oneOf([ref("password")], "Password Must match").required("Repeat password must")
    })

const Signup = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const toast = useToast()

    const { mutate , isLoading } = useMutation({
        mutationKey: ["signup"],
        mutationFn: Usersignup,
        onSuccess:(data)=> {
            if(email !== "")
            {
                navigate(`/sent-verification-mail${email}`)
            }
            console.log(data.email);
            },
        onError:(error)=>{
            toast({
                title:"signup error",
                description: error.message,
                status: "error",
            })
        }
    })

    return (
        <Container w={"100wh"} h={"fit-content"}>
            <Center w={"100wh"} h={"100vh"}>
                <Card w={"456px"} padding={10}  borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"}>
                    <Box><Text textStyle="h1" fontWeight={500} >Welcome to Crypto App</Text></Box>
                    <Box> <Text color={"#797E82"} fontSize={14}>Create a free account by filling data below.</Text></Box>
                    <Formik
                        initialValues={{
                            name: "",
                            surname: "",
                            email:"",
                            password: "",
                            repeatPassword: ""
                        }}
                        onSubmit={(values) => {
                            setEmail(values.email)
                            mutate({
                                firstName :values.name,
                                lastName :values.surname,
                                email : values.email, 
                                password:values.password
                            })
                        }}
                        validationSchema = {signupValidationSchema}
                    >
                        {() => (
                            <Form>
                                <Stack fontSize={14} spacing={5}>
                                    <Flex gap={4} mt={4}>
                                        <Field name="name">
                                            {({ field, meta }) => (

                                                <FormControl isInvalid={!!!(meta.error && meta.touched
                                                )}>
                                                    <label htmlFor="name">Name</label>
                                                    <input type="name" placeholder='Enter your name'

                                                        {...field}
                                                        style={{
                                                            border: "2px solid grey", borderRadius: '6px'
                                                            , width: "100%", padding: '8px 10px 8px 10px'
                                                        }}
                                                    /> <FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="surname">
                                            {({ field, meta }) => (

                                                <FormControl isInvalid={!!!(meta.error && meta.touched
                                                )}>
                                                    <label htmlFor="surname">Surname</label>
                                                    <input type="text" placeholder='Enter your surname'
                                                        {...field}
                                                        style={{
                                                            border: "2px solid grey", borderRadius: '6px'
                                                            , width: "100%", padding: '8px 10px 8px 10px'
                                                        }}
                                                    /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Flex>
                                    <Stack spacing={5}>
                                        <Field name="email">
                                            {({field , meta}) =>(
                                                <FormControl isInvalid= {!!( meta.error && meta.touched)} display={'flex'} flexDirection={"column"}>
                                            <label htmlFor="Email">Email</label>
                                            <input type="Email" placeholder='Enter your Email'
                                            {...field}
                                                style={{
                                                    border: "2px solid grey", borderRadius: '6px'
                                                    , padding: '8px 10px 8px 10px'
                                                }} /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                        </FormControl>
                                            )}
                                                </Field>
                                                <Field name="password">
                                            {({field , meta}) =>(

                                                <FormControl isInvalid= {!!(meta.error && meta.touched)} display={'flex'} flexDirection={"column"}>
                                            <label htmlFor="Password">Password</label>
                                            <input type="Password" placeholder='Enter your Password'
                                               {...field}
                                               style={{
                                                    border: "2px solid grey", borderRadius: '6px', padding: '8px 10px 8px 10px'
                                                }} /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                        </FormControl>
                                            )}
                                                </Field>
                                                <Field name="repeatPassword">
                                                    {({field , meta})=>(

                                                        <FormControl isInvalid={!!(meta.error && meta.touched)} display={'flex'} flexDirection={"column"}>
                                            <label htmlFor="repeatPassword">Repeat Password</label>
                                            <input type="Password" placeholder='Enter your Password'
                                            {...field}
                                            style={{
                                                border: "2px solid grey", borderRadius: '6px', padding: '8px 10px 8px 10px'
                                            }} /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                        </FormControl >
                                        )}
                                                </Field>
                                        <Checkbox>I agree with <Text color={"#5F00D9"}
                                            as={"span"}
                                        >Terms & Conditions</Text>.</Checkbox>
                                        <Button type='submit' isLoading={isLoading}>
                                        Create Account
                                        </Button>
                                        <Text>Already have an account? <Link to="/LoginPage"> <Text as={"span"} color={"#5F00D9"} >
                                            Login</Text> </Link></Text>
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

export default Signup