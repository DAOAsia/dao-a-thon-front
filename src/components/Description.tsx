import { Box, Container } from '@chakra-ui/react'

export const Describe = () => (
    <Box display='flex' justifyContent='center' alignItems='center' >
        <Container maxW='2xl' bg='white' centerContent>
            <Box padding='4' bg='white' color='black' maxW='md'>
            This NFT serves as a ticket to the "DAO-A-THON 1st" event and also functions as a voting right for determining the "most outstanding idea about DAO" during the event. The holder of this NFT can access the event and participate in the voting process to determine the best idea related to DAO. This NFT is recorded on the blockchain, providing a secure and immutable ticket that cannot be altered or replicated. Furthermore, the NFT's unique properties allow it to be owned indefinitely, making it a valuable souvenir for the holder even after the event.
            </Box>
        </Container>
    </Box>
)

Describe.defaultProps = {
    
}
