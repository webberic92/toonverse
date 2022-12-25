import { Action, createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, clearAddress, updateAddress } from './actions';

export const initialAddressState = '';




const _addressReducer = createReducer(
	initialAddressState,
	on(updateAddress, (state, { address }) => state = address),
	on(clearAddress, (state) => state = '')
);

export function addressReducer(state: string | undefined, action: Action) {
	return _addressReducer(state, action);
}