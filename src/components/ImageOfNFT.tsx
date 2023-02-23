
export const ImgNFT = ({ imagesrc }: { imagesrc: string }) => (
    <div className="imgcenter">
        <a href="https://testnets.opensea.io/ja/assets/mumbai/0xf2D242721111497806a0ea644E738F182BCE407B"><img id="image" src={imagesrc}></img></a>
    </div>
)

ImgNFT.defaultProps = {
    imagesrc: 'https://prtimes.jp/i/77068/5/resize/d77068-5-2f9c9f0b1fea8e5f25e4-5.jpg',
}
