sap.ui.define([], function (){
    'use strict';
    return{

            paths:
            {
                root:"ejerciciointegrador",
                mocks:
                {
                    comboBox:"/localService/comboBoxData.json"
                },
                northwind:
                {
                    root:"/v2/northwind/northwind.svc",
                    entitys:
                    {
                        employees:"/Employees"
                    }
                    
                }

            },
            models:
            {
                employee:"employeeModel"
            },
            errors: 
            {
                notFound: "Route not found"
            }

    };
}, true)