import prisma from "../../prisma";

class AuthService {
  constructor() {}

  register() {
    return "register";
  }

  login() {
    return "login";
  }

  logout() {
    return "logout";
  }

  async me() {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: 1,
        },
      });

      console.log(user);

      return {
        id: 1,
        name: "John Doe",
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthService();
