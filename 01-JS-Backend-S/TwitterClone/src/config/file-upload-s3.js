import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_REGION, AWS_ACCESS_SECRET_KEY, BUCKET_NAME } from './serverConfig.js'

aws.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_ACCESS_SECRET_KEY
})

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            const fileExtension = file.originalname.split('.').pop();
            const key = `${Date.now().toString()}.${fileExtension}`
            cb(null, key);
        }
    })
});


export default upload;