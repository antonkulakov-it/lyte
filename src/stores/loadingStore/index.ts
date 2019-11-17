import { observable, computed, action, decorate, when } from "mobx";
class LoadingStore {
	promises: Promise<any>[] = [];
	private _errorHandler: (error: any) => void;
	constructor(errorHandler: (error: any) => void) {
		this._errorHandler = errorHandler;
	}
	get loading() {
		if (this.promises.length === 0) {
			return false;
		}
		return true;
	}
	addPromise = (promise: Promise<any>) => {
		this.promises.push(promise);
		Promise.all(this.promises)
			.then(() => {
			})
			.catch(()=>{})
			.finally(this.cleanPromises);
	}
	cleanPromises = () => {
		this.promises = [];
	}
}

decorate(LoadingStore, {
	loading: computed,
	promises: observable,
	addPromise: action,
});

const loadingStore = new LoadingStore((...args)=>{console.log(args)});
// setTimeout(() => {console.log("addPromise");loadingStore.addPromise(new Promise((res, rej)=>{setTimeout(()=>{console.log(loadingStore.promises); res();}, 4000)}));}, 4000);
export default loadingStore;
export { LoadingStore };


  