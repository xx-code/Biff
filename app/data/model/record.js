
export default class Record {

    constructor(id, accountId, amount, description, 
                date, time, category, transfert,
                type ) {

        this.key = id;
        this.accountId = accountId;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.time = time;
        this.category = category;
        this.type = type
        this.transfert = transfert;

        if (typeof(transfert) === "number")
        {
            this.transfert = transfert == 0 ? true : false
        }

    }

}