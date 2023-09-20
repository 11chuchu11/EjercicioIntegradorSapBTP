sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "jquery.sap.global",
    "sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator", 
    "sap/ui/core/Fragment",
    "ejerciciointegrador/util/Constants",
    "ejerciciointegrador/util/Formatter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,jQuery,Filter,FilterOperator,Fragment,Constants, Formatter) {
        "use strict";

        return Controller.extend("ejerciciointegrador.controller.Main", {
            formatDate: Formatter.formatDate,
            onInit: function () {

                const comboBoxModelPath = jQuery.sap.getModulePath(Constants.paths.root, Constants.paths.mocks.comboBox)

                const comboBoxModel = new JSONModel(comboBoxModelPath)
                this.getView().setModel(comboBoxModel)

                const url = sap.ui.require.toUrl(Constants.paths.root) + Constants.paths.northwind.root;
                this._model= new sap.ui.model.odata.v2.ODataModel(url, {
                    json:true,
                    headers:{
                        "DataServiceVersion": "2.0",
                        "Cache-Control": "no-cache no-store",
                        "Pragma":"no-cache"
                    },
                    useBatch: false
                });
                this._model.read(Constants.paths.northwind.entitys.employees,{
                    async:true,
                    success:jQuery.proxy(this.success, this),
                    error:jQuery.proxy(this.error, this)
                })
            },
            success: function(oData){
                const oModel = new JSONModel(oData.results);
                this.getView().setModel(oModel, Constants.models.employee)
            }, 
            error: function(error){
                console.log(error)
                alert(Constants.errors.notFound)
            },
            onChange:function(evnt){
                const sQuery = evnt.getParameter("selectedItem").mProperties.text
                const oTable = this.getView().byId("idEmployeesTable")
                const oBinding = oTable.getBinding("items")

                console.log(sQuery)

                let aFilter

                if(sQuery){
                    if(parseInt(sQuery)) {
                        aFilter = new Filter("EmployeeID", FilterOperator.EQ, parseInt(sQuery));
                        
                    }
                    else{
                        aFilter = new Filter("FirstName", FilterOperator.Contains, sQuery);
                        
                    } 
                }

                oBinding.filter(aFilter);
            }
        });
    });
