import { inject } from "vue";
import { IRegistrationService, IRegistrationServiceKey } from "./IRegistrationService";

export const useRegistrationService = () => {
  return inject(IRegistrationServiceKey) as IRegistrationService;
};