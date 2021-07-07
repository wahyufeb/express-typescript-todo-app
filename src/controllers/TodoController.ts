import { Request, Response } from 'express';
import IController from './ControllerInterface';
import TodoService from '../services/TodoService';

class TodoController implements IController {
	index = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const todos = await service.getAll();

			return res.json({
				message: 'Todos data',
				data: todos,
			});
		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	create = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const todo = await service.save();

			return res.json({
				message: 'Todo created',
				data: todo,
			});
		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	show = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const todo = await service.getOne();

			if (!todo) {
				return res.status(404).json({
					message: 'Todo not found',
				});
			}

			return res.json({
				message: 'Success get todo',
				data: todo,
			});
		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	update = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const updatingTodo = await service.update();

			if (updatingTodo === 0) {
				return res.status(404).json({
					message: 'Failed to update todo',
				});
			}

			return res.json({
				message: 'Success updating todo',
			});
		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};

	delete = async (req: Request, res: Response): Promise<Response> => {
		try {
			const service = new TodoService(req);
			const deletingTodo = await service.delete();

			if (deletingTodo === 0) {
				return res.status(404).json({
					message: 'Failed to delete todo',
				});
			}

			return res.json({
				message: 'Success deleting todo',
			});
		} catch (error) {
			console.log(error);
			return res.json(error);
		}
	};
}

export default new TodoController();
