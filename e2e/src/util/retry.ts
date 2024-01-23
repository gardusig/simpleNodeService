type RetryFunction<T> = (...args: any[]) => Promise<T>;

const MAX_RETRIES = 3

export async function retry<T>(fn: RetryFunction<T>, ...params: any[]): Promise<T> {
    const errors: string[] = []
    for (let retries = 0; retries < MAX_RETRIES; retries += 1) {
        if (retries > 0) {
            const sleepTimeMs = 1 << retries
            const sleepTimeSeconds = sleepTimeMs * 1000
            await new Promise(resolve => setTimeout(resolve, sleepTimeSeconds))
        }
        try {
            return await fn(...params)
        }
        catch (error) {
            console.error(`Attempt ${retries + 1} failed with error: ${error.message}`);
            errors.push(error.message)
        }
    }
    throw Error(`Attempt failed with errors: ${errors.join(', ')}`)
}