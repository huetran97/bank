import * as express from 'express';
import * as controller from '../controllers';
import { auth, sig } from '../middlewares/index';

const route = express.Router();

//auth
route.post('/api/auth/register', sig, controller.auth.register);
route.post('/api/auth/login', sig, controller.auth.login);
route.get('/api/user', auth, controller.user.getInfo);
route.post('/api/auth/refresh_token', controller.auth.refreshToken);
route.post('/api/user', auth, controller.user.updateInfo);
route.post('/api/user/deposit', auth, controller.transaction.deposit);
route.post('/api/user/withdraw', auth, controller.transaction.withDraw);
route.get('/api/user/transaction/:transaction_id', auth, controller.transaction.getDetailTransaction);
route.get('/api/user/transactions', auth, controller.transaction.getListTransaction);
route.get('/api/user/balance', auth, controller.user.getBalance);
route.post('/api/user/transfer', auth, controller.transaction.transfer);
route.get('/api/user/devices', auth, controller.devices.getListDevice);
route.delete('/api/user/device/:device_id', auth, controller.devices.remove);
export default route;