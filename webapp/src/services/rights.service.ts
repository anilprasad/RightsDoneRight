import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

//const workbaseArtifacts = require('../../../build/contracts/WorkBase.json');
const tokenownershipArtifacts = require('../../../build/contracts/TokenOwnership.json');
const contract = require('truffle-contract');

@Injectable()
export class RightsService {

    //WorkBase = contract(workbaseArtifacts);
    TokenOwnership = contract(tokenownershipArtifacts);

  constructor(
  	private web3Ser: Web3Service,
  	) { 
  	// Bootstrap the contracts
      this.TokenOwnership.setProvider(web3Ser.web3.currentProvider);
    //   this.TokenOwnership.setProvider(web3Ser.web3.currentProvider);
    
  }

  // PART: Workbase
  createWork(account, typeOfWork: string, fingerprint: number, contributors, splits): Observable<any>{
    //let meta;
    return Observable.create(observer => {
        this.TokenOwnership.deployed()
        .then(instance => {
            //meta = instance;
            return instance.createWork(typeOfWork, fingerprint, contributors, splits, {from: account, gas:6720000});
        })
        .then(value => {
            observer.next(value)
            observer.complete()
        })
        .catch(e => {
            console.log(e);
            observer.error(e)
        });
    })
  }

  getLengthOfWorkDataBase(): Observable<number> {
    //let meta;
    return Observable.create(observer => {
        this.TokenOwnership.deployed()
        .then(instance => {
            //meta = instance;
            //console.log(meta.getLengthOfWorkDataBase.call({from: account}));
            return instance.getLengthOfWorkDataBase.call();
        })
        .then(value => {
            observer.next(value)
            observer.complete()
        })
        .catch(e => {
            console.log(e);
            observer.error(e)
        });
    })
  }

  getWorkListWithTokenCountFromAddress(account, contributor): Observable<any> {
    let meta;
    return Observable.create(observer => {
        this.TokenOwnership.deployed()
        .then(instance => {
            meta = instance;
            return meta.getWorkListWithTokenCountFromAddress.call(contributor, {from: account, gas:6720000});
        })
        .then(value => {
            observer.next(value)
            observer.complete()
        })
        .catch(e => {
            console.log(e);
            observer.error(e)
        });
    })
  }

  getWorkById(workId): Observable<any> {
    let meta;
    return Observable.create(observer => {
        this.TokenOwnership.deployed()
        .then(instance => {
            meta = instance;
            return meta.getWorkById.call(workId);
        })
        .then(value => {
            observer.next(value)
            observer.complete()
        })
        .catch(e => {
            console.log(e);
            observer.error(e)
        });
    })
  }
}