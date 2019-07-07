import Record from "./record";

export default class Account {
    records = [];
    constructor(id, name, color){
        this.key = id;
        this.name = name;
        this.amount = 0;
        this.color = color;
        this.lengthRecords = 0;
    }

    setRecord = (record) => {
        this.records.push(new Record(record.id, record.accountId, record.amount, record.description, 
            record.date, record.time, record.category, record.transfert, record.type))
    }

    setAmount = () => {
        this.records.forEach(record => {
            const amount = record.type === 'income' ? record.amount : (-1 * record.amount)
            if (this.key === "all") {
                this.amount += amount;
            }
            else if (record.accountId == this.key) {
                this.amount += amount;
                this.lengthRecords++;
            } 
        });
    }
}