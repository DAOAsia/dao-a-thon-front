import { Flex, Text } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Flex
    height="15vh"
    paddingBottom="20px"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Text fontSize="6vw" as='b'>{title}</Text>
  </Flex>
)

Hero.defaultProps = {
  title: 'NFT無料',
}
