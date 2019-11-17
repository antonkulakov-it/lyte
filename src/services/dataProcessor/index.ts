import { API_URL, PER_PAGE } from "./config";
import { TMethods, TEndPoints, TRequestParams, TKeyValue } from "../../types";
import { LoadingStore } from "../../stores/loadingStore";
export class DataProcessor {
	private _loadingStore: LoadingStore;
	private _errorCallback = (e: any) => {};
	private doFetch = async (
		endpointUrl: string,
		method: TMethods = "GET",
		body?: string
	) => {
		const requestParam: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			}
		};
		if (body) {
			requestParam.body = body;
		}
		const promise = new Promise(async (resolve, reject) => {
			try {
				const fetchResult = await fetch(
					`${API_URL}${endpointUrl}`,
					requestParam
				);
				const result = await fetchResult.json();
				return resolve(result);
			} catch (e) {
				reject(e);
			}
		})
		.then(result => {
			return result;
		})
		.catch(error => this._errorCallback(error));
		this._loadingStore.addPromise(promise);
		// this._loadingStore.setLoading(promise);
		const result = await promise.then(result => result);
		// this._loadingStore.unsetLoading();
		return result;
	};

	private doGet = async (
		endpoint: TEndPoints,
		params: TRequestParams = [],
		inlineParams: string = ""
	) => {
		const paramString = params.reduce((result: string, current: TKeyValue) => {
			return (
				result + `${result === "" ? "?" : "&"}${current.key}=${current.value}`
			);
		}, "");
		return await this.doFetch(`${endpoint}${inlineParams}` + paramString);
	};
	constructor(loadingStore:any) {
		this._loadingStore = loadingStore;
	}

	getCategories = async () => {};

	getEvents = async (page: number = 0): Promise<any> => {
		const offset = page <= 1 ? 0 : (page - 1) * 10;
		const result = await this.doGet("/events/", [
			{ key: "limit", value: PER_PAGE },
			{ key: "offset", value: offset }
		]);
		return result;
	};
	getEvent = async (id: string) => {
		return await this.doGet("/events/", [], id + "/");
	};
	getOrganizers = async () => {};
	updateEvent = async () => {};
	createUser = async () => {};
	getUserToken = async () => {
		const response = await fetch(`${API_URL}/users/token/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify({
				username: "use1r@example.com",
				password: "string11"
			})
		});
		const result = await response.json();
		return result;
	};
}
