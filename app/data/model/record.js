
export default class Record {

    constructor(id, accountId, amount, description, 
                date, time, category, transfert ) {

        this.key = id;
        this.accountId = accountId;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.time = time;
        this.category = category;
        if (typeof(transfert) === Boolean)
        {
            this.transfert = transfert ? 0 : 1;
        }
        else if (typeof(transfert) === Int32Array) {
            this.transfert = transfert == 0 ? true : false
        }
    }

}