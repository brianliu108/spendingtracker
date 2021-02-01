class RecurrenceType {
    constructor(name){
        this.name = name;
    }
    constructor(recurrenceTypeId, name) {
        this.recurrenceTypeId = recurrenceTypeId;
        this.name = name;
    }
}

module.exports = RecurrenceType;