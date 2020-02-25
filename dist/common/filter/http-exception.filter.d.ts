import { HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Response;
}
