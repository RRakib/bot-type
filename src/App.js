import {Box, ChakraProvider, Container, Flex, Grid, Stack, Text, VStack} from "@chakra-ui/react";
import {DndContext} from "@dnd-kit/core";
import {Draggable} from "./dnd/Draggable";
import {Droppable} from "./dnd/Droppable";
import {useState} from "react";

function App() {

    const containers = ['Text', 'Image'];
    const [parent, setParent] = useState(null);

    const handleDragEnd = (event) => {
        const {over} = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }

    return (
        <ChakraProvider>
            <DndContext onDragEnd={handleDragEnd}>
                <Container maxW={"100%"} width="100%" height="100%"
                           bgColor={"rgb(244, 245, 248)"} padding={"0"}
                           bgImage={"radial-gradient(rgb(198, 208, 225) 1px, transparent 0px)"}
                           bgSize={"40px 40px"} bgPosition={"-19px -19px"}>
                    <Flex width={"100%"} height={"56px"} bgColor={"white"} borderBottomWidth={"1px"}
                          justifyContent={"space-between"} alignItems='center'>
                        <Box></Box>
                        <Flex justifyContent={"space-between"} alignItems={'center'} gap={"5"}>
                            <Flex alignItems='center' px={"1rem"} bgColor={"#fafafa"}
                                  borderWidth={"1px"} borderRadius={"8px"} justifyContent={"center"}>
                                <Text color={"#555"} py={".2rem"}>Flow</Text>
                            </Flex>
                            <Flex alignItems='center' px={"1rem"} bgColor={"#fafafa"}
                                  borderWidth={"1px"} borderRadius={"8px"} justifyContent={"center"}>
                                <Text color={"#555"} py={".2rem"}>Settings</Text>
                            </Flex>
                        </Flex>
                        <Box></Box>
                    </Flex>
                    <Container position={"relative"} maxW={"100%"} height={"calc(100% - 56px)"} padding={"0"}>

                        <Droppable>
                            <Box width={"22em"} bgColor={"white"} borderColor={"#e4e4e7"}
                                 position={"absolute"} top={"5"} left={"5"} bottom={"5"}
                                 boxShadow={"lg"} borderWidth={"1px"} borderRadius={"10px"}>
                                <Stack direction={"column"} padding={"1rem"}>
                                    <VStack spacing={4}
                                            align='stretch'>
                                        <Box>
                                            <Text as='b'>Bubbles</Text>
                                            <Grid templateColumns='repeat(2, 1fr)' gap={6} mt={".7rem"}>

                                                {containers.map((item, index) => {
                                                    return <Draggable id={index + 1} key={index + 1}>
                                                        <Flex alignItems='center' padding={".5rem"} bgColor={"#fafafa"}
                                                              borderWidth={"1px"} borderRadius={"10px"}>
                                                            <Text color={"#555"}>{item}</Text>
                                                        </Flex>
                                                    </Draggable>
                                                })}
                                            </Grid>
                                        </Box>
                                    </VStack>
                                </Stack>
                            </Box>
                        </Droppable>
                    </Container>
                </Container>
            </DndContext>
        </ChakraProvider>
    );
}

export default App;
