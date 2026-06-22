import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { db } from '../db/connection.ts'
import { users, type NewUser, type User } from '../db/schema.ts'
import { generateToken } from '../utils/jwt.ts'
import { comparePassword, hashPassword } from '../utils/password.ts'
import { eq } from 'drizzle-orm'

export const register = async (
  req: Request<any, any, NewUser>,
  res: Response,
) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)

    const [user] = await db.insert(users).values({
      ...req.body,
      password: hashedPassword,
    }).returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createAt: users.createAt,
    })
     
    const token = await generateToken({
        id: user.id,
        email: user.email,
        username: user.username
    })

    return res.status(201).json({
        message: 'User created',
        user,
        token,
    })
  } catch (e) {
    console.error('Registration error', e)
    res.status(500).json({ error: 'Failed to create user' })
  }
}

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        })

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }

        const isValidPassword = await comparePassword(password, user.password)

        if (!isValidPassword)
        {
            return res.status(401).json({error: 'Invalid credentials'})
        }
        const token = await generateToken({
            id: user.id,
            email: user.email,
            username: user.username,
        })

        return res.status(200).json({
            message: 'Login success',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firsName: user.firstName,
                lastName: user.lastName,
                createAt: user.createAt, 
            },
            token,
        })
    } catch (e) {
        console.error('Login error', e)
        res.status(500).json({error: 'Failed to login'})
    }
}