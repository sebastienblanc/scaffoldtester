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
            name: "Customer",
            type: "SessionLocal",
            settings: {
                 storageType: "localStorage"
            }
        }).stores.Customer,
        discountVoucherPipe: AeroGear.Pipeline({
            name: "discountvouchers",
            settings: {
                 baseURL: "rest/"
            }
         }).pipes.discountvouchers,
        discountVoucherStore: AeroGear.DataManager({
            name: "DiscountVoucher",
            type: "SessionLocal",
            settings: {
                 storageType: "localStorage"
            }
        }).stores.DiscountVoucher,
        storeOrderPipe: AeroGear.Pipeline({
            name: "storeorders",
            settings: {
                 baseURL: "rest/"
            }
         }).pipes.storeorders,
        storeOrderStore: AeroGear.DataManager({
            name: "StoreOrder",
            type: "SessionLocal",
            settings: {
                 storageType: "localStorage"
            }
        }).stores.StoreOrder
    };
});