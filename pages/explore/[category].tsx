import { Center, Container, Img, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from 'next/router';


export type subCategoryResponse = {
    id: number;
    title: string;
    slug: string;
    description: string
    thumbnail: string
    created: Date
    updated: Date
    parent: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:8000/api/categories/${context.params?.category}/`)
    const data: subCategoryResponse[] = await res.json()
    return {
        props: { data }
    }
}


const Explore: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter()
    const { category } = router.query

    return (
        <Container maxW="container.xl">
            <Text fontSize="xl" fontWeight="bold">Explore</Text>
            <br />
            <SimpleGrid minChildWidth="250px" spacing="6">
                {data.map((item: subCategoryResponse) => (
                    <LinkBox
                        bg="gray.600"
                        borderRadius="sm"
                        maxWidth="450px"
                        key={item.id}
                    >
                        <Img
                            src={item.thumbnail}
                            width="100%"
                            height="80%"
                            objectFit="cover"
                        />
                        <Center height="20%">
                            <LinkOverlay
                                fontSize="lg"
                                fontWeight="bold"
                                textAlign="center"
                                p="2"
                                href={`/explore/${category}/${item.slug}`}
                            >{item.title}</LinkOverlay>
                        </Center>
                    </LinkBox>
                ))}
            </SimpleGrid>

        </Container>
    )
}

export default Explore
