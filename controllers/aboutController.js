
const about_details = (req, res) => {
    res.render('about', { title: 'About' });
}

const about_redirect = (req, res) => {
    res.redirect('/about');
}

module.exports = {
    about_details,
    about_redirect
};