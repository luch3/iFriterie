import { NoDataFoundError } from "../models/errors/noDataFoundError";

export async function onlineOnly<T>(
    onlineFn: () => Promise<T>,
    // @ts-ignore
    onlineSucceedCallback?: (arg: T) => void): Promise<T> {
    try {
        const value = await onlineFn();
        if(onlineSucceedCallback) {
            onlineSucceedCallback(value);
        }
        return value;
    } catch(e) {
        await handleNoDataFound(e);
    }
}

export async function onlineFirst<T>(
    offlineFn: () => Promise<T>,
    onlineFn: () => Promise<T>,
    // @ts-ignore
    onlineSucceedCallback?: (arg: T) => void): Promise<T> {
    try {
        const value = await onlineFn();
        if(onlineSucceedCallback) {
            onlineSucceedCallback(value);
        }
        return value;
    } catch(e) {
        if(isOnlineNotFoundError(e)) {
            return await offlineFn().catch(handleNoDataFound);
        }
        throw e;
    }
}

export async function offlineOnly<T>(
    offlineFn: () => Promise<T>
    // @ts-ignore
): Promise<T> {
    try {
        return await offlineFn();
    } catch(e) {
        if(isOfflineNotFoundError(e)) {
            throw new Error("La donnée n'a pas pu être trouvée localement");
        }

        throw e;
    }
}

export async function offlineFirst<T>(
    offlineFn: () => Promise<T>,
    onlineFn: () => Promise<T>,
    onlineSucceedCallback?: (arg: T) => void
    // @ts-ignore
): Promise<T> {
    try {
        return await offlineFn();
    } catch(e) {
        if(isOfflineNotFoundError(e)) {
            const value = await onlineFn().catch(handleNoDataFound);

            if(onlineSucceedCallback) {
                await onlineSucceedCallback(value);
            }
            return value;
        }

        throw e;
    }
}

function handleNoDataFound(e: any) {
    if(isNotFoundError(e)) {
        return Promise.reject(new Error("Vous n'êtes pas connecté à internet"));
    }
    throw e;
}

function isNotFoundError(e: any) {
    return isOnlineNotFoundError(e) || isOfflineNotFoundError(e);
}

export function isOnlineNotFoundError(e: any) {
    return e instanceof Error && (e.message === "Failed to fetch" || e.message === "Network Error" || e.message === "Request timeout");
}

export function isOfflineNotFoundError(e: any) {
    return e instanceof NoDataFoundError;
}