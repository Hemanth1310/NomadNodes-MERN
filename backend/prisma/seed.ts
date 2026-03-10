import { PrismaClient, tag } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data to avoid unique constraint errors on title
  await prisma.comments.deleteMany()
  await prisma.node.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create a User
  const user = await prisma.user.create({
    data: {
      email: "jane.doe@example.com",
      firstName: "Jane",
      lastName: "Doe",
      password: "hashed_password_here", // In real app, use bcrypt
      imagePath: "https://i.pravatar.cc/150?u=jane",
      isVerified: true,
    },
  })

  // 2. Create a Node with "View" and "Experience" tags
  const node1 = await prisma.node.create({
    data: {
      title: "The Northern Lights in Iceland",
      coordinates: "64.1265,-21.8174",
      imageUrl: "https://images.unsplash.com/photo-1531366930475-5f241159cbef",
      content: "Spent 3 nights waiting, but the green sky was finally breathtaking.",
      visitDate: new Date("2025-01-15"),
      tags: [tag.View, tag.Experience],
      userId: user.id,
    },
  })

  // 3. Create a Node with "Food" tag
  const node2 = await prisma.node.create({
    data: {
      title: "Street Food Tour in Bangkok",
      coordinates: "13.7563,100.5018",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      content: "The spicy basil pork at the night market is a must-try.",
      visitDate: new Date("2025-02-20"),
      tags: [tag.Food],
      userId: user.id,
    },
  })

  // 4. Create a Comment
  await prisma.comments.create({
    data: {
      subject: "Incredible View!",
      description: "I was there last year and it didn't look this clear. You got lucky!",
      userId: user.id,
      nodeId: node1.id,
    },
  })

  console.log("NomadNodes database has been seeded! 📍")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })