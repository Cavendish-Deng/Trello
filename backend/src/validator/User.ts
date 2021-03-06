import { 
    Length,
    IsNotEmpty
} from 'class-validator'
import {IsSameValue} from './CustomValidationDecorator'

class UserBody {
    @Length(1, 50, {
        message: '用户名不能为空或者长度不能超过50'
    })
    name: string;

    @IsNotEmpty({
        message: "密码不能为空"
    })
    password: string;
}

export class RegisterBody extends UserBody {
    // 与上面password必须相同
    @IsSameValue('password', {
        message: "两次输入密码不一致"
    })
    rePassword: string;
}

export class LoginBody extends UserBody {
    
}