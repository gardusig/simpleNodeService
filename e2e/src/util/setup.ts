export const getServerUrl = () => {
    const host = process.env.HOST || 'localhost'
    const port = parseInt(process.env.PORT, 10) || 3000
    return `http://${host}:${port}/api`
}