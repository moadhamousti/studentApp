// const multer = require('multer');
// const app = express();
// const userExpressroute = express.router();
// const multer = require('multer');

// let studentSchema = require('../models/studentSchema');


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Uploads is the Upload_folder_name
//         cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + "_"+file.originalname);
//     },
// });

// var upload = multer({ storage: storage}).single('image');


// userExpressroute.route('/Student/profil').get((req, res) =>{
//     userSchema.find((error, data)=>{
//         if(error){
//             return(error)
//         }
//         else{
//             res.json(data);
//         }
//     })
// })