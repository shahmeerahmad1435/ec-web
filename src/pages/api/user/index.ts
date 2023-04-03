import data from '@/utils/data';
import db from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next/types';
import User from '../../../../models/User';
import bycrypt from 'bcryptjs';

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'GET') {
      db.connect();
      const user = await User.find({});
      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(200).json({ success: true, data: 'User not found' });
      }
    } else if (req.method == 'POST') {
      try {
        req.body['password'] = bycrypt.hashSync(req.body['password']);
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(422).json({ success: false, error });
      }
    } else {
      res.send({ error: true, message: `Only GET method is supported` });
    }
  } catch (error) {
    res.send({ error: true, message: `Exception: ${error}` });
  } finally {
    db.disconnect();
  }
};
export default getUsers;
