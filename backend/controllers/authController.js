const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO users(name,email,password) VALUES(?,?,?)";

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message: "User Registered Successfully"
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }
};

exports.login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User Not Found"
                });
            }

            const user = result[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(401).json({
                    message: "Invalid Password"
                });

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                "flower_secret_key",
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                message: "Login Success",
                token
            });

        }
    );
};