// import { type JSX } from "react";

// import {
//   Button,
//   Card,
//   Field,
//   Input,
//   Stack,
//   Text,
//   Heading,
//   Box,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

// interface SignupFormProps {
//   formData: SignupFormData; // this is the actual values the user is inputting
//   errors: SignupFormErrors; //  object with error messages
//   onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // runs when inputs change
//   onBlur: (e: React.FocusEvent<HTMLInputElement>) => void; // runs when you blur out of an input
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // runs when form is submitted
// }

// const SignupForm = ({
//   formData,
//   errors,
//   onInputChange,
//   onBlur,
//   onSubmit,
// }: SignupFormProps): JSX.Element => {
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minH="50vh"
//       p={4}
//     >
//       <form onSubmit={onSubmit}>
//         <Card.Root maxW="sm" w="full" p={6}>
//           <Card.Header>
//             <Heading size="md">Join the Fridgy fam!</Heading>
//             <Text fontSize="sm" color="gray.500">
//               Sign up with your email and password below
//             </Text>
//           </Card.Header>

//           <Card.Body>
//             <Stack gap={4}>
//               <Field.Root>
//                 <Field.Label>Email</Field.Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={onInputChange}
//                   onBlur={onBlur}
//                   required
//                 />
//                 {errors.email && (
//                   <Text color="red.500" fontSize="sm">
//                     {errors.email}
//                   </Text>
//                 )}
//               </Field.Root>

//               <Field.Root>
//                 <Field.Label>Password</Field.Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={onInputChange}
//                   onBlur={onBlur}
//                   required
//                 />

//                 {errors.password && (
//                   <Text color="red.500" fontSize="sm">
//                     {errors.password}
//                   </Text>
//                 )}
//               </Field.Root>

//               <div>
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   id="agreeToTerms"
//                   checked={formData.agreeToTerms || false}
//                   onChange={onInputChange}
//                   onBlur={onBlur}
//                 />
//                 <label htmlFor="agreeToTerms">
//                   Agree to the terms and conditions
//                 </label>
//                 {errors.agreeToTerms && <p>{errors.agreeToTerms}</p>}
//               </div>

//               {/* <Field.Root>
//                 <Flex align="center" gap={2}>
//                   <Checkbox.Root
//                     id="agreeToTerms"
//                     name="agreeToTerms"
//                     isChecked={formData.agreeToTerms || false}
//                     // value={formData.agreeToTerms || false}
//                     onChange={onInputChange} // this line of code is erroring, not sure if it should be value...
//                   />
//                   <Checkbox.HiddenInput />
//                   <Checkbox.Control />
//                   <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
//                 </Flex>

//                 {errors.agreeToTerms && (
//                   <Text color="red.500" fontSize="sm" mt={1}>
//                     {errors.agreeToTerms}
//                   </Text>
//                 )}
//               </Field.Root> */}
//             </Stack>
//           </Card.Body>

//           <Card.Footer flexDirection="column" alignItems="flex-start" gap={3}>
//             <Button type="submit" variant="solid" w="full">
//               Submit
//             </Button>
//             <Text fontSize="sm">
//               Already have an account?{" "}
//               <Link to="/auth/login" style={{ color: "#3182ce" }}>
//                 Login
//               </Link>
//             </Text>
//           </Card.Footer>
//         </Card.Root>
//       </form>
//     </Box>
//   );
// };

// export default SignupForm;
