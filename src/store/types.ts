
import type { RootState } from '.'
import { FETCH_STATE } from './constants'

export type FetchStatus = (typeof FETCH_STATE)[keyof typeof FETCH_STATE]
export type RootStateSelector = (state: RootState) => Partial<RootState>
