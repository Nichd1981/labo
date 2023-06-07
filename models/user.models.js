const configurationSql = require('../db/database');
const sql = require('mssql');

const UserModel = {

    getAll: async () => {
        try {
            const requete = await sql.query `SELECT * FROM labo`
            return requete;
        } catch (error) {
            res.status(404);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { userId } = data;
            const requete = await sql.query `SELECT * FROM labo WHERE userId = ${user}`
            return requete;
        } catch (error) {
            res.status(404);
        }
    },

    createUser: async (req, res) => {
        try {
            await configurationSql.connect();
            const hashedPassword = await bcrypt.hashedSync(data.mdp, 10);
            const { prenom, nom, email, mdp } = data;
            const requete = await sql.query `INSERT INTO labo (prenom, nom, email, mdp) VALUES ('${prenom}', '${nom}', '${email}', '${hashedPassword}')`
            if (requete) {
                res.send('Compte créé avec succès').status(200);
            }
        } catch (error) {
            res.send(error).status(404);
        }
    },

    updateUser: async (req, res) => {
        try {
            await sql.connect(configurationSql);

            const {prenom, nom, email, newPassword, oldPassword} = req.body;

            const userQuery = await sql.query `SELECT * FROM labo WHERE userId ${ID}`
            const user = userQuery.recordset[0];

            let hashedPassword;
            if (newPassword && oldPassword) {
                const ifPasswordValid = bcrypt.compareSync(oldPassword, user.mdp);
                
                if(!ifPasswordValid) {
                    return res.status(401).send('Mot de passe invalide');
                }
                else {
                    hashedPassword = bcrypt.hashSync(newPassword, 10);
                }
            }
            if (!user) {
                res.send('Pas d utilisateur existant').Status(404);
            }

            let update;

            if (prenom && nom && email && hashedPassword) {
                update = sql.query `UPDATE userId SET prenom = ${prenom}, nom = ${nom}, email = ${email}, mdp = ${mdp} 
                WHERE userId = ${user}`
            }
            else if (prenom && nom && email) {
                update = sql.query `UPDATE userId SET prenom = ${prenom}, nom = ${nom}, email = ${email} 
                WHERE userId = ${user}`
            }
            else if (prenom && nom && hashedPassword) {
                update = sql.query `UPDATE userId SET prenom = ${prenom}, nom = ${nom}, mdp = ${mdp} 
                WHERE userId = ${user}`
            }
            else if (prenom && nom) {
                update = sql.query `UPDATE userId SET prenom = ${prenom}, nom = ${nom}  
                WHERE userId = ${user}`
            }
            else if (prenom && email && hashedPassword) {
                update = sql.query `UPDATE UserId SET prenom = ${prenom}, email = ${email}
                WHERE userId = ${user}`
            }
            else if (prenom && email) {
                update = sql.query `UPDATE userId SET prenom = ${prenom}, email = ${email}
                WHERE userId = ${user}`
            }
            else if (nom && email && hashedPassword) {
                update = sql.query `UPDATE userId SET nom = ${nom}, email = ${email}
                WHERE userId = ${user}`
            }
            else if (nom && email) {
                update = sql.query `UPDATE userId SET nom = ${nom}, email = ${email}
                WHERE userId = ${user}`
            }
            else if (prenom && hashedPassword) {
                update = sql.query `UPDATE userId SET prenom = ${prenom}, mdp = ${mdp} 
                WHERE userId = ${user}`
            }
            else if ( prenom) {
                update = sql.query `UPDATE userId SET prenom = ${prenom}
                WHERE userId = ${user}`
            }
            else if (nom && hashedPassword) {
                update = sql.query `UPDATE userId SET nom = ${nom}, mdp = ${mdp} 
                WHERE userId = ${user}`
            }
            else if (nom){
                update = sql.query `UPDATE userId SET nom = ${nom}
                WHERE userId = ${user}`
            }
            else if (email && hashedPassword) {
                update = sql.query `UPDATE userId SET email = ${email}, mdp = ${mdp} 
                WHERE userId = ${user}`
            }
            else if (email) {
                update = sql.query `UPDATE userId SET email = ${email} 
                WHERE userId = ${user}`
            }
            else if (hashedPassword) {
                update = sql.query `UPDATE userId SET mdp = ${mdp} 
                WHERE userId = ${user}`
            }
            if (update){
                const result = await update;
                if (result) {
                    res.send('Modification éffectuée').status(200);
                }
            }
        } catch (err) {
            res.sendStatus(404);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const delCompte = await sql.query `DELETE FROM labo WHERE userId = ${user}`
            if (delCompte) {
                res.send('Compte supprimée').status(200);
            }
        } catch (error) {
            res.status(404);
        }
    },

    addJwtToken: async (req, res) => {
        try {
            const { token, userId } = data;
            const requete = await sql.query `UPDATE labo SET token = ${token} WHERE userId = ${user}`
            return requete;
        } catch (error) {
            res.status(404);
        }
    },

};

module.exports = UserModel;