type validationtype = {
    type:
        | StringConstructor
        | NumberConstructor
        | StringConstructor[]
        | NumberConstructor[];
    required?: boolean;
};

type definition = {
    [key: string]: validationtype;
};

export default function validation(definition: definition, body: Object) {
    console.log(definition);
    //definition.forEach(validationToBeMade => {
    //    console.log(validationToBeMade);
    //});
}
