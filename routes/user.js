import { Router } from "express";

import User from "../models/User.js";

const userRouter = new Router();

userRouter.get('/', async(req, res) => {
    try {
        const result = await User.find({})
    
        if(!result) res.status(404).send('Users not found')
        else res.send(result)    
    } catch (e) {
        console.error(e)
        res.status(400).json({message: e.message})
    }
})

userRouter.get('/:userId', async(req, res) => {
    const result = await User.findById(req.params.userId)

    if(!result) res.status(404).send('User not found')
    else res.send(result)
})

export default userRouter;