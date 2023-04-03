import data from '@/utils/data';
import db from '@/utils/db';
import User from '../../../models/User';

const seederHandler = async (req: any, res: any) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);

  await db.disconnect();
  res.send({ message: 'seed successfully' });
};
export default seederHandler;
