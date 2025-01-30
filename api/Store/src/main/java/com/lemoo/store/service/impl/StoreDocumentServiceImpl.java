/*
 *  StoreDocumentServiceImpl
 *  @author: Minhhieuano
 *  @created 12/13/2024 5:27 PM
 * */

package com.lemoo.store.service.impl;

import com.lemoo.store.common.enums.DocumentType;
import com.lemoo.store.common.enums.StoreStatus;
import com.lemoo.store.entity.Store;
import com.lemoo.store.repository.*;
import com.lemoo.store.service.ResourceService;
import com.lemoo.store.service.StoreDocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreDocumentServiceImpl implements StoreDocumentService {
    private final StoreRepository storeRepository;
    private final ResourceService resourceService;
    private final BankInformationRepository bankInformationRepository;
    private final BusinessRegistrationRepository businessRegistrationRepository;
    private final CitizenIdVerificationRepository citizenIdVerificationRepository;
    private final TaxInformationRepository taxInformationRepository;

    @Override
    public void uploadBankDocumentAsync(String storeId, byte[] document) {
        resourceService
                .uploadImageAsync(
                        document,
                        generateDocumentPublicId(DocumentType.BANK_DOCUMENT, storeId),
                        getDocumentPath(storeId))
                .thenAccept((data) -> {
                    updateBankDocument(storeId, data.getUrl());
                })
                .exceptionally(ex -> {
                    log.error("Fail to upload bank document. Error: {}", ex.getMessage());
                    return null;
                });
    }

    @Override
    public void uploadCitizenIdDocumentAsync(String storeId, byte[] document, boolean isFrontSide) {
        resourceService
                .uploadImageAsync(
                        document,
                        generateDocumentPublicId(
                                isFrontSide ? DocumentType.CITIZEN_ID_FRONT : DocumentType.CITIZEN_ID_BACK, storeId),
                        getDocumentPath(storeId))
                .thenAccept((data) -> {
                    updateCitizenIdDocument(storeId, data.getUrl(), isFrontSide);
                })
                .exceptionally(ex -> {
                    log.error(
                            "Fail to upload  upload citizen id card {} side. Error: {}",
                            isFrontSide ? "front" : "back",
                            ex.getMessage());
                    return null;
                });
    }

    @Override
    public void uploadTaxDocumentAsync(String storeId, byte[] document) {
        resourceService
                .uploadImageAsync(
                        document,
                        generateDocumentPublicId(DocumentType.TAX_REGISTRATION, storeId),
                        getDocumentPath(storeId))
                .thenAccept((data) -> {
                    updateTaxDocument(storeId, data.getUrl());
                })
                .exceptionally(ex -> {
                    log.error("Fail to upload  upload tax document. Error: {}", ex.getMessage());
                    return null;
                });
    }

    @Override
    public void uploadBusinessDocumentAsync(String storeId, byte[] document) {
        resourceService
                .uploadImageAsync(
                        document,
                        generateDocumentPublicId(DocumentType.BUSINESS_REGISTRATION_CERTIFICATE, storeId),
                        getDocumentPath(storeId))
                .thenAccept((data) -> {
                    updateBusinessDocument(storeId, data.getUrl());
                })
                .exceptionally(ex -> {
                    log.error("Fail to upload business document. Error: {}", ex.getMessage());
                    return null;
                });
    }

    private void updateBankDocument(String storeId, String url) {
        try {
            bankInformationRepository.updateDocumentByStoreId(storeId, url);
        } catch (Exception exception) {
            Store store = storeRepository
                    .findById(storeId)
                    .orElseThrow(() -> new RuntimeException(
                            "Update store status to verify_error failed because: " + exception.getMessage()));
            store.setStatus(StoreStatus.PENDING);
            // TODO: send notify to client
            storeRepository.save(store);
        }
    }

    private void updateCitizenIdDocument(String storeId, String url, boolean isFrontSide) {
        try {
            if (isFrontSide) citizenIdVerificationRepository.updateDocumentFrontSideByStoreId(storeId, url);
            else citizenIdVerificationRepository.updateDocumentBackSideByStoreId(storeId, url);
        } catch (Exception exception) {
            Store store = storeRepository
                    .findById(storeId)
                    .orElseThrow(() -> new RuntimeException(
                            "Update store status to verify_error failed because: " + exception.getMessage()));
            store.setStatus(StoreStatus.PENDING);
            // TODO: send notify to client
            storeRepository.save(store);
        }
    }

    private void updateTaxDocument(String storeId, String url) {
        try {
            taxInformationRepository.updateDocumentByStoreId(storeId, url);
        } catch (Exception exception) {
            Store store = storeRepository
                    .findById(storeId)
                    .orElseThrow(() -> new RuntimeException(
                            "Update store status to verify_error failed because: " + exception.getMessage()));
            store.setStatus(StoreStatus.PENDING);
            // TODO: send notify to client
            storeRepository.save(store);
        }
    }

    private void updateBusinessDocument(String storeId, String url) {
        try {
            businessRegistrationRepository.updateBusinessRegistrationCertificateByStoreId(storeId, url);
        } catch (Exception exception) {
            Store store = storeRepository
                    .findById(storeId)
                    .orElseThrow(() -> new RuntimeException(
                            "Update store status to verify_error failed because: " + exception.getMessage()));
            store.setStatus(StoreStatus.PENDING);
            // TODO: send notify to client
            storeRepository.save(store);
        }
    }

    private String generateDocumentPublicId(DocumentType type, String storeId) {
        return type.toString().toLowerCase() + "_" + storeId;
    }

    private String getDocumentPath(String storeId) {
        return "/" + storeId + "/document/";
    }
}
