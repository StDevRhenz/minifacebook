import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../src/lib/supabaseClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'DELETE':
      const { error } = await supabase.from('posts').delete().eq('id', id as string);
      if (error) {
        return res.status(500).json({ message: 'Error deleting post', error: error.message });
      }
      return res.status(204).end(); // No Content
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;