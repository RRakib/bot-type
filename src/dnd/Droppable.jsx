import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {Box} from "@chakra-ui/react";

export const Droppable = (props) => {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
        position: 'relative'
    };

    return (
        <Box ref={setNodeRef} width={"100%"} height={"100%"} style={style}>
            {props.children}
        </Box>
    );
}
