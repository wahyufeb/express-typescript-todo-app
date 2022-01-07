import { Request } from "express";
import { db } from "../db/models";

class UserService {
  credentials: {
    id: number;
  };
  body: Request["body"];
  params: Request["params"];

  constructor(req: Request) {
    this.credentials = req.app.locals.credentials;
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async () => {
    const users = await db.users.findAll({
      attributes: ["id", "email", "username", "name"],
    });

    return users;
  }
}

export default UserService;