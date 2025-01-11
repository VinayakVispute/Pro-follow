// @ts-nocheck
export interface Communication {
  type: string;
  date: string;
  notes?: string;
  createdAt: Date;
}

export const isCompanyOverdue = (
  lastCommunicationDate: Date,
  periodicity: string
) => {
  const today = new Date();
  const daysSinceLastCommunication =
    (today.getTime() - lastCommunicationDate.getTime()) / (1000 * 3600 * 24);

  switch (periodicity) {
    case "weekly":
      return daysSinceLastCommunication > 7;
    case "biweekly":
      return daysSinceLastCommunication > 14;
    case "monthly":
      return daysSinceLastCommunication > -1;
    case "quarterly":
      return daysSinceLastCommunication > 90;
    case "yearly":
      return daysSinceLastCommunication > 365;
    default:
      return false;
  }
};

export const isCompanyDueToday = (
  lastCommunicationDate: Date,
  periodicity: string
) => {
  const today = new Date();
  const daysSinceLastCommunication = Math.floor(
    (today.getTime() - lastCommunicationDate.getTime()) / (1000 * 3600 * 24)
  );
  console.log(daysSinceLastCommunication);
  switch (periodicity) {
    case "weekly":
      return daysSinceLastCommunication === 2;
    case "biweekly":
      return daysSinceLastCommunication === 14;
    case "monthly":
      return daysSinceLastCommunication === 30;
    case "quarterly":
      return daysSinceLastCommunication === 90;
    case "yearly":
      return daysSinceLastCommunication === 365;
    default:
      return false;
  }
};

export const calculateNextCommunication = (
  lastCommunication: Communication | undefined,
  communicationMethods: any[],
  periodicity: string
): Communication => {
  const lastCommunicationDate = lastCommunication
    ? new Date(lastCommunication.createdAt)
    : new Date();

  const nextDate = new Date(lastCommunicationDate);
  switch (periodicity) {
    case "weekly":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "biweekly":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "monthly":
      nextDate.setMonth(nextDate.getDate() + 1);
      break;
    case "quarterly":
      nextDate.setMonth(nextDate.getDate() + 1);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getDate() + 1);
      break;
  }
  const lastMethodIndex = communicationMethods.findIndex(
    (method) => method.name === lastCommunication?.method?.name
  );

  const nextMethodIndex = (lastMethodIndex + 1) % communicationMethods.length;

  return {
    name: communicationMethods[nextMethodIndex]?.name || "Email",
    date: nextDate.toISOString(),
  };
};
