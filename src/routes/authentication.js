import express from "express";
import jwt from "jsonwebtoken";
import { Users } from "../database/schema.js";
import { sql } from "drizzle-orm";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const { userData } = req.body;

    // !!check if it is taken for each
    if (!userData.username) {
      return res.status(400).json({ error: "Invalid username." });
    } else if (!userData.email) {
      return res.status(400).json({ error: "Invalid email." });
    } else if (!userData.password) {
      return res.status(400).json({ error: "Invalid password." });
    }

    let user;
    try {
      // !! CHECK THIS THE RETURNING ID IS CORRECT??
      user = await db
        .insert(Users)
        .values({
          userEmail: userData.email,
          userName: userData.username,
          userPassword: userData.password,
        })
        .$returningId();
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Email already exists." });
      }
      console.error("Error inserting user into MySQL:", err);
      return res.status(500).json({ error: "Failed to create user" });
    }

    const token = jwt.sign({ userID: user[0].userID }, "your-secret-key", {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error handling signup:", error);
    res.status(500).json({ error: "Failed to handle signup" });
  }
});

router.post("/login", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const { userData } = req.body;
    if (!userData.email || !userData.password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await db
      .select()
      .from(Users)
      .where(
        sql`${Users.userEmail} = ${userData.email} and ${Users.userPassword} = ${userData.password}`
      );

    if (user.length > 0) {
      const token = jwt.sign({ userID: user[0].userID }, "your-secret-key", {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({ token, userName: user[0].userName });
    } else {
      return res.status(400).json({ error: "Email/password is incorrect." });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.get("/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "your-secret-key", (err, decoded) => {
      if (err) {
        return res.status(200).json({ authenticated: false });
      }
      return res.status(200).json({ authenticated: true });
    });
  } else {
    return res.status(200).json({ authenticated: false });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully." });
});
export default router;
