import { Center, Container, Img, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import type { subCategoryResponse } from './[category]'
import NextLink from 'next/link'

type categoryResponse = {
    id: number;
    title: string;
    slug: string;
    description: string
    thumbnail: string
    created: Date
    updated: Date
    sub_categories: subCategoryResponse[]
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://localhost:8000/api/categories/list/')
    const data: categoryResponse[] = await res.json()
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
                {data.map((item: categoryResponse) => (
                    <LinkBox cursor="pointer" bg="gray.600" borderRadius="sm" key={item.id} >
                        <Img
                            src={item.thumbnail}
                            width="100%"
                            height="80%"
                            objectFit="cover"
                        />
                        <Center height="20%">
                            <NextLink href={`/explore/${item.slug}`} >
                                <LinkOverlay
                                    fontSize="lg"
                                    fontWeight="bold"
                                    textAlign="center"
                                    p="2"
                                >{item.title}</LinkOverlay>
                            </NextLink>
                        </Center>
                    </LinkBox>
                ))}
            </SimpleGrid>

        </Container>
    )
}

export default Explore
