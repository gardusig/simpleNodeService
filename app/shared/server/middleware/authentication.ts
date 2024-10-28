import { HttpStatus, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(
      `Received request at url: ${req.originalUrl}` +
        `, method: ${req.method}` +
        `, header: ${JSON.stringify(req.headers)}` +
        `, params: ${JSON.stringify(req.params)}` +
        `, body: ${JSON.stringify(req.body)}`,
    );
    const { username, password } = req.headers;
    if (!username || !password) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Username and password headers are required" });
    }
    if (username !== "admin") {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "User does not have permission" });
    }
    next();
  }
}
