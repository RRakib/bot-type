import {
    CiCalendarDate,
    CiChat1, CiDesktop, CiFileOn,
    CiFilter,
    CiGrid31,
    CiHeadphones,
    CiImageOn, CiMoneyBill, CiPhone, CiPower,
    CiRoute,
    CiShoppingBasket, CiStar,
    CiVideoOn
} from "react-icons/ci";

export const bubbleContainers = [
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
        icon: <CiGrid31/>,
    },
    {
        name: 'Audio',
        type: 'audio',
        icon: <CiHeadphones/>,
    },
]
export const logicContainers = [
    {
        name: 'Condition',
        type: 'condition',
        icon: <CiFilter/>,
    },
    {
        name: 'Code',
        type: 'code',
        icon: <CiRoute/>,
    },
    {
        name: 'BotType',
        type: 'botType',
        icon: <CiShoppingBasket/>,
    },
]
export const inputContainers = [
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
        icon: <CiDesktop/>,
    },
    {
        name: 'Date',
        type: 'date',
        icon: <CiCalendarDate/>,
    },
    {
        name: 'Phone',
        type: 'phone',
        icon: <CiPhone/>,
    },
    {
        name: 'Button',
        type: 'button',
        icon: <CiPower/>,
    },
    {
        name: 'Payment',
        type: 'payment',
        icon: <CiMoneyBill/>,
    },
    {
        name: 'Rating',
        type: 'rating',
        icon: <CiStar/>,
    },
    {
        name: 'File',
        type: 'file',
        icon: <CiFileOn/>,
    },
]
