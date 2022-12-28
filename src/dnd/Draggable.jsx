import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: {
            name: props.name,
            type: props.type,
            index: props.index,
        },
    });
    // console.log((props.x ?? 0) , (transform?.x ?? 0))
    const style = (transform || (props.x && props.y)) ? {
        transform: `translate3d(${((props.x ?? 0) + (transform?.x ?? 0))}px, ${((props.y ?? 0) + (transform?.y ?? 0))}px, 0)`,
    } : undefined;


    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
