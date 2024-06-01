// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Recorder } from '@huddle01/server-sdk/recorder';

interface Recordings {
  id: string;
  recordingUrl: string;
  recordingSize: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId } = req.query;

  if (!process.env.NEXT_PUBLIC_PROJECT_ID && !process.env.NEXT_PUBLIC_API_KEY) {
    return res
      .status(400)
      .json({ error: 'NEXT_PUBLIC_PROJECT_ID and API_KEY are required' });
  }

  const recorder = new Recorder(
    process.env.NEXT_PUBLIC_PROJECT_ID!,
    process.env.NEXT_PUBLIC_API_KEY!
  );

  const recording = await recorder.stop({
    roomId: roomId as string,
  });

  console.log('recording', recording);
  
  return res.status(200).json({ message: "Recording Stopped Succesfully" });
}
