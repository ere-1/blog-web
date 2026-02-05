const Post = require("../models/Post");


const getHome = async (req , res) => {
    let perPage = 5;
    let page = req.query.page || 1;
    const data = await Post.aggregate([{$sort: {createdAt: -1}}]).skip((perPage* page) - perPage).limit(perPage).exec();

    let count = await Post.countDocuments();
    let nextPage = parseInt(page) +1;
    let hasNextPage = nextPage <= Math.ceil(count / perPage);


    res.render('index', {
        data,
        current: page,
        nextPage: hasNextPage? nextPage : null
        
    });
}

const getPostPage = async (req, res) => {
    try {
        
        const id = req.params.id;
        const data = await Post.findById({_id: id});
    
        res.render('post', {data});
    } catch (error) {
        console.log(error)
    }
}


const getAbout = (req, res) => {
    res.render('about')
}
module.exports = {
    getHome,
    getAbout,
    getPostPage
};