import Record from "./record";

export default class Account {
    records = [];
    constructor(id, name, color){
        this.key = id;
        this.name = name;
        this.amount = 0;
        this.color = color;
        this.lengthRecords = 0
    }

    setRecord = (record) => {
        this.records.push(new Record(record.id, record.accountId, record.amount, record.description, 
            record.date, record.time, record.category, record.transfert))
    }

    setAmount = () => {
        this.records.forEach(record => {
            if (this.key === "all") {
                this.amount += record.amount;
            }
            else if (record.accountId == this.key) {
                this.amount += record.amount;
                this.lengthRecords++;
            } 
        });
    }
}