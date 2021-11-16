export const enum Endpoints {
    CreateTenants = 'tenant/command/create',
    CreateUser = 'user/command/create',
    GetAllTenants = 'tenant/query/tenants',
    GetAllTenantOptions = 'tenant/query/tenants/options',
    GetAllUsers = 'user/query/users',
    GetCurrentUser = 'user/me',
    Login = 'authentication/login',
    Revoke = 'authentication/revoke',
    RecoveryPassword = 'user/command/forgot-password-restore',
    ResetPassword = 'user/command/restore-password-by-code',
    UpdateUser = 'user/command/update',
    UserInfo = 'api/userinfo',
    ExamTitles = 'examtitles',
    ExamQuestions = 'examquestions'
}
