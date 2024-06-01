import type { NextApiRequest, NextApiResponse } from 'next';
import { Recorder } from '@huddle01/server-sdk/recorder';

interface Recordings {
    id: string;
    recordingUrl: string;
    recordingSize: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const response = await fetch(
        'https://api.huddle01.com/api/v1/get-recordings',
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
          },
        }
      );
      const data = await response.json();
      const { recordings } = data as { recordings: Recordings[] };
      return res.status(200).json({ recording: recordings[0] });
}