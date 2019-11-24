import { API_URL, PER_PAGE } from "./config";
import { TMethods, TRequestParams, TKeyValue } from "../../types";
import { LoadingStore } from "../../stores/loadingStore";
import { END_POINTS } from "./endPoints";

const PERSIST_STORAGE_PREFIX = "my-app-";
const PS_KEY = PERSIST_STORAGE_PREFIX + "token";
const STORAGE = sessionStorage;

export class DataProcessor {
	private _loadingStore: LoadingStore;
	private _errorCallback: (e: any) => void;
	private _shouldRefresh: boolean = false;
	private doFetch = async (
		endpointUrl: string,
		method: TMethods = "GET",
		body?: string,
		headers?: {[key: string]: string}
	): Promise<any> => {
		const token = this.getPersistedUserToken();
		const requestParam: RequestInit = {
			method,
			headers: Object.assign({
				"Content-Type": "application/json;charset=utf-8"
			}, token ? { "Authorization": `Token ${token}` } : {}, headers)
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
				if (!fetchResult.ok) {
					throw new Error(fetchResult.statusText);
				}
				const result = await fetchResult.json();
				return resolve(result);
			} catch (e) {
				reject(e);
			}
		})
		.catch(error => this._errorCallback(error));
		this._loadingStore.addPromise(promise);
		const result = await promise.then(result => result);
		return result;
	};

	private doGet = async (
		endpoint: string,
		params: TRequestParams = [],
		inlineParams: string = ""
	): Promise<any> => {
		const paramString = params.reduce((result: string, current: TKeyValue) => {
			return(
				result + `${result === "" ? "?" : "&"}${current.key}=${current.value}`
			);
		}, "");
		this._shouldRefresh = false;
		return await this.doFetch(`${endpoint}${inlineParams}` + paramString);
	};

	private doPost = async (
		endpoint: string,
		params: any
	): Promise<any> => {
		this._shouldRefresh = true;
		return await this.doFetch(endpoint, "POST", JSON.stringify(params));
	}

	private doPatch = async (
		endpoint: string,
		params: any
	): Promise<any> => {
		this._shouldRefresh = true;
		return await this.doFetch(endpoint, "PATCH", params);
	}

	constructor(loadingStore: LoadingStore, errorCallback = (e: any) => {console.log(e)}) {
		this._loadingStore = loadingStore;
		this._errorCallback = errorCallback;
	}

	getCategories = async (page: number = -1) => {
		const offset = page <= 1 ? 0 : (page - 1) * 10;
		const result = await this.doGet(END_POINTS.CATEGORIES, [
			{ key: "limit", value: page > 0 ? PER_PAGE : -1 },
			{ key: "offset", value: offset }
		]);
		return result;
	};

	getCategory = async (id: string) => {
		return await this.doGet(END_POINTS.CATEGORIES, [], id + "/");
	};

	updateCategory = async (id: string, data: {[key: string]: string}) => {
		this.doPatch(`${END_POINTS.CATEGORIES}${id}/`, JSON.stringify(data));
	};

	getOrganizers = async (page: number = -1) => {
		const offset = page <= 1 ? 0 : (page - 1) * 10;
		const result = await this.doGet(END_POINTS.ORGANIZERS, [
			{ key: "limit", value: page > 0 ? PER_PAGE : -1 },
			{ key: "offset", value: offset }
		]);
		return result;
	};

	getOrganizer = async (id: string) => {
		return await this.doGet(END_POINTS.ORGANIZERS, [], id + "/");
	};

	updateOrganizer = async (id: string, data: {[key: string]: string}) => {
		this.doPatch(`${END_POINTS.ORGANIZERS}${id}/`, JSON.stringify(data));
	};

	getEvents = async (page: number = -1): Promise<any> => {
		const offset = page <= 1 ? 0 : (page - 1) * 10;
		const result = await this.doGet(END_POINTS.EVENTS, [
			{ key: "limit", value: PER_PAGE },
			{ key: "offset", value: offset }
		]);
		return result;
	};

	getEvent = async (id: string) => {
		return await this.doGet(END_POINTS.EVENTS, [], id + "/");
	};

	updateEvent = async (id: string, data: {[key: string]: string}) => {
		this.doPatch(`${END_POINTS.EVENTS}/${id}/`, JSON.stringify(data));
	};

	getPersistedUserToken = (): string | null => {
		return STORAGE.getItem(PS_KEY);
	}

	setPersistedUserToken = (token: string) => {
		STORAGE.setItem(PS_KEY, token);
	}

	dropToken = () => {
		STORAGE.removeItem(PS_KEY);
	}

	getUserToken = async (email: string, password: string): Promise<any> => {
		const result = await this.doPost("/users/token/", {
			username: email,
			password: password
		});
		return result;
	};

	registerUser = async (email: string, password: string): Promise<any> => {
		const result = await this.doPost("/users/register/", {
			username: email,
			password: password
		});
		return result;
	};
	// it used to data when we know about changes
	shouldRefresh = () => this._shouldRefresh;
}
