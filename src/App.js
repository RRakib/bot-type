import {Box, ChakraProvider, Container, Flex, Grid, Input, Stack, Text, VStack} from "@chakra-ui/react";
import {DndContext} from "@dnd-kit/core";
import {Draggable} from "./dnd/Draggable";
import {Droppable} from "./dnd/Droppable";
import {useState} from "react";
import structuredClone from '@ungap/structured-clone';
import {
    CiCalendarDate,
    CiChat1,
    CiDesktop,
    CiFileOn, CiFilter,
    CiGrid31,
    CiHeadphones,
    CiImageOn,
    CiMoneyBill,
    CiPhone, CiPower, CiShoppingBasket,
    CiSquareChevLeft,
    CiStar,
    CiVideoOn,
    CiRoute
} from "react-icons/ci";
import {IconContext} from "react-icons";
import {RxFontBold, RxFontItalic, RxLink2, RxUnderline} from "react-icons/rx";
import {HiOutlineWrench} from "react-icons/hi2";

function App() {

    const icons = {
        'CiChat1': <CiChat1/>,
    }
    const bubbleContainers = [
        {
            name: 'Text',
            type: 'text',
            icon: <CiChat1/>,
        },
        {
            name: 'Image',
            type: 'image',
            icon: <CiImageOn/>,
        },
        {
            name: 'Video',
            type: 'video',
            icon: <CiVideoOn/>,
        },
        {
            name: 'Embed',
            type: 'embed',
            icon: <CiGrid31 />,
        },
        {
            name: 'Audio',
            type: 'audio',
            icon: <CiHeadphones />,
        },
    ]
    const logicContainers = [
        {
            name: 'Condition',
            type: 'condition',
            icon: <CiFilter />,
        },
        {
            name: 'Code',
            type: 'code',
            icon: <CiRoute />,
        },
        {
            name: 'BotType',
            type: 'botType',
            icon: <CiShoppingBasket />,
        },
    ]
    const inputContainers = [
        {
            name: 'Text',
            type: 'text',
            icon: <CiChat1/>,
        },
        {
            name: 'Number',
            type: 'number',
            icon: <CiImageOn/>,
        },
        {
            name: 'Email',
            type: 'email',
            icon: <CiVideoOn/>,
        },
        {
            name: 'Website',
            type: 'website',
            icon: <CiDesktop />,
        },
        {
            name: 'Date',
            type: 'date',
            icon: <CiCalendarDate />,
        },
        {
            name: 'Phone',
            type: 'phone',
            icon: <CiPhone />,
        },
        {
            name: 'Button',
            type: 'button',
            icon: <CiPower />,
        },
        {
            name: 'Payment',
            type: 'payment',
            icon: <CiMoneyBill />,
        },
        {
            name: 'Rating',
            type: 'rating',
            icon: <CiStar />,
        },
        {
            name: 'File',
            type: 'file',
            icon: <CiFileOn />,
        },
    ]

    const [parent, setParent] = useState([]);
    const [hideAction, setHideAction] = useState(false);

    const handleDragEnd = (event) => {
        const {active, over, delta} = event;
        if (over && over.data.current.accepts.includes(active.data.current.type)) {
            const typedElement = {
                ...delta,
                ...active.data.current,
                name: 'GroupText',
                type: 'groupText',
                icon: 'CiChat1',
            }
            setParent([...parent, typedElement])
        } else if (['groupText', 'groupImage'].includes(active.data.current.type)) {
            const newData = structuredClone(parent);
            newData[active.data.current.index]['x'] = parent[active.data.current.index]['x'] + delta.x;
            newData[active.data.current.index]['y'] = parent[active.data.current.index]['y'] + delta.y;
            setParent(newData);
        }
    }

    const handleClickAction = (type) => {
        switch (type) {
            case 'groupText':
                return <Box borderWidth={"2px"} borderColor={"purple.600"} borderRadius={"8px"}
                            width={"100%"} height={"6rem"}>
                    <Flex width={"100%"} p={".5rem"} alignItems={"center"} borderBottomWidth={"1px"}
                          borderBottomColor={"gray.300"}>
                        <Box px={".5rem"}><RxFontBold/></Box>
                        <Box px={".5rem"}><RxFontItalic/></Box>
                        <Box px={".5rem"}><RxUnderline/></Box>
                        <Box px={".5rem"}><RxLink2/></Box>
                    </Flex>
                    <Input borderWidth={"0"} width={"100%"} borderRadius={"0"} height={"3.2rem"} outline={"0"}
                           autoFocus={true}/>
                </Box>
            case 'groupImage':

            default:
                return;
        }
    }

    const renderTypedElement = parent.length ? parent.map((element, index) => {
        if (element.type === 'groupText') {
            return <Draggable id={index + 10} key={index + 10} type={element.type}
                              name={element.name} x={element.x} y={element.y} index={index}>
                <Flex width={"18rem"} minHeight={"8rem"}
                      bgColor={"white"} borderRadius={".8rem"} boxShadow={"md"}
                      padding={"1rem"} justifyContent={"space-between"} flexDirection={"column"}>
                    <Text w={"max-content"} mb={"1rem"} fontWeight={"bold"} color={"#555"}>Group#{index + 1}</Text>
                    {!hideAction ? <Flex borderColor={"#e4e4e7"} padding={"0.75rem"} alignItems={"center"}
                                         borderRadius={"8px"} bgColor={"#fafafa"} borderWidth={"1px"} onMouseUp={() => {
                            setHideAction(true)
                        }}>
                            {icons[element.icon]}
                            <Text ml={".5rem"} color={"dimgray"}>Click to edit...</Text>
                        </Flex> :
                        <IconContext.Provider
                            value={{color: '#666', size: '22px'}}>{handleClickAction(element.type)}
                        </IconContext.Provider>}
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
                          justifyContent={"space-between"} alignItems='center' px={"1.3rem"}>
                        <Flex alignItems='center'>
                            <IconContext.Provider
                                value={{color: '#444', size: '30px'}}>
                                <Box mr={"2rem"}><CiSquareChevLeft/></Box>
                            </IconContext.Provider>
                            <IconContext.Provider
                                value={{color: '#444', size: '22px'}}>
                                <HiOutlineWrench/>
                            </IconContext.Provider>
                            <Text ml={".3rem"} fontWeight='500' color={"gray.600"}>My BotType</Text>
                        </Flex>
                        <Flex justifyContent={"space-between"} alignItems={'center'} gap={"5"}>
                            <Flex alignItems='center' px={"1rem"} bgColor={"#fafafa"} borderColor={"purple.700"}
                                  borderWidth={"1px"} borderRadius={"8px"} justifyContent={"center"}>
                                <Text color={"purple.600"} fontWeight={"500"} pb={".2rem"} pt={".1rem"}>Flow</Text>
                            </Flex>
                            <Flex alignItems='center' px={"1rem"}
                                  justifyContent={"center"}>
                                <Text color={"gray.700"} fontWeight={"500"}  pb={".2rem"} pt={".1rem"}>Settings</Text>
                            </Flex>
                            <Flex alignItems='center' px={"1rem"}
                                  justifyContent={"center"}>
                                <Text color={"gray.700"} fontWeight={"500"}  pb={".2rem"} pt={".1rem"}>Theme</Text>
                            </Flex>
                            <Flex alignItems='center' px={"1rem"}
                                  justifyContent={"center"}>
                                <Text color={"gray.700"} fontWeight={"500"}  pb={".2rem"} pt={".1rem"}>Result</Text>
                            </Flex>
                        </Flex>
                        <Flex>
                            <Box px={"1rem"} py={".2rem"} bgColor={"gray.200"} borderRadius={"8px"} mr={".5rem"}>
                                <Text fontWeight={"500"} color={"gray.700"}  pb={".2rem"} pt={".1rem"}>Preview</Text>
                            </Box>
                            <Box px={"1rem"} py={".2rem"} bgColor={"purple.600"} borderRadius={"8px"}>
                                <Text fontWeight={"400"} color={"white"}  pb={".2rem"} pt={".1rem"}>Publish</Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <Container position={"relative"} maxW={"100%"} height={"calc(100% - 56px)"} padding={"0"}>
                        <Droppable>
                            <Box width={"22em"} bgColor={"white"} borderColor={"#e4e4e7"}
                                 position={"absolute"} top={"5"} left={"5"} bottom={"5"}
                                 boxShadow={"lg"} borderWidth={"1px"} borderRadius={"10px"}>
                                <Stack direction={"column"} padding={"1rem"}>
                                    <VStack spacing={8}
                                            align='stretch'>
                                        <Box>
                                            <Text fontWeight={"500"}>Bubbles</Text>
                                            <Grid templateColumns='repeat(2, 1fr)' gap={3} mt={".7rem"}>
                                                <IconContext.Provider
                                                    value={{color: 'blue', size: '20px', className: 'react-icon-svg'}}>
                                                    {bubbleContainers.map((element, index) => {
                                                        return <Draggable id={index + 1} key={index + 1}
                                                                          type={element.type}
                                                                          name={element.name} index={index}>
                                                            <Flex alignItems='center' padding={".5rem"}
                                                                  bgColor={"#fafafa"}
                                                                  borderWidth={"1px"} borderRadius={"10px"}>
                                                                <Box mr={".5rem"}>{element.icon}</Box>
                                                                <Text color={"gray.800"}>{element.name}</Text>
                                                            </Flex>
                                                        </Draggable>
                                                    })}
                                                </IconContext.Provider>
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Text fontWeight={"500"}>Inputs</Text>
                                            <Grid templateColumns='repeat(2, 1fr)' gap={3} mt={".7rem"}>
                                                <IconContext.Provider
                                                    value={{color: '#f17600', size: '20px', className: 'react-icon-svg'}}>
                                                    {inputContainers.map((element, index) => {
                                                        return <Draggable id={index + 1} key={index + 1}
                                                                          type={element.type}
                                                                          name={element.name} index={index}>
                                                            <Flex alignItems='center' padding={".5rem"}
                                                                  bgColor={"#fafafa"}
                                                                  borderWidth={"1px"} borderRadius={"10px"}>
                                                                <Box mr={".5rem"}>{element.icon}</Box>
                                                                <Text color={"gray.800"}>{element.name}</Text>
                                                            </Flex>
                                                        </Draggable>
                                                    })}
                                                </IconContext.Provider>
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Text fontWeight={"500"}>Logic</Text>
                                            <Grid templateColumns='repeat(2, 1fr)' gap={3} mt={".7rem"}>
                                                <IconContext.Provider
                                                    value={{color: '#7431eb', size: '20px', className: 'react-icon-svg'}}>
                                                    {logicContainers.map((element, index) => {
                                                        return <Draggable id={index + 1} key={index + 1}
                                                                          type={element.type}
                                                                          name={element.name} index={index}>
                                                            <Flex alignItems='center' padding={".5rem"}
                                                                  bgColor={"#fafafa"}
                                                                  borderWidth={"1px"} borderRadius={"10px"}>
                                                                <Box mr={".5rem"}>{element.icon}</Box>
                                                                <Text color={"gray.800"}>{element.name}</Text>
                                                            </Flex>
                                                        </Draggable>
                                                    })}
                                                </IconContext.Provider>
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
