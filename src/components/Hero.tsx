import { Box, Button } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Box display='flex' justifyContent='center' alignItems='center' py={'3'}>
    <Button
      as={'a'}
      display={{ base: 'none', md: 'inline-flex' }}
      width={'150px'}
      shadow={"md"}
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={'#F17C1D'}
      href={'#'}
      _hover={{
        bg: '#F9BC30',
      }}>
      faucetサイト
    </Button>
  </Box>
)

Hero.defaultProps = {
  title: 'NFT無料',
}
