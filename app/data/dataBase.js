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
                'CREATE TABLE IF NOT EXISTS Records(id INTEGER PRIMARY KEY AUTOINCREMENT, accountId INTEGER, description TEXT, date VARCHAR(100), time VARCHAR(100), category TEXT, transfert INTEGER, FOREIGN KEY(accountId) REFERENCES Accounts(id))',
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

    getAccounts = () => {
        return new Promise(
            (resolve, reject) => {
                this.db.transaction(txn => {
                    txn.executeSql('Select id, name, color from Accounts', [], (tx, res) => {
                        const result = [];
                        console.log(res.rows)
                        if (res.rows.length > 0) {
                            for (let i = 0; i < res.rows.length; i++) {
                                let account = new Account(
                                    res.rows.item(i).id.toString(),
                                    res.rows.item(i).name.toString(),
                                    res.rows.item(i).color.toString(),
                                )
                                console.log(res.rows.item(i))
                                tx.executeSql('Select id, accountId, description, date, time, category, transfert from Records', [], (tx, res) => {
                                    if (res.row.length > 0) {
                                        for (let i = 0; i < res.rows.length; i++) { 
                                            account.setRecord(new Record(
                                                res.rows.item(i).id.toString(),
                                                res.rows.item(i).accountId.toString(),
                                                res.rows.item(i).description.toString(),
                                                res.rows.item(i).date.toString(),
                                                res.rows.item(i).time.toString(),
                                                res.rows.item(i).category.toString(),
                                                res.rows.item(i).transfert
                                            ))
                                        }
                                    }
                                })
                                
                                account.setAmount();

                                result.push(account)
                            }
                        }
                        console.log(result)
                        resolve(result)
                    }, err => resolve([]))

                })
            }
        )
    }

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
} 