import data from '@/utils/data';
import db from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next/types';
import User from '../../../../models/User';

const checkUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'GET') {
      const { id } = req.query;
      db.connect();
      const user = await User.find({ _id: id, name: req.body['name'] });

      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(200).json({ success: false, data: 'Data not Found' });
      }
    } else {
      res
        .status(420)
        .send({ error: true, message: `Only GET method is supported ` });
    }
  } catch (error) {
    res.status(422).send({ error: true, message: `Exception: ${error}` });
  } finally {
    db.disconnect();
  }
};
export default checkUser;
