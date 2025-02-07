import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StoreType } from "../../common/enums/Store.enum";
import BankInformation from "../../components/modules/store-creation/BankInformation";
import StoreCorporateIdentification from "../../components/modules/store-creation/StoreCorporateIdentification";
import StoreIndividualIdentification from "../../components/modules/store-creation/StoreIndividualIdentification";
import StoreNameInput from "../../components/modules/store-creation/StoreNameInput";
import StoreTypeSelection from "../../components/modules/store-creation/StoreTypeSelection";
import TaxIdentification from "../../components/modules/store-creation/TaxIdentification";

export const Route = createFileRoute("/test-store-create/")({
    component: RouteComponent,
});

function RouteComponent() {
    const form = useForm();
    const [storeType, setStoreType] = useState<StoreType>(StoreType.Individual);

    const handleSubmit = (value: any) => {
        let formData = new FormData();
        formData.append("name", value.name);
        formData.append("businessType", value.businessType);
        formData.append("bankName", value.bankName);
        formData.append("taxDocument", value.taxDocument);
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]); // Key và Value
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <StoreTypeSelection
                    storeType={storeType}
                    setStoreType={setStoreType}
                ></StoreTypeSelection>
                <StoreNameInput></StoreNameInput>
                {storeType === StoreType.Individual && (
                    <StoreIndividualIdentification></StoreIndividualIdentification>
                )}
                {storeType === StoreType.Corporate && (
                    <StoreCorporateIdentification></StoreCorporateIdentification>
                )}
                <TaxIdentification></TaxIdentification>
                <BankInformation></BankInformation>
                <button className="px-5 py-4 rounded-md bg-blue-600 text-white min-w-[100px]">
                    Submit
                </button>
            </form>
        </FormProvider>
    );
}
