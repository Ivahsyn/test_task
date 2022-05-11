import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { hash } from 'bcrypt'
import { Roles } from "./types"

AppDataSource.initialize().then(async () => {

    const app = express()
    app.use(bodyParser.json())

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.listen(3000)

    //instead of migrations
    await usersSeed()
    

    console.log("Express server has started on port 3000.")

}).catch(error => console.log(error))


const usersSeed = async () => {
    const firstUserHashedPassword = await hash("12345", 10)
    const secondeUserHashedPassword = await hash("54321", 10)

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find();
    if(users.length === 0){
        await AppDataSource.manager.save(
            AppDataSource.manager.create(User, {
                email: "mail1@example.com",
                password: firstUserHashedPassword,
                role: Roles.USER
            })
        )
    
        await AppDataSource.manager.save(
            AppDataSource.manager.create(User, {
                email: "mail2@example.com",
                password: secondeUserHashedPassword,
                role: Roles.ADMIN
            })
        )
    }
}