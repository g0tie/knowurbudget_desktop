import * as DB from './database';

function seedTypes() {

    if (DB.getDatas('types').length > 0) return;

    [
        "Alimentaire",
        "Vehicule",
        "Divertissement",
        "Santé",
        "Vêtements",
        "Sport",
        "Courses"
    ].forEach(type => DB.insertData("types", {name:type}));
}

function createLocalLimit() {
    if (DB.getData('limit') > 0) return;

    DB.insertData('limit', {amount:500});
}

export {
    seedTypes,
    createLocalLimit
}