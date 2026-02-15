import { Card, Center, Container, Box, Text, Stack, FormControl,Button, FormErrorMessage, useToast, useQuery, Spinner } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from "formik"
import { object, string, ref } from 'yup';
import { verifyReset } from '../../api/Query/userQuery';
import { useMutation } from 'react-query';

const loginValidationSchema = object({
    password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
    repeatPassword: string().oneOf([ref("password")], "Password Must match").required("Repeat password must")
})
const  ResetPasswordForm = () => {

    const toast = useToast();   
    const navigate = useNavigate();


   const { token } = useParams()
   console.log(token);

   const { mutate } = useMutation({
       mutationKey: ["verify-New-Password"],
       mutationFn: verifyReset,

       enabled: !!token,
       onSettled:()=>{

           navigate("/ResetPasswordAlert")
       }, 
       onError: (error) => {
           toast({
               title: "Verification Error",
               description: error.message,
               status: "error"

           })
           navigate("/signin");
       },
   })
 

    return (
        <Container w={"100wh"} h={"fit-content"} bgColor={"white"}>
            <Center w={"100wh"} h={"100vh"}>
                <Card w={"456px"} padding={10} borderRadius={16} shadow={"0px 0px 16px 2px #0000001F;"}>

                    <Box><Text textStyle="h1" fontWeight={500} >Reset Password</Text></Box>
                    <Box> <Text color={"#797E82"} fontSize={14}>Enter your new password.</Text></Box>
                    <Formik
                        initialValues={{
                            password: "",
                            repeatPassword: "",
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                            
                            mutate({
                                token , password: values.password
                            })
                        }}
                        validationSchema={loginValidationSchema}>
                        {() => (
                            <Form >
                                <Stack fontSize={14} spacing={10}>

                                    <Stack spacing={7} >
                                        <Field name="password">
                                            {({ field, meta }) => (

                                                <FormControl isInvalid={!!(meta.error && meta.touched)} display={'flex'} flexDirection={"column"}>
                                                    <label htmlFor="password" fontWeight={"600px"}>New Password</label>
                                                    <input type="password" placeholder='Enter your New Password'
                                                        {...field}
                                                        style={{
                                                            border: "1px solid #EEEEF4", borderRadius: '8px'
                                                            , padding: '8px 10px 8px 10px'
                                                        }} /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="repeatPassword">
                                            {({ field, meta }) => (

                                                <FormControl isInvalid={!!(meta.error && meta.touched)} display={'flex'} flexDirection={"column"}>
                                                    <label htmlFor="repeatPassword">Repeat Password</label>
                                                    <input type="Password" placeholder='Repeat your New Password'
                                                        {...field}
                                                        style={{
                                                            border: "1px solid #EEEEF4", borderRadius: '8px', padding: '8px 10px 8px 10px'
                                                        }} /><FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                           <Button type='submit'bg={"#D8DDE2"} color={"#797E82"}  w={'full'} variant={'outline'}
                                        
                                            >
                                                Reset Password
                                            </Button>
                                

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

export default ResetPasswordForm