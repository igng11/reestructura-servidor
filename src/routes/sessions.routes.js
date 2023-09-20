import { Router } from "express";
import { checkUserAuthenticated, showLoginView } from "../middlwares/auth.js";
import { userDao } from "../dao/index.js";
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";
import { SessionsController } from "../controllers/sessions.controller.js";

const sessionRouter = Router();

sessionRouter.get("/views", SessionsController.viewSessions);

sessionRouter.post("/signup", SessionsController.signupSession);

sessionRouter.post("/profile", SessionsController.profileSessions);

sessionRouter.get("/logout", SessionsController.profileSessions);

//authentication github
sessionRouter.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

sessionRouter.get("/github-callback", passport.authenticate("githubLoginStrategy",{
    failureRedirect:"/fail-signup"
}), SessionsController.loginGitSessions);




const router = Router();

sessionRouter.get("/registro",showLoginView, SessionsController.registroSessions);

sessionRouter.get("/login", showLoginView, SessionsController.loginSessions);

sessionRouter.get("/perfil", checkUserAuthenticated, SessionsController.perfilSessions);

export {router as viewsRouter};
export {sessionRouter};