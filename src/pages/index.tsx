import React from 'react';

interface IMessage {
    text: string;
}

const message: IMessage = {
    text: 'Hello world',
};

export default () => <div>{message.text}</div>;
