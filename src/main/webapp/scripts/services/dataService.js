"use strict";

scaffoldtester.factory( "dataService", function() {
    return {
        customerPipe: AeroGear.Pipeline({
            name: "customers",
             settings: {
                baseURL: "rest/"
            }
           }).pipes.customers,
        customerStore: AeroGear.DataManager({
            name: "customer",
            settings: {
                storageType: "localStorage"
            }
        }).stores.customer,
        discountVoucherPipe: AeroGear.Pipeline({
            name: "discountvouchers",
            settings: {
                baseURL: "rest/"
            }
        }).pipes.discountvouchers,
        discountVoucherStore: AeroGear.DataManager({
            name: "discountVoucher",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        }).stores.discountVoucher,
        storeOrderPipe: AeroGear.Pipeline({
            name: "storeorders",
            settings: {
                baseURL: "rest/"
            }
        }).pipes.storeorders,
        storeOrderStore: AeroGear.DataManager({
            name: "storeOrder",
            type: "SessionLocal",
            settings: {
                storageType: "localStorage"
            }
        }).stores.storeOrder

    };
});
