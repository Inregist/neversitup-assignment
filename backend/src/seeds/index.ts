import authService from "../modules/auth/auth.service";
import orderService from "../modules/order/order.service";
import productService from "../modules/product/product.service";
import prisma from "../prisma";

export const initSeed = async () => {
  console.log("Checking if database is empty...");
  const users = await prisma.user.findMany();
  if (users.length > 0) {
    console.log("Database is not empty, skipping seeding...");
    return;
  }

  console.log("Seeding...");

  console.log("Creating admin user...");
  const adminUser = await authService.register({
    name: "admin",
    email: "admin@shop.com",
    password: "adminadmin",
  });
  await prisma.user.update({
    where: { id: adminUser.id },
    data: { isAdmin: true },
  });

  console.log("Creating normal user...");
  await authService.register({
    name: "user",
    email: "user@shop.com",
    password: "useruser",
  });

  console.log("Creating products...");
  await prisma.product.createMany({
    data: [
      { name: "IPhong 99", description: "The best phone ever", price: 29900 },
      {
        name: "IPhong 99 Pro",
        description: "The best phone ever",
        price: 36900,
      },
      {
        name: "IPhong 99 Pro Max",
        description: "The best phone ever",
        price: 39900,
      },
      {
        name: "IPhong 99 Mini",
        description: "The best phone ever",
        price: 24900,
      },
      {
        name: "Samsoon Galaxy S55",
        description: "The best phone ever",
        price: 27900,
      },
      {
        name: "Samsoon Galaxy S55+",
        description: "The best phone ever",
        price: 30900,
      },
      {
        name: "Samsoon Galaxy S55 Ultra",
        description: "The best phone ever",
        price: 35900,
      },
    ],
  });

  await productService.createProduct({
    name: "NoEar Air",
    description: "The best phone ever",
    price: 29900,
  });

  console.log("Creating orders...");
  orderService.createOrder(1, {
    products: [
      {
        productId: 1,
        quantity: 1,
        unitPrice: 29900,
      },
      {
        productId: 5,
        quantity: 1,
        unitPrice: 27900,
      },
    ],
    userId: 1,
  });

  console.log("Seeding completed!");
};
