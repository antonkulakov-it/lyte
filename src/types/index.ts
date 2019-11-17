export type TProvider = 1;

export type TError = {
  type: "error" | "message";
  message: string;
};

export interface IDataProcessor {
  getEvents: (page: number, perPage: number) => Promise<any>;
  getEvent: (id: string) => Promise<any>;
  getOrganizers: () => any;
  updateEvent: () => any;
  createUser: () => any;
  getUserToken: () => Promise<any>;
  getCategories: () => {};
}

export interface ICategory {
  id: number;
  name: string;
  provider: TProvider;
}

export interface IOrganizer {
  id: number;
  name: string;
  uri?: string;
  logo_uri?: string;
  provider: TProvider;
}
export interface IEvent {
  id: number;
  name: string;
  provider: number;
  uri?: string;
  category: ICategory;
  start_time: string;
  finish_time: string;
  ticket_price_currency: string;
  min_ticket_price: string;
  max_ticket_price: string;
  logo_uri: string;
  description_plain: string;
  description_html: string;
  provider_specific_data: string;
}

export type TKeyValue = {
  key: string;
  value: string | number;
};

export type TRequestParams = TKeyValue[];

export type TMethods = "GET" | "POST" | "PUT" | "PATCH";

export type TEndPoints =
  | "/categories/"
  | "/events/"
  | "/organizers/"
  | "/users/";

export type TPagerProps = {
  endPoint: string;
  total: number;
  currentPage: number;
  perPage: number;
  className: string;
}

export type TPagesHtmlProps = {
  endPoint: string;
  total: number;
  currentPage: number;
  perPage: number;
  className: string;
  activeClass: string;
}