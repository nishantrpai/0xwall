const Web3Token = require('web3-token');

export const fetchAccount = async (token) => {
	let writer_account;
	if (token) {
		let { address } = await Web3Token.verify(token);
		writer_account = address;
	}
	return writer_account;
}