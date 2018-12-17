import { UPDATE_USER } from "../constants/action-types";

export const updateUser = user => ({ type: UPDATE_USER, payload: user})