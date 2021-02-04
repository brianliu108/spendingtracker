class Transaction {
    constructor(userId, categoryId, typeId, date, amount) {
        this.userId = userId;
        this.categoryId = categoryId;
        this.typeId = typeId;
        this.date = date;
        this.amount = amount;
    }
    constructor(transactionId, userId, categoryId, typeId, date, amount) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.categoryId = categoryId;
        this.typeId = typeId;
        this.date = date;
        this.amount = amount;
    }
}

module.exports = Transaction;