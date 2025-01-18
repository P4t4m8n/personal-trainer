import { TTraineeMetricsDto } from "@/types/trainee.type";
import sanitizeHtml from "sanitize-html";

const formDataToMetricsDto = (formData: FormData): TTraineeMetricsDto => {
  const heartRate = +sanitizeHtml(formData.get("heartRate")?.toString() || "");
  const weight = +sanitizeHtml(formData.get("weight")?.toString() || "");
  const height = +sanitizeHtml(formData.get("height")?.toString() || "");
  const age = +sanitizeHtml(formData.get("age")?.toString() || "");
  const bloodPressureSystole = +sanitizeHtml(
    formData.get("bloodPressureSystole")?.toString() || ""
  );
  const bloodPressureDiastole = +sanitizeHtml(
    formData.get("bloodPressureDiastole")?.toString() || ""
  );
  const date = new Date(sanitizeHtml(formData.get("date")?.toString() || ""));

  const traineeId = sanitizeHtml(formData.get("traineeId")?.toString() || "");

  return {
    heartRate,
    weight,
    height,
    age,
    bloodPressureSystole,
    bloodPressureDiastole,
    date,
    traineeId,
  };
};

export const metricsServerUtil = {
  formDataToMetricsDto,
};
