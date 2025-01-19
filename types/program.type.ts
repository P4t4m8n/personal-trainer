import { DaysOfWeek } from "@prisma/client";
import { TEntity } from "./app.type";
import { TPersonalTraining } from "./personal-training.type";
import { TTrainee } from "./trainee.type";
import { TTrainer } from "./trainer.type";

export type TProgram = TEntity & {
  name?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  isActive?: boolean;
  days?: DaysOfWeek[];
  trainings?: TPersonalTraining[];
  trainee?: TTrainee;
  trainer?: TTrainer;
};

export type TProgramDto = TEntity &
  Omit<TProgram, "trainings" | "trainee" | "trainer"> & {
    traineeId?: string;
    trainerId?: string;
  };
export type TProgramFilter = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  traineeId?: string;
  trainerId?: string;
};
