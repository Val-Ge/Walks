// set up middleware for conditional rendering of login/logout/register
export function authMiddleware(req, res, next) {
    // Assuming req.user is set if a user is logged in
    res.locals.isLoggedIn = req.isAuthenticated(); // Replace with your actual check
    res.locals.isRegistered = req.user && req.user.registered; // Replace with your actual check

    next();
}
