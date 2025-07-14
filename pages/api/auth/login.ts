import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../src/lib/supabaseClient';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return res.status(401).json({ message: error.message });
        }
        return res.status(200).json({ user: data.user, session: data.session });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}