import {
  checkRequestDto,
  checkResponse,
  createRequestDto,
  createResponse,
  IRegistrationService,
  sendRequestDto,
} from "./IRegistrationService";

export class ApiRegistrationService implements IRegistrationService {
  private apiKey = "09459085-5327-4ae9-85a8-214b7755fc2a";

  async create(request: createRequestDto): Promise<createResponse> {
    const response = await fetch(
      `https://api.kod.mobi/api/v1/message/create?phone=${request.phone}&type=${request.confirmType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": this.apiKey,
        },
        redirect: "follow",
      }
    );
    return await response.json();
  }

  async send(request: sendRequestDto): Promise<createResponse> {
    const response = await fetch(
      `https://api.kod.mobi/api/v1/message/send?session_id=${request.session_id}&type=${request.confirmType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": this.apiKey,
        },
        redirect: "follow",
      }
    );
    return await response.json();
  }

  async check(request: checkRequestDto): Promise<checkResponse> {
    const response = await fetch(
      `https://api.kod.mobi/api/v1/message/check?session_id=${request.session_id}&code=${request.code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": this.apiKey,
        },
        redirect: "follow",
      }
    );
    return response.json();
  }
}
