const UserModels = require('../models/user.models');
const configurationSql = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { DB_NAME, DB_USER, DB_PSW } = process.env;
const UserControllers = {
    
    loginGet: async (req, res) => {
        
    },

    login: async (req, res) => {
        try {
            await sql.connect(configurationSql)
            const { email, mdp } = req.body;
            console.log(email);
            const userQuery = await sql.query `SELECT * FROM labo WHERE email = ${email}`
            console.log(userQuery)
            const user = await userQuery.recordset[0];

            if (user.jwt) {
                return res.status(200).redirect('/');
            }
            else if (mdp) {
                const BonPassword = bcrypt.compareSync(mdp, user.mdp);
                if (!BonPassword) {
                    return res.status(401).send('Mot de passe incorrect');
                }
                const id = user.userId;
                const payload = {
                    userId: id,
                    email: email,
                };
                const option = { expiresIn: '3h' };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, option);
                const clientJwt = await UserModels.addJwtToken({token ,id});
                if (clientJwt) {
                    res.setHeader('Authorization', `Bearer ${token}`);
                    res.status(200).json({token});
                }
            }
            if (!user) {
                res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(404);
        }
    },

    registerPost: async (req, res) => {
       
    },

    register: async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET;
            if (token == null) {
                return res.sendStatus(401);
            }
            req.user = payload;
            res.send('Accès autorisé');
        } catch (error) {
            res.sendStatus(404);
        }
    },
};

module.exports = UserControllers;