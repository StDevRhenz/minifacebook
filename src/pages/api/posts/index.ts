import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle getting posts
    res.status(200).json({ message: 'Get posts endpoint' });
  } else if (req.method === 'POST') {
    // Handle creating a post
    res.status(200).json({ message: 'Create post endpoint' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
