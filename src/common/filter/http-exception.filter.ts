import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response, Request } from "express";
//catch the exception name HttpException
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception:HttpException,host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        //this is the return format of the httpException
        return response.status(status).json({
            statusCode:status,
            timestamp:new Date().toISOString,
            path: request.url,
        })
    }
}