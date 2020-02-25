"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.getUser = common_1.createParamDecorator((data, req) => {
    return req.user;
});
//# sourceMappingURL=getUser.decorator.js.map