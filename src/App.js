import {Box, ChakraProvider, Container, Flex, Grid, Input, Stack, Text, VStack} from "@chakra-ui/react";
import {DndContext} from "@dnd-kit/core";
import {Draggable} from "./dnd/Draggable";
import {Droppable} from "./dnd/Droppable";
import {useState} from "react";
import structuredClone from '@ungap/structured-clone';

function App() {

    const containers = [
        {
            name: 'Text',
            type: 'text'
        },
        {
            name: 'Image',
            type: 'image'
        }
    ];
    const [parent, setParent] = useState([]);

    const handleDragEnd = (event) => {
        const {active, over, delta} = event;
        console.log('Delta', over, ['groupText', 'groupImage'].includes(active.data.current.type))
        if (over && over.data.current.accepts.includes(active.data.current.type)) {
            const typedElement = {
                ...delta,
                ...active.data.current,
                name: 'GroupText',
                type: 'groupText',
            }
            setParent([...parent, typedElement])
        } else if (['groupText', 'groupImage'].includes(active.data.current.type)) {
            const newData = structuredClone(parent);
            newData[active.data.current.index]['x'] = parent[active.data.current.index]['x'] + delta.x;
            newData[active.data.current.index]['y'] = parent[active.data.current.index]['y'] + delta.y;
            setParent(newData);
        }
    }

    const renderTypedElement = parent.length ? parent.map((element, index) => {
        if (element.type === 'groupText') {
            return <Draggable id={index + 10} key={index + 10} type={element.type}
                              name={element.name} x={element.x} y={element.y} index={index}>
                <Flex width={"20rem"} height={"8rem"}
                     bgColor={"white"} borderRadius={".8rem"} boxShadow={"md"}
                     padding={"1rem"} justifyContent={"flex-start"} flexDirection={"column"}>
                    <Text w={"max-content"} mb={"1rem"} fontWeight={"bold"} color={"#555"}>Group#{index + 1}</Text>
                    <Input placeholder='Click to edit...' borderColor={"#e4e4e7"} padding={"0.75rem"} borderRadius={"8px"} bgColor={"#fafafa"}/>
                </Flex>
            </Draggable>
        }

        return <></>
    }) : <></>

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

                                                {containers.map((element, index) => {
                                                    return <Draggable id={index + 1} key={index + 1} type={element.type}
                                                                      name={element.name} index={index}>
                                                        <Flex alignItems='center' padding={".5rem"} bgColor={"#fafafa"}
                                                              borderWidth={"1px"} borderRadius={"10px"}>
                                                            <Text color={"#555"}>{element.name}</Text>
                                                        </Flex>
                                                    </Draggable>
                                                })}
                                            </Grid>
                                        </Box>
                                    </VStack>
                                </Stack>
                            </Box>

                            {renderTypedElement}
                        </Droppable>
                    </Container>
                </Container>
            </DndContext>
        </ChakraProvider>
    );
}

export default App;
