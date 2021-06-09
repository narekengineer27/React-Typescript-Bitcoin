const isProd = (process.env.NODE_ENV === 'production');

import devStore from './configure-store.dev';
import prodStore from './configure-store.prod';

export default (isProd ? prodStore : devStore);
