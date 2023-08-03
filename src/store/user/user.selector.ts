import { IUser } from "../../models/IUser";
import { IRootState } from "../root-reducer";

export const selectCurrentUser = (state: IRootState): IUser | null => state.user.user;
