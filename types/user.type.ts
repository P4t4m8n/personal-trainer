import { TEntity } from "./app.type";
import { TTrainee } from "./trainee.type";
import { TTrainer } from "./trainer.type";

export type TUser = TEntity & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: number | null;
  imgUrl?: string| null;
  trainer?: TTrainer;
  trainee?: TTrainee;
};

export type TUserUpdateDto = TEntity & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: number | null;
  password?: string;
  imgUrl?: string;
  googleId?: string;
};

export type TUserCreateDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | null;
  password?: string;
  imgUrl?: string;
  googleId?: string;
};

export type TUserFilter = {
  email?: string;
  phone?: string;
  uniquePhoneId?: string;
};
