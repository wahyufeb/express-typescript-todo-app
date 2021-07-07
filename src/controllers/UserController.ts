import { Request, Response } from "express";
import IController from "./ControllerInterface";

let data: any[] = [
  { id: 1, name: "Chatkamon" },
  { id: 2, name: "Puimek" },
  { id: 3, name: "Kwanrudee" },
  { id: 4, name: "Namtarn" },
]

class UserController implements IController {
  index(req: Request, res: Response) :Response {
    return res.json(data);
  }

  create(req: Request, res: Response) :Response {
    const { name } = req.body;
    data.push({ id:data.length + 1, name });

    return res.json(data);
  }

  show(req: Request, res: Response) :Response {
    const { id } = req.params;
    const user = data.find((item) => item.id === Number(id));

    if(!user) {
      res.json("Id Tidak ditemukan");
    }

    return res.json(user);
  }

  update(req: Request, res: Response) :Response {
    const { id } = req.params;
    const { name } = req.body;

    const user = data.find((item) => item.id === Number(id));
    if(!user) {
      return res.json("Id Tidak ditemukan");
    }
    user.name = name
    return res.json({
      message: "Berhasil diedit",
      data: user
    })
  }

  delete(req: Request, res: Response) :Response {
    const { id } = req.params;
    const user = data.find((item) => item.id === Number(id));
    if(!user) {
      return res.json("Id Tidak ditemukan");
    }

    data = data.filter((item) => item.id !== Number(id))
    return res.json({
      message: "Berhasil dihapus",
      data
    })
  }

}

export default new UserController();