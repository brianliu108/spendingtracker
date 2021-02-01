class RecurringTransaction {
    /**
     * Creates a RecurringTransaction object to insert to database. Does not include RecurrringTransactionId. 
     * 
     * @class
     * 
     * @param {*} userId                    The object's userId
     * @param {*} recurrenceTypeId          The object's recurrenceTypeId
     * @param {*} recurrenceInterval        The object's recurrenceInterval
     * @param {*} endDate                   The object's endDate. Leave null for N/A.
     */
    constructor(userId, recurrenceTypeId, recurrenceInterval, endDate) {
        this.userId = userId; 
        this.recurrenceTypeId = recurrenceTypeId;
        this.recurrenceInterval = recurrenceInterval;
        this.endDate = endDate;
    }
    /**
     * Creates a RecurringTransaction object to update preexisting record. Includes RecurrringTransactionId. 
     * 
     * @class
     * 
     * @param {*} recurringTransactionId    The object's recurringTransactionId
     * @param {*} userId                    The object's userId
     * @param {*} recurrenceTypeId          The object's recurrenceTypeId
     * @param {*} recurrenceInterval        The object's recurrenceInterval
     * @param {*} endDate                   The object's endDate. Leave null for N/A.
     */
    constructor(recurringTransactionId, userId, recurrenceTypeId, recurrenceInterval, endDate) {
        this.recurringTransactionId = recurringTransactionId;
        this.userId = userId; 
        this.recurrenceTypeId = recurrenceTypeId;
        this.recurrenceInterval = recurrenceInterval;
        this.endDate = endDate;
    }
}

module.exports = RecurringTransaction;