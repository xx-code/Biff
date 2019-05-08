
export default class Account {

    constructor(id, name, color){
        this.key = id;
        this.name = name;
        this.amount = 0;
        this.color = color;
        this.records = [];
    }

    setRecord = (record) => {
        this.records.push(record)
    }

    setAmount = () => {
        this.records.forEach(record => {
            if (record.accountId == this.id) {
                this.amount += record.amount
            }
        });
    }
}