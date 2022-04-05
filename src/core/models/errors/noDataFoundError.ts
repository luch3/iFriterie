export class NoDataFoundError extends Error {
    constructor(dataType?: string) {
        super(dataType ? `La donnée de type ${dataType} n'a pas été trouvée` : 'Donnée non trouvée');
    }
}