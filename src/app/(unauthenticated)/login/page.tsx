import LoginForm from "@/components/LoginForm";
import { Box } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Box marginTop={{ base: "10vh", lg: "40vh", xl: "35vh" }}>
      <LoginForm />
    </Box>
  );
}
