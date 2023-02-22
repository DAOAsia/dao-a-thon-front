import { Box, Container } from '@chakra-ui/react'

export const Describe = () => (
    <Box display='flex' justifyContent='center' alignItems='center' >
        <Container maxW='2xl' bg='white' centerContent>
            <Box padding='4' bg='white' color='black' maxW='md'>
                NFT's utility<br />
                I described something. I described something.<br />
                I described something. I described something.<br />
                I described something. I described something.<br />
                I described something. I described something.
            </Box>
        </Container>
    </Box>
)

Describe.defaultProps = {
    
}
