import { TEntity } from "./app.type";
import { TTraining } from "./training.type";
import { TVideo } from "./video.type";

export type TPersonalTraining = TEntity & {
  training?: Omit<TTraining, "defaultSets">;
  instructionVideos?: TVideo[];
};

export type TPersonalTrainingDto = TEntity &
  Omit<TPersonalTraining, "training"> & {
    trainingId: string;
    programId?: string;
    traineeId: string;
  };
