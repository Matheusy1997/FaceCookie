import { Request, Response } from 'express';
export declare const getUsers: (_req: Request, res: Response) => Promise<void>;
export declare const getUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map