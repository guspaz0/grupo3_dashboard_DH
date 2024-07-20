const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');
const publicPath = path.join(__dirname+'/../public')

const cloudinary = require("cloudinary").v2;

const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

module.exports = {
    all: async function(){
        try {
            const response = await db.Images.findAll({include: ['products'], logging: false})
            return response
        } catch (error) {
            return error
        }
    },
    newProductImage: async function (local, upload, prodId) {
        try {
            let newImages = []
            if (local) Array.isArray(local)? local.forEach(x => newImages.push({path: publicPath+x})) : newImages.push({path: publicPath+local}); 
            if (upload.length>0) newImages = [...newImages, ...upload];
            for (let i in newImages) {
                const uploadedImage = await this.uploadFile(newImages[i].path)
                const createImage = await db.Images.create({pathName: uploadedImage.url})
                await db.prod_images.create({
                    product_id: +prodId,
                    image_id: createImage.id
                })
            }
        } catch (error) {
            return error
        }
    },
    editProductImages: async function (local, upload, prodId) {
        try {
            const productImages = await db.Images.findAll({
                include: {
                    model: db.Products,
                    as: 'products',
                    where: {id: prodId},
                },
                logging: false
            })
            let holdImage = Array.isArray(local) ? local : [local];
            for (let i in productImages) {
                const { id, pathName, products } = productImages[i]
                if (!holdImage.includes(pathName)) {
                    await db.prod_images.destroy({where: {id: products[0].prod_images.id}})
                    await db.images.destroy({where: {id: id}})
                }
            }
            if (upload) {
                await this.newProductImage(null,upload, prodId)
            }
        } catch (error) {
            return error
        }
    },
    uploadFile: async function (LocalFilePath) {
        try {
            if (!LocalFilePath) {
                throw new Error("LocalFilePath is missing");
            }
            const response = await cloudinary.uploader.upload(LocalFilePath, {
                resource_type: "auto",
            });
            fs.unlinkSync(LocalFilePath);
            return response;
        } catch (error) {
            console.error("Error during upload:", error);
            try {
                // Attempt to unlink the file again if it hasn't been unlinked yet
                if (fs.existsSync(LocalFilePath)) {
                    fs.unlinkSync(LocalFilePath);
                    console.log("File unlinked successfully");
                }
            } catch (unlinkError) {
                console.error("Error unlinking file:", unlinkError);
            }
            throw error;
        }
    },
    destroyProduct: async function (prodId) {
        try {
            const productImages = await db.Images.findAll({
                include: {
                    model: db.Products,
                    as: 'products',
                    where: {id: prodId},
                },
                logging: false
            })
            for (let i in productImages) {
                const { id , pathName, products } = productImages[i]
                await db.prod_images.destroy({where: {id: products[0].prod_images.id}})
                await db.Images.destroy({where: {id: id}})
                //this.deleteFile(pathName)
            }
        } catch (error) {
            return error
        }
    },
    deleteFile: function (path) {
        if (fs.readdirSync(publicPath+'/images/uploads').includes(path.split('uploads/')[1])) {
            fs.rmSync(publicPath+path)
        }
    },
    parsePath: function (images) {
        function replaceAll(string) {
            let replaced = ''
            for (let i in string) {
                if (string[i] == '\\') {
                    replaced += '/'
                } else {
                    replaced += string[i]
                }
                if (+i == string.length-1) {
                    return replaced
                }
            };
        }
        let parsedPaths = []
        if (images.length > 0) {
            images.forEach((file) => {
                file.path = replaceAll(file.path).split('public')[1]
                parsedPaths.push(file)
            })
            return parsedPaths
        } else {
            throw new Error("error en parametro de entrada images")
        } 
    }
}