import { Center, Container, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";

type subCategoryResponse = {
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
    const res = await fetch(`http://localhost:8000/api/classes/${context.params?.subCategory}/`)
    const data: subCategoryResponse[] = await res.json()
    return {
        props: { data }
    }
}


const Explore: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <Container maxW="container.xl">
            <Text fontSize="xl" fontWeight="bold">Explore</Text>
            <br />
            <SimpleGrid minChildWidth="250px" spacing="6">
                {data.map((item: subCategoryResponse) => (
                    <LinkBox
                        boxShadow="md"
                        bg="gray.600"
                        borderRadius="sm"
                        overflow="hidden"
                        title={item.title}
                        maxWidth="450px"
                        key={item.slug}
                    >
                        <Center>
                            <LinkOverlay
                                fontSize="lg"
                                fontWeight="bold"
                                textAlign="center"
                                p="2"
                                href={`/explore/classes/${item.slug}`}
                            >{item.title} by {item.teacher.username}</LinkOverlay>
                        </Center>
                        <Text>Rating: {item.average_rating} ({item.rating_count})</Text>
                        <Text fontSi>No rating yet</Text>
                    </LinkBox>
                ))}
            </SimpleGrid>
        </Container>
    )
}

export default Explore
