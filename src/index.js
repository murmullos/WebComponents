import './components/step-form/step-form';


window.onload =()=> {
    const formData = [
        {
            name: 'Nombre',
            value: '',
            validationList: [
                {
                    pattern: /^.{6,}$/,
                    text: "Minima longitud de 6",
                    fixed: true
                },
                {
                    pattern: /(?=.*[A-Z])/,
                    text: "Mínimo una mayuscula",
                    fixed: true
                },
                {
                    pattern: /(?=.*[0-9])/,
                    text: "Mínimo un número",
                    fixed: true
                }
            ]
        },
        {
            name: 'Email',
            value: '',
            validationList: [
                {
                    pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                    text: "Debe ser un correo válido",
                    fixed: false
                }
            ]
        },
        {
            name: 'Teléfono móvil',
            value: '',
            validationList: [
                {
                    pattern: /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/,
                    text: "Debe ser un tlf válido",
                    fixed: false
                }
            ]
        }
    ];
    const form = document.createElement('step-form');
    form.formData = formData;
    document.querySelector('body').appendChild(form);
};