export type TargetFormData = {
    id?: number;
    目标内容: string;
    计划完成时间: number | null;
    用户名: string;
    完成时间?: number;
    备注?: string;
}

export type TargetItem = Required<TargetFormData> & {
    计划完成时间: number;
};

export type User = {
    id: number,
    用户名: string;
    邮箱: string;
}

declare global {
    interface Window { $message: any; }
}

export type LoginFormData = {
    用户名: string;
    密码: string;
}

export type LoginUser = {
    用户名: string;
}
