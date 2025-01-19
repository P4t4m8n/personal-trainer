import { TProgramDto } from "@/types/program.type";
import { DaysOfWeek } from "@prisma/client";

import sanitizeHtml from "sanitize-html";
import { validationService } from "./validation.util";

const formDataToProgramDto = (formData: FormData): TProgramDto => {
  const data = Object.fromEntries(formData.entries());
  const days = Object.keys(data)
    .filter((key) => key.startsWith("days-"))
    .map((key) => data[key]) as DaysOfWeek[];

  const dto: TProgramDto = {
    name: sanitizeHtml((data?.name as string) || ""),
    startDate: data?.startDate
      ? new Date(data?.startDate as string)
      : undefined,
    endDate: data?.endDate ? new Date(data?.endDate as string) : undefined,
    isActive: data?.isActive === "on",
    days,
  };

  if (data?.traineeId) dto.traineeId = sanitizeHtml(data?.traineeId as string);
  if (data?.trainerId) dto.trainerId = sanitizeHtml(data?.trainerId as string);
  if (data?.id) dto.id = sanitizeHtml(data?.id as string);

  return dto;
};

const validateProgramCreateDto = (programDto: TProgramDto) => {
  const errors: string[] = [];

  const nameErr = validationService.validateExistence("Name", programDto.name);
  if (nameErr) errors.push(nameErr);

  //TODO redo date validation

  // const startDateErr = validationService.validateDate(
  //   "Start Date",
  //   programDto?.startDate
  // );

  // if (startDateErr) errors.push(startDateErr);

  // const endDateErr = validationService.validateDate(
  //   "End Date",
  //   programDto?.endDate
  // );
  // if (endDateErr) errors.push(endDateErr);

  const daysErr = _ValidateDaysOfWeek(programDto?.days);
  if (daysErr) errors.push(daysErr);

  const trainerIdErr = validationService.validateExistence(
    "Trainer Id",
    programDto.trainerId
  );

  if (trainerIdErr) errors.push(trainerIdErr);
  const traineeIdErr = validationService.validateExistence(
    "Trainee Id",
    programDto.traineeId
  );

  if (traineeIdErr) errors.push(traineeIdErr);

  return errors;
};

const _ValidateDaysOfWeek = (
  days?: Array<string | undefined | null | DaysOfWeek>
): string | null => {
  if (!days) {
    return "Days are required.";
  }
  days.forEach((day) => {
    if (!Object.values(DaysOfWeek).includes(day as DaysOfWeek)) {
      return `${day} Is not valid, Please provide a valid day of the week.`;
    }
  });

  return null;
};

export const programServerUtil = {
  formDataToProgramDto,
  validateProgramCreateDto,
};
