import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service';
import { Work } from '../../app/models/work';
import { LicenseProfile } from '../../app/models/licenseProfile';

const licensePurchase = require('../../../../build/contracts/LicensePurchase.json');
const contract = require('truffle-contract');

@Injectable()
export class EthereumService {

    LicensePurchase = contract(licensePurchase);

    constructor(
        private web3Ser: Web3Service,
    ) {
        // Bootstrap the contracts
        this.LicensePurchase.setProvider(web3Ser.web3.currentProvider);
    }

    createWork(account, fingerprint, contributors, splits): Observable<any> {
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    // Calling the function 'createWork' from the contract with respective parameters
                    return instance.createWork(fingerprint, contributors, splits, { from: account, gas: 9900000 });
                })
                .then(value => {
                    // Passing the returned value to the observable
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    getLengthOfWorkDataBase(): Observable<number> {
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    return instance._getWorkDbLength.call();
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }


    approveWork(account, workId): Observable<boolean> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.approveWork(workId, { from: account, gas: 9900000 });
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    getWorkListWithTokenCountFromAddress(account, contributor): Observable<any> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.getWorkListWithTokenCountFromAddress.call(contributor, { from: account, gas: 9900000 });
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    getWorkById(workId): Observable<Work> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.getWorkById.call(workId);
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    getLicenseProfileById(licenseProfileId): Observable<LicenseProfile> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.getLicensePofileById.call(licenseProfileId);
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    getTokenHoldersFromWorkId(workId): Observable<any> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta._getTokenHoldersFromWorkId.call(workId);
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }


    // LicenseBase PART
    createLicenseProfile(workId, price, fingerprint, account): Observable<any> {
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    return instance.createLicenseProfile(workId, price, fingerprint, { from: account, gas: 9900000 });
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    getLicenseProfileListFromWorkId(workId): Observable<any> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.getLicenseProfileListFromWorkId.call(workId);
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    activateLicenseProfile(account, profileId): Observable<boolean> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.approveLicenseProfileActivation(profileId, { from: account, gas: 9900000 });
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    deactivateLicenseProfile(account, profileId): Observable<boolean> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.approveLicenseProfileDeactivation(profileId, { from: account, gas: 9900000 });
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    buyLicenseProfile(account, profileId, price): Observable<any> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.buyLicense(profileId, { from: account, gas: 9900000, gasPrice: 1000000000, value: price });
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    getTotalBalanceFromWorkId(workId, account): Observable<number> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.getTotalBalanceFromWorkIdAndAddress.call(workId, account);
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

    WithdrawFromWorkId(workId, account): Observable<any> {
        let meta;
        return Observable.create(observer => {
            this.LicensePurchase.deployed()
                .then(instance => {
                    meta = instance;
                    return meta.withdrawFromWorkId(workId, { from: account, gas: 9900000, gasPrice: 1000000000 });
                })
                .then(value => {
                    observer.next(value);
                    observer.complete();
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e);
                });
        });
    }

}

