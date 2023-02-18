import { Box, Container, Text } from '@chakra-ui/react'

export const VoteManual = () => (
    <Box display='flex' justifyContent='center' alignItems='center' >
        <Container maxW='2xl' bg='white' centerContent>
            <Box padding='4' bg='white' color='black' maxW='md'>
                <Text fontSize={'3xl'} fontWeight={700}>
                    投票マニュアル<br />
                </Text>
                マニュアルだよ。マニュアルだよ。マニュアルだよ。<br />
                マニュアルだよ。マニュアルだよ。マニュアルだよ。<br />
                マニュアルだよ。マニュアルだよ。マニュアルだよ。<br />
                マニュアルだよ。マニュアルだよ。マニュアルだよ。
            </Box>
        </Container>
    </Box>
)

VoteManual.defaultProps = {
    
}
