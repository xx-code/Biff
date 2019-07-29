import SQLite from 'react-native-sqlite-storage';
import Account from './model/account';
import Record from './model/record';

export default class DataBase {
    constructor(){
        this.db = SQLite.openDatabase({name: 'dataBase.db', location: 'default'}, () =>{});

        this.db.transaction(txn => {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Accounts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color VARCHAR(50))',
                [],
                () =>{ }
            ),
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Records(id INTEGER PRIMARY KEY AUTOINCREMENT, accountId INTEGER, amount INTEGER, description TEXT, date VARCHAR(100), time VARCHAR(100), category TEXT, transfert INTEGER, type VARCHAR(250), FOREIGN KEY(accountId) REFERENCES Accounts(id))',
                [],
                () =>{ }
            ),
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Budgets(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, limitAmount INTEGER, timeScope TEXT, targetRecord TEXT)',
                [],
                () =>{ }
            ),
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Objectifs(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, reachAmount INTEGER, category TEXT, amount INTEGER)',
                [],
                () =>{ }
            )
        })
    }

    // get each acconts with all records of that
    getAccounts = () => {
        return new Promise(
            (resolve, reject) => {
                const accounts = [];
                this.db.transaction(txn => {
                    txn.executeSql('Select id, name, color from Accounts', [], (tx1, res) => {
                        if (res.rows.length > 0) {
                            for (let i = 0; i < res.rows.length; i++) {
                                let account = new Account(
                                    res.rows.item(i).id.toString(),
                                    res.rows.item(i).name.toString(),
                                    res.rows.item(i).color.toString(),
                                )
                                accounts.push(account)       
                            }
                        }
                    }, err => console.log(err)),
                    txn.executeSql('Select id, accountId, amount, description, date, time, category, transfert, type from Records', [], (tx2, res) => {
                        if (res.rows.length > 0) {
                            for (let e = 0; e < accounts.length; e++) {
                                
                                for (let i = 0; i < res.rows.length; i++) { 
                                    //(res.rows.item(i).accountId.toString())
                                    if (accounts[e].key === res.rows.item(i).accountId.toString()) {
                                        accounts[e].setRecord({
                                            id: res.rows.item(i).id.toString(), 
                                            accountId: res.rows.item(i).accountId.toString(), 
                                            amount: res.rows.item(i).amount, 
                                            description: res.rows.item(i).description.toString(), 
                                            date: res.rows.item(i).date.toString(), 
                                            time: res.rows.item(i).time.toString(), 
                                            category: res.rows.item(i).category.toString(), 
                                            transfert: res.rows.item(i).transfert,
                                            type: res.rows.item(i).type.toString(),
                                        })
                                    }
                                }
                                accounts[e].setAmount()
                            }                                     
                            
                        }
                        resolve(accounts) 
                    }, err => console.log(err))
                    
                })
            }
        )
    }

    // get record by id 
    getRecord = (id) => {
        return new Promise(
            (resolve, reject) => {
                this.db.transaction(txn => {
                    txn.executeSql('Select id, accountId, amount, description, date, time, category, transfert, type from Records where id = (?)', [id], (tx2, res) => {
                        if(res.rows.length > 0) {
                            let record = new Record(
                                res.rows.item(0).id.toString(), 
                                res.rows.item(0).accountId.toString(), 
                                res.rows.item(0).amount, 
                                res.rows.item(0).description.toString(), 
                                res.rows.item(0).date.toString(), 
                                res.rows.item(0).time.toString(), 
                                res.rows.item(0).category.toString(), 
                                res.rows.item(0).transfert,
                                res.rows.item(0).type.toString()
                            )

                            resolve(record)
                        } else {
                            resolve(null)
                        }
                    }, err => console.log(err))
                })
            }
        )
    }

    // get records buy account id
    getRecordsBuyAccount = (idAccount) => {
        return new Promise(
            (resolve, reject) => {
                const records = [];
                this.db.transaction(txn => {
                    txn.executeSql('Select id, accountId, amount, description, date, time, category, transfert, type from Records where accountId = (?)', [idAccount], (tx2, res) => {
                        if(res.rows.length > 0) {
                            for (let i = 0; i < res.rows.length; i++) { 
                                let record = new Record(
                                    res.rows.item(i).id.toString(), 
                                    res.rows.item(i).accountId.toString(), 
                                    res.rows.item(i).amount, 
                                    res.rows.item(i).description.toString(), 
                                    res.rows.item(i).date.toString(), 
                                    res.rows.item(i).time.toString(), 
                                    res.rows.item(i).category.toString(), 
                                    res.rows.item(i).transfert,
                                    res.rows.item(i).type.toString()
                                )
                                records.unshift(record)
                            }
                        }
                        resolve(records)
                    }, err => console.log(err))
                })
            }
        )
    }

    // get all records
    getAllRecords = () => {
        return new Promise(
            (resolve, reject) => {
                const records = [];
                this.db.transaction(txn => {
                    txn.executeSql('Select id, accountId, amount, description, date, time, category, transfert, type from Records', [], (tx2, res) => {
                        if (res.rows.length > 0) {
                            for (let i = 0; i < res.rows.length; i++) {
                                let record = new Record(
                                    res.rows.item(i).id.toString(), 
                                    res.rows.item(i).accountId.toString(), 
                                    res.rows.item(i).amount, 
                                    res.rows.item(i).description.toString(), 
                                    res.rows.item(i).date.toString(), 
                                    res.rows.item(i).time.toString(), 
                                    res.rows.item(i).category.toString(), 
                                    res.rows.item(i).transfert,
                                    res.rows.item(i).type.toString()
                                )
                                records.unshift(record)
                            }
                            resolve(records)
                        }
                    }, err => console.log(err))
                })
            }
        )
    }

    // set account
    setAccount = (account) => {
        return new Promise(
            (resolve, reject) => {
                this.db.transaction(txn => {

                    txn.executeSql('Insert Into Accounts (name, color) values (?, ?)', [account.name, account.color], (tx, res) => {
                        if (res.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    },
                    err => {
                        console.warn(err)
                        resolve(false)
                    })
                })
            }
        )
    }

    // delete account
    deleteAccount = (id) => {
        return new Promise(
            (resolve, reject) => {
                this.db.transaction(txn => {
                    txn.executeSql('Delete from Records where accountId = (?)', [id], (tx, res) => {
                        //(res)
                        tx.executeSql('Delete from Accounts where id = (?)', [id], (tx2, res) => {
                            if (res.rowsAffected > 0) {
                                resolve(true)
                            } else {
                                resolve(false)
                            } 
                        }, err => {
                            //(err)
                            resolve(false)
                        })
                    },
                    err => {
                        console.log(err)
                        resolve(false)
                    })
                })
            }
        )
    }

    // modify account
    modifyAccount = (id, account) => {
        return new Promise(
            (resolve, reject) => {
                this.db.transaction(txn => {
                    txn.executeSql('Update Accounts Set name = (?), color = (?) where id = (?)', [account.name, account.color, id], (tx, res) => {
                        if (res.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }, err => {
                        //(err)
                        resolve(false)
                    })
                })
            }
        )
    }

    /// add record
    addRecord = (record) => {
        return new Promise(
            (resolve, reject) => {
                //(record)
                this.db.transaction(txn => {
                    txn.executeSql('Insert Into Records (accountId, amount, description, date, time, category, transfert, type) values (?, ?, ?, ?, ?, ?, ?, ?)', 
                        [record.accountId, record.amount, record.description, record.date, record.time, record.category, record.transfert, record.type], (tx, res) => {
                        
                        if (res.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }, err => {
                        resolve(false)
                    })
                })
            }
        )
    }

    // modify record
    modifyRecord = (id, record) => {
        return new Promise(
            (resolve, reject) => {
                this.db.transaction(txn => {
                    //("id: " + id )
                    //(record)
                    txn.executeSql('Update Records Set amount = (?), description = (?), date = (?), time = (?), category = (?), transfert = (?), type = (?) where id = (?)',
                                    [record.amount, record.description, record.date, record.time, record.category, record.transfert, record.type, id], (tx, res) => {
                        if (res.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }, err => {
                        console.log(err)
                        resolve(false)
                    })
                })
            }
        )
    }

    // delete record
    deleteRecord = (id) => {
        return new Promise(
            (resolve, reject) => {
                this.db.transaction(txn => {
                    txn.executeSql('Delete from Records where id = (?)', [id], (tx, res) => {
                        if (res.rowsAffected > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }, err => {
                        //(err)
                        resolve(false)
                    })
                })
            }
        )
    }
} 