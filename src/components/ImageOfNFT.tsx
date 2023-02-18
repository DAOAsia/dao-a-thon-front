
export const ImgNFT = ({ imagesrc }: { imagesrc: string }) => (
    <div className="imgcenter">
        <img id="image" src={imagesrc}></img>
    </div>
)

ImgNFT.defaultProps = {
    imagesrc: 'https://prtimes.jp/i/77068/5/resize/d77068-5-2f9c9f0b1fea8e5f25e4-5.jpg',
}
