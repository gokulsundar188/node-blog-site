
const err_404 = (req, res) => {
    res.status(404).render('./error/404', { title: '404' });
}

module.exports = {
    err_404
};