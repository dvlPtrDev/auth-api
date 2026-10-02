import { databaseErrorMapper } from "../mappers/prisma.mapper"
import { success } from "../response/response.helper"
import { ErrorResult, SuccessResult } from "../response/response.schema"

export async function safeDatabaseOperation<T>(callback: () => Promise<T>): Promise<SuccessResult<T> | ErrorResult> {
    try {
        return success(await callback())
    } catch (err) {
        console.log(err)
        return databaseErrorMapper(err)
    }
}