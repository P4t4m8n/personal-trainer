import { TTraineeMetricsDto } from "@/types/trainee.type";
import { validationService } from "@/utils/server/validation.util";

export const validateMetricsDto = (
  metricsDto: TTraineeMetricsDto
): string[] => {
  const errors: string[] = [];

  const heartRateError = validationService.validateNumbers(
    "Heart rate",
    metricsDto?.heartRate
  );
  if (heartRateError) errors.push(heartRateError);

  const weightError = validationService.validateNumbers(
    "Weight",
    metricsDto?.weight
  );
  if (weightError) errors.push(weightError);

  const heightError = validationService.validateNumbers(
    "Height",
    metricsDto?.height
  );
  if (heightError) errors.push(heightError);

  const ageError = validationService.validateNumbers("Age", metricsDto?.age);
  if (ageError) errors.push(ageError);

  const bloodPressureSystoleError = validationService.validateNumbers(
    "Blood pressure systole",
    metricsDto?.bloodPressureSystole
  );
  if (bloodPressureSystoleError) errors.push(bloodPressureSystoleError);

  const bloodPressureDiastoleError = validationService.validateNumbers(
    "Blood pressure diastole",
    metricsDto?.bloodPressureDiastole
  );
  if (bloodPressureDiastoleError) errors.push(bloodPressureDiastoleError);

  const dateError = validationService.validateDate("Date", metricsDto?.date);
  if (dateError) errors.push(dateError);

  const traineeIdError = validationService.validateExistence(
    "traineeId",
    metricsDto?.traineeId
  );
  if (traineeIdError) errors.push(traineeIdError);

  return errors;
};
