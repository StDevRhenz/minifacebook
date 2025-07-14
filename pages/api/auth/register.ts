import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../src/lib/supabaseClient';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username } } });
        if (error) {
            return res.status(500).json({ message: 'User registration failed', error: error.message });
        }
        return res.status(201).json({ user: data.user, session: data.session });
    } else {
        return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }
}