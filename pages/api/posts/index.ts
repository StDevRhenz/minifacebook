import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../src/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        if (error) {
            return res.status(500).json({ message: 'Error fetching posts', error: error.message });
        }
        return res.status(200).json(data);
    } else if (req.method === 'POST') {
        const postData = req.body;
        const { data, error } = await supabase.from('posts').insert([postData]).select().single();
        if (error) {
            return res.status(500).json({ message: 'Error creating post', error: error.message });
        }
        return res.status(201).json(data);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}