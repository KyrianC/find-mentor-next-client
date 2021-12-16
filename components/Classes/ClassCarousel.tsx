import { Box, Button, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Img } from '@chakra-ui/react'

type props = {
    video: string | null,
    images: {
        id: number,
        image: string,
        of_class: number
    }[]
}

const ClassCarousel = ({ video, images }: props): JSX.Element => {
    const maxIndex = images.length + (video ? 1 : 0) - 1
    const [index, setIndex] = React.useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const clickNext = () => setIndex(prevIndex => (
        prevIndex == maxIndex ? 0 : prevIndex += 1
    ))
    const clickPrev = () => setIndex(prevIndex => (
        prevIndex == 0 ? maxIndex : prevIndex -= 1
    ))

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='5xl' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <Img src={images[index].image} />
                </ModalContent>
            </Modal>
            <Box>
                {/* TODO custom minimal video player */}
                {video && (
                    <video
                        style={{ display: index == 0 ? 'block' : 'none', maxHeight: '400px', width: '100%' }}
                        controls
                    >
                        <source src={video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                        <source src="{video}" type='video/ogg; codecs="theora, vorbis"' />
                        Your browser does not support my HTML5 video player
                    </video>
                )}
                {images.map((img, i) => (
                    <Img
                        cursor='pointer'
                        onClick={onOpen}
                        objectFit='cover'
                        width='100%'
                        maxH='400px'
                        src={img.image}
                        key={img.id}
                        display={index == i ? 'block' : 'none'}
                    />
                ))}
            </Box>
            <Button onClick={clickNext}>Prev</Button>
            <Button onClick={clickPrev}>Next</Button>
        </>
    )
}

export default ClassCarousel
