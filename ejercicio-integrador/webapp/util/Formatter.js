sap.ui.define([], function () {
    "use strict";

    return {
        formatDate: function(value) {
            return value ? new Intl.DateTimeFormat('es-AR',{day:'2-digit', month:'2-digit', year:'numeric'}).format(new Date(value)) : undefined
        }
    };
  });