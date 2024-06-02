import type { NextApiRequest, NextApiResponse } from 'next';
import { Recorder } from '@huddle01/server-sdk/recorder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { mp4Url } = req.query;

    try {
        // Download the video file
        const response = await fetch(mp4Url as string);
        const blob = await response.blob();

        // Create a FormData object and append the file
        const formData = new FormData();
        formData.append('file', new File([blob], 'video.mp4', { type: 'video/mp4' }));

        // Get the text from the FastAPI server
        const apiResponseText = await fetch('http://localhost:8000/text', {
            method: 'POST',
            body: formData,
        });

        if (!apiResponseText.ok) {
            throw new Error('Failed to fetch from FastAPI server');
        }

        const data = await apiResponseText.json();
        console.log(data);
        
        // Send the file to the API to get the audio
        const apiResponse = await fetch('http://localhost:8000/talk', {
            method: 'POST',
            body: formData,
        });

        if (!apiResponse.ok) {
            throw new Error('Failed to fetch from FastAPI server');
        }

        // Convert the response to a blob
        const mp3Blob = await apiResponse.blob();
        const audioBuffer = Buffer.from(await mp3Blob.arrayBuffer());

        // Send the audio and text back to the client
        res.status(200).json({ audio: audioBuffer.toString('base64'), text: data });

    } catch (error) {
        console.error('Error downloading or uploading the file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
