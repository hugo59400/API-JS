/**
 * Middleware perso qui log la requête et ajout un header
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").RequestHandler} next 
 */
const pouletMiddleWare = (req, res, next) => {
    // log
    console.log(`Poulet sur ${req.path}`);
    // ajout d'un header
    res.setHeader('Poulet', 'Cot cot');
    // poursuite du programe
    next();
}

module.exports = pouletMiddleWare;
