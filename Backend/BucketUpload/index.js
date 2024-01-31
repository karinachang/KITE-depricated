const { Storage } = require('@google-cloud/storage')
const functions = require('@google-cloud/functions-framework')

functions.http('postImage', (req, res) => {

	// Initialize Storage
const storage = new Storage()

const bucketName = 'kitebucket'
const bucket = storage.bucket(bucketName)

//Sending the upload request
bucket.upload(
	'./akite.jpg',
	{
		destination: 'akite.jpg',
	},
	function (err, file) {
		if(err) {
			console.error('Error uploading image akite.jpeg: ${err}')
		} else {
			console.log('Image akite.jpeg uploaded to ${bucketName}.')
		}
	}
)

	res.send('Working?')
})
