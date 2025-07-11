import { Flex, VStack, Field as ChakraField, Input, Button, Box } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toErrorMap } from "../../utils/toErrorMap";
// import {withApollo} from "../../utils/withApollo";
import { useChangePasswordMutation } from "../../graphql/generated/graphql";


const ChangePassword: NextPage/*<unknown, unknown>*/ = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState<string | undefined>();
  return(
      <Flex bg="gray.100"  justify="center" h="980px" >
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={ async (values) => {
            const response = await changePassword({ 
              variables: { 
                newPassword: values.newPassword, 
                token: typeof router.query.token === "string" ? router.query.token : ""
              }});
            if(response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              setTokenError(errorMap.token)
            } else {
              router.push("/");
            }
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box bg="white" p={6} rounded="md" w={80} h="auto" mt={240}>
                <VStack gap={10} align="flex-start">
                  <ChakraField.Root invalid={!!errors.newPassword && touched.newPassword}>
                    <ChakraField.Label>New password</ChakraField.Label>
                    <Field
                      as={Input}
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      variant="subtle"
                      validate={(value: any) => {
                        let error;

                        if (value.length < 3) {
                          error = "Password must contain at least 3 characters";
                        }
                        return error;
                      }}
                    />
                    <ChakraField.ErrorText>{errors.newPassword}</ChakraField.ErrorText>
                  </ChakraField.Root>
                  {tokenError ? <Box color="red">{tokenError}</Box> : null}
                  <Button type="submit" colorPalette="teal" width="full" loading={ isSubmitting }>
                    Change Password
                  </Button>
                </VStack>
              </Box>
            </form>
          )}
        </Formik>
    </Flex>
  );
}

export default /*withApollo({ssr: false})(*/ChangePassword//);