import CircularGalleryRenderer from './CircularGalleryRenderer'

const CircularGallery = () => {
    return (
        <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <CircularGalleryRenderer
                bend={9}
                textColor="#000"
                borderRadius={0.05}
                scrollEase={0.02}
                scrollSpeed={1.5}
            />
        </div>
    )
}

export default CircularGallery