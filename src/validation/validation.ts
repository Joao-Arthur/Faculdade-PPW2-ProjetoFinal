type validationtype = {
    type: 'string' | 'number' | 'stringArray' | 'numberArray';
    required?: boolean;
};

type definition = {
    [key: string]: validationtype;
};

export default function validation(definition: definition, body: Object) {
    const bodyFields = Object.keys(body);
    bodyFields.forEach(field => {
        if (!definition[field]) throw new Error();
    });
    const definitionFields = Object.keys(definition);
    definitionFields.forEach(field => {
        if (!body[field]) throw new Error();
    });

    definitionFields.forEach(field => {
        const { type, required } = definition[field];
        const bodyField = body[field];

        if (type === 'string') {
            if (typeof bodyField !== 'string') throw new Error();
            if (required && !bodyField.length) throw new Error();
        }

        if (type === 'number') {
            if (typeof bodyField !== 'number') throw new Error();
            if (required && !(bodyField > 0)) throw new Error();
        }

        if (type === 'stringArray') {
            if (!Array.isArray(bodyField)) throw new Error();
        }

        if (type === 'numberArray') {
            if (!Array.isArray(bodyField)) throw new Error();
        }
    });
}
