import SignupForm from "@/components/SignupForm";
import { Box } from "@chakra-ui/react";

export default function SignupPage() {
  return (
    <Box marginTop={{ base: "3vh", lg: "40vh", xl: "30vh" }}>
      <SignupForm />
    </Box>
  );
} 
