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

const getSearchTerm = async (req,res) => {
    try {
        let search = req.body.searchTerm;
        let searchFilter = search.replace(/[^a-zA-Z0-9]/g, '');
        const data = await Post.find({
            $or: [
                {title: {$regex: new RegExp(searchFilter, 'i')}},
                {body: {$regex: new RegExp(searchFilter, 'i')}}
            ]
        })
        res.render('search', {data});
    } catch (error) {
        console.log(error);
    }
}
const getAbout = (req, res) => {
    res.render('about')
}
module.exports = {
    getHome,
    getAbout,
    getPostPage,
    getSearchTerm
};