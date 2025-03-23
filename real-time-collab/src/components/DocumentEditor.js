import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function DocumentEditor() {
    const [document, setDocument] = useState('');

    useEffect(() => {
        socket.on('documentUpdate', (newDocument) => {
            setDocument(newDocument);
        });

        return () => {
            socket.off('documentUpdate');
        };
    }, []);

    const handleChange = (e) => {
        const newDocument = e.target.value;
        setDocument(newDocument);
        socket.emit('updateDocument', newDocument);
    };

    return (
        <textarea value={document} onChange={handleChange} />
    );
}

export default DocumentEditor;