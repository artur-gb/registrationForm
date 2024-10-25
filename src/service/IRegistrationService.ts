import { InjectionKey } from "vue";
import { ConfirmationType } from "../entities/ConfirmationType";

// import { AuthResponse } from "../entities/AuthResponse";

export interface IRegistrationService {
  create(request: createRequestDto): Promise<createResponse>;
  send(request: sendRequestDto): Promise<createResponse>;
  check(request: checkRequestDto): Promise<checkResponse>;
}

export const IRegistrationServiceKey =
  Symbol() as InjectionKey<IRegistrationService>;

export type createRequestDto = {
  phone: string;
  confirmType: ConfirmationType;
};

export type sendRequestDto = {
  session_id: string;
  confirmType: ConfirmationType;
};

export type checkRequestDto = {
  session_id: string;
  code: string;
};

export type createResponse = {
  success: boolean;
  data: {
    session_id: string;
  };
};

export type checkResponse = {
  success: boolean;
  data: {
    verify_token: string;
  };
};
