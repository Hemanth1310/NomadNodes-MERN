import express from "express";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import multer from "multer";
import { nodePostSchema } from "./utils/typechecker";

const router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname.split(".")[0] + "-" + uniqueSuffix + "." + fileExt,
    );
  },
});

const upload = multer({ storage: storage });

router.post("/nodePost", upload.single("image"), async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ errorMessage: "Unauthorized" });
  // 2. File guard
  if (!req.file) {
    return res.status(400).json({ errorMessage: "File not found." });
  }

  // 3. Zod validate body
  const parsed = nodePostSchema.safeParse(req.body);
  if (!parsed.success) {
    console.log("Flag12");
    return res
      .status(400)
      .json({ errorMessage: parsed.error.issues[0].message });
  }

  // 4. Everything from here is fully typed and safe
  const { title, coordinates, content, visitDate, tags } = parsed.data;

  try {
    await prisma.node.create({
      data: {
        title,
        coordinates,
        content,
        imageUrl: req.file.filename,
        visitDate: new Date(visitDate),
        tags,
        userId,
      },
    });
    return res.status(201).json({ message: "Node post created" });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "2002") {
        return res
          .status(401)
          .json({ errorMessage: "Unable to porcess request." });
      }
    }
    console.error("Unexpected Error:", error);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
});

router.get("/userDetails", async (req, res) => {
  const userId = req.user?.userId;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        imagePath: true,
        isVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    return res.status(200).json({
      message: "Login Successful",
      payload: { ...user },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(401).json({ errorMessage: "User not found." });
      }
    }
    console.error("Unexpected Error:", error);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
});

export default router;
