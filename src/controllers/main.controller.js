

const getHome = (req , res) => {
    res.render('index');
}


const getAbout = (req, res) => {
    res.render('about')
}
module.exports = {
    getHome,
    getAbout
};