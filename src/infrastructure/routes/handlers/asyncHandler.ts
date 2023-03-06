import { Request, Response, NextFunction } from "express";

export default (fun: Function) => async (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fun(req, res, next)).catch(next);
};
