const handleImage = (db)=> (req, res) => {
	const { id } = req.body;
	let found = false;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			if (entries.length){
			res.json(entries[0])
			} else {
			res.status(400).json('not found')
		}
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage
}