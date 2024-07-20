const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let pathImagen;
		if (req.url == '/register' || req.url.includes('/update?_method=PUT') ) {
			pathImagen = path.join(__dirname,`../../public/images/users`)
		} else {
			pathImagen = path.join(__dirname,`../../public/images/uploads`)
		}
		cb(null, pathImagen)
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
	}
})

function extNames(req,file,cb) {
	const validTypes = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)
	if (!validTypes) {
		cb(null, false)
	} else {
		cb(null,true)
	}
}

let upload = multer({
	// fileFilter: extNames,
	// limits: {
	// 	fileSize: 1 * 1024 * 1024,  // 1 MB
	// 	files: 4,
	// },
	storage: storage,
})

function uploadImages (req,res,next) {
	upload.any()(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.log(err)
		} else if (err) {
		  // An unknown error occurred when uploading.
		}
		// Everything went fine.
		next()
	})}

module.exports = upload