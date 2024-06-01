import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
        method: "POST",
        body: JSON.stringify({
            title: "Summary Room",
        }),
        headers: {
            "Content-type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
    });
    const data = await response.json();
    const roomId = data?.data?.roomId;
    console.log(roomId);
    return res.status(200).json({ roomId });
}