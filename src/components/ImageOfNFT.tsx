import { Box, Image, } from '@chakra-ui/react'

export const ImgNFT = ({ imagesrc }: { imagesrc: string }) => (
    <Box boxSize={'lg'} my = {10} >
        <Image src={imagesrc} alt='DAO-A-THON NFT'/>    
    </Box>
)

ImgNFT.defaultProps = {
    imagesrc: 'https://prtimes.jp/i/77068/5/resize/d77068-5-2f9c9f0b1fea8e5f25e4-5.jpg',
}
