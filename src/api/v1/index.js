import { Router } from 'express';
import passport from 'passport';

import jwtStrategy from './resource//auth/strategies/jwt-strategy';

import AuthRoute from './resource/auth/auth.router';
import UserRoute from './resource/user/user.router';
import RoleRoute from './resource//role/role.router';

jwtStrategy(passport);

// import userRouter from "./resource/user/user.router";
// import path from 'path';
// import fs from 'fs'

// console.log("===>", fs.readdirSync(path.join(__dirname))
//     .filter((file: string) => file.indexOf(".") !== 0 && file !== "index.ts"))
// const addResourceRoutes = (filePath: string) => {
//     let y = filePath.split(__dirname)
//     console.log("TCL: addResourceRoutes -> y", y)
//     const dirs = fs.readdirSync(filePath)
//     dirs.map(dir => {
//         console.log("TCL: addResourceRoutes -> dir", dir)
//         let x = fs.readdirSync(path.join(filePath, `/${dir}`))
//             .filter((fileName: string) => fileName === `${dir}.router.ts`)
//             .map((routerFile) => {
//                 console.log("=============>", `./${filePath}/${dir}/${routerFile}`)
//                 console.log("TCL: addResourceRoutes -> routerFile", path.join(filePath, `/${dir}`, `/${routerFile}`))
//                 require(`./${filePath}/${dir}/${routerFile}`)
//             })
//         console.log("TCL: addResourceRoutes -> x", x)
//     })
// }
// addResourceRoutes(path.join(__dirname, '/resource'))
// async function walk(dir) {
//     let files = await fs.readdir(dir);
//     files = await Promise.all(files.map(async file => {
//         const filePath = path.join(dir, file);
//         const stats = await fs.stat(filePath);
//         if (stats.isDirectory()) return walk(filePath);
//         else if(stats.isFile()) return filePath;
//     }));

//     return files.reduce((all, folderContents) => all.concat(folderContents), []);
// }

// walk(__dirname)
// const v1Router = Router();

// v1Router.use('/role', roleRouter);
// v1Router.use('/auth', userRouter);

export class V1Route {
  constructor() {
    this.v1Router = Router();
    this.mountRoute();
  }

  mountRoute() {
    this.v1Router.use('/auth', new AuthRoute().authRouter);

    this.v1Router.use(passport.authenticate('jwt', { session: false }));

    this.v1Router.use('/role', new RoleRoute().roleRouter);
    this.v1Router.use('/user', new UserRoute().userRouter);
  }
}

export default V1Route;
