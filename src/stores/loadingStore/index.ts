import { observable, computed, action, decorate } from "mobx";
class LoadingStore {
	promises: Promise<any>[] = [];
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

export { LoadingStore };