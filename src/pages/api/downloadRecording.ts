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


        // Send the file to the API
        const apiResponse = await fetch('http://localhost:8000/talk', {
            method: 'POST',
            body: formData,
        });

        if (!apiResponse.ok) {
            throw new Error('Failed to fetch from FastAPI server');
        }

        // Convert the response to a blob
        const mp3Blob = await apiResponse.blob();

        // Set the headers for the response
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'attachment; filename="response.mp3"');

        // Send the MP3 file back to the client
        res.status(200).send(Buffer.from(await mp3Blob.arrayBuffer()));

    } catch (error) {
        console.error('Error downloading or uploading the file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}