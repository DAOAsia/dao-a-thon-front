import { Box, Container, Text } from '@chakra-ui/react'

export const Describe = () => (
    <Container maxW='2xl' bg='#f6a429' centerContent>
        <Box padding='4' bg='white' color='black' maxW='md'>
            NFTのユーティリティの説明<br />
            説明します。説明します。説明します。<br />
            説明します。説明します。説明します。<br />
            説明します。説明します。説明します。<br />
            説明します。説明します。説明します。<br />
            説明します。説明します。説明します。
        </Box>
    </Container>
)

Describe.defaultProps = {
    title: '説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。説明します。\n',
    title2: 'NFTのユーティリティの説明',
}
