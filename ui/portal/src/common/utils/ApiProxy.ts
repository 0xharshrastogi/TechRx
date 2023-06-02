import { ApiProxyBuilder } from 'proxy-api';

const proxies = {
	local: new ApiProxyBuilder('http://localhost:8000'),
};

export { proxies };
