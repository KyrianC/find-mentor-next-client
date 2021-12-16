import { ArrowRightIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Collapse, Flex, Container, Grid, Avatar, GridItem, Heading, Text, Button, Link } from "@chakra-ui/react"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import React from "react"
import ClassCarousel from "../../../components/Classes/ClassCarousel"
import RatingList from "../../../components/Classes/RatingList"


type classResponse = {
    "category": {
        "id": number
        "title": string,
        "slug": string,
        "description": string,
        "thumbnail": string,
        "created": string
        "updated": string
        "order": number,
        "parent_category": number
    },
    "title": string,
    "slug": string,
    "description": string,
    "teacher": {
        "username": string,
        "email": string,
        "is_teacher": boolean,
        "avatar": string | null
    },
    "basic_price": number,
    "video": string | null,
    "images": string[],
    "average_rating": number,
    "rating_count": number,
    "created": string,
    "updated": string,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:8000/api/classes/detail/${context.params?.class}/`)
    const data: classResponse = await res.json()
    return { props: { data } }
}

const Class: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const [show, setShow] = React.useState(false)

    const handleToggle = () => setShow(!show)
    return (
        <Container maxW="container.xl">
            <Heading as='h1' my='3'>{data.title} by {data.teacher.username}</Heading>
            <Grid
                templateColumns={['1fr', null, '4fr 2fr']}
                gap="20px"
            >
                <GridItem>
                    {/* TODO media carousel */}
                    <ClassCarousel images={data.images} video={data.video} />
                    <Box bgColor='gray.700' mt='4' p='4' borderRadius='md'>
                        <Flex flexDirection={['column', null, 'row']} alignItems='center'>
                            <Avatar
                                src={data.teacher.avatar}
                                boxSize='50px'
                                borderRadius='full'
                                alt={`${data.teacher.username}'s avatar`}
                            />
                            <Text my={['2', null, '0']} mx={['0', null, '4']} fontWeight='semibold' fontSize='lg'>{data.teacher.username}</Text>
                            {/* TODO add teacher description & link */}
                            <Text fontStyle='italic' fontSize='medium'>Some teacher description maybe teacher overall rating</Text>
                            <Button ml={['0', null, 'auto']}>See Profile</Button>
                        </Flex>
                    </Box>
                    <Box bgColor='gray.700' mt='4' p='4' borderRadius='md'>
                        <Heading as='h2' size='md'>Description</Heading>
                        <Collapse startingHeight={100} in={show}>
                            <Text py='3'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis lorem at orci accumsan gravida vitae eget justo. Nunc nec tincidunt velit. Nunc maximus, metus et vestibulum pellentesque, tortor felis iaculis mi, sit amet condimentum ante dui eu orci. Morbi vehicula nisl turpis. Mauris et metus nisi. Cras viverra odio ut turpis pellentesque, et vestibulum ante consequat. Nulla scelerisque massa at sollicitudin suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce elementum eros eu orci venenatis suscipit. Aliquam eleifend, ante sit amet dictum luctus, felis nibh scelerisque dui, eu porttitor arcu sem vitae orci. Pellentesque interdum id eros id lobortis. Suspendisse arcu nisl, consectetur nec egestas nec, tempor ut ex. Quisque accumsan metus turpis, sed laoreet nisi elementum sit amet. Mauris nec nulla magna. Fusce sem lorem, iaculis sed mauris id, ullamcorper hendrerit orci. Aenean elementum nisl nec nunc consequat, nec luctus nibh porttitor.
                            </Text>
                        </Collapse>
                        <Button size='sm' onClick={handleToggle} mt='1rem'>
                            Show {show ? 'Less' : 'More'}
                        </Button>
                    </Box>
                    <Box bgColor='gray.700' mt='4' p='4' borderRadius='md'>
                        <Flex>
                            <Heading as='h2' size='md'>Ratings</Heading>
                            <Link fontSize='sm' href='#' ml='auto'>See All<ChevronRightIcon /></Link>
                        </Flex>
                        <RatingList classSlug={data.slug} />
                    </Box>
                </GridItem>
                <GridItem height='fit-content' position='sticky' top='17%' bgColor="gray.700" p='4' borderRadius='md'>
                    <Flex justifyContent='center' flexDirection='column'>
                        <Text fontSize='xl' textAlign='center' fontWeight='semibold'>Basic Price: ${data.basic_price}</Text>
                        {/* TODO add something here, price descriptions or other, not sure */}
                        <Button colorScheme='teal' mt='3'>Enroll Now</Button>
                    </Flex>
                </GridItem>
            </Grid>
        </Container >
    )
}

export default Class
