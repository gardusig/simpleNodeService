export const HEADER_WITH_VALID_CREDENTIALS = {
    username: 'admin',
    password: 'random_password',
}

export const FULL_CLIENT_CONFIG = {
    getAll: true,
    get: true,
    create: true,
    update: true,
    delete: true,
}

export const HEALTH_CHECK_CLIENT_CONFIG = {
    getAll: true,
}

export function getServerUrl() {
    const host = process.env.HOST || 'localhost'
    const port: string = process.env.PORT ?? '3000'
    return `https://${host}:${port}/api`
}
