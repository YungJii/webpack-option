module.exports = {
	'GET /user': {name: 'yungjii'},
	'POST /login/account': (req, res) => {
		const { psw, username } = req.body
		if (psw === '123123' && username === 'admin') {
			return res.send({
				status: 'ok',
				code: 0,
				token: 'asdASD123!@#',
				data: { id: 1, name: 'yungjii'}
			})
		} else {
			return res.send({
				status: 'error',
				code: 403
			})
		}
	}
}