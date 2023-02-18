import { Box, Container } from '@chakra-ui/react'

export const Describe = () => (
    <Box display='flex' justifyContent='center' alignItems='center' >
        <Container maxW='2xl' bg='white' centerContent>
            <Box padding='4' bg='white' color='black' maxW='md'>
                NFTのユーティリティの説明<br />
                説明します。説明します。説明します。<br />
                説明します。説明します。説明します。<br />
                説明します。説明します。説明します。<br />
                説明します。説明します。説明します。<br />
                説明します。説明します。説明します。
            </Box>
        </Container>
    </Box>
)

Describe.defaultProps = {
    
}
