/*
 *  StoreDocumentServiceImpl
 *  @author: Minhhieuano
 *  @created 12/13/2024 5:27 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.common.enums.DocumentType;
import com.lemoo.store.common.enums.StoreStatus;
import com.lemoo.store.common.lock.UpdateLockManager;
import com.lemoo.store.entity.BankInformation;
import com.lemoo.store.entity.BusinessRegistration;
import com.lemoo.store.entity.Store;
import com.lemoo.store.entity.TaxInformation;
import com.lemoo.store.exception.NotfoundException;
import com.lemoo.store.repository.*;
import com.lemoo.store.service.impl.StoreDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreDocumentServiceImpl implements StoreDocumentService {
    private final StoreRepository storeRepository;
    private final ResourceService resourceService;
    private final BankInformationRepository bankInformationRepository;
    private final BusinessRegistrationRepository businessRegistrationRepository;
    private final CitizenIdVerificationRepository citizenIdVerificationRepository;
    private final TaxInformationRepository taxInformationRepository;
    private final UpdateLockManager lockManager;

    @Override
    @Async
    public void uploadDocument(String storeId, DocumentType type, byte[] image) {
        try {
            var response = resourceService.uploadImage(
                    image, generateDocumentPublicId(type, storeId), getDocumentPath(storeId));
            String documentUrl = response.getSecureUrl();
            switch (type) {
                case BANK_DOCUMENT -> updateBankDocument(storeId, documentUrl);
                case CITIZEN_ID_BACK -> updateCitizenIdDocument(storeId, documentUrl, false);
                case CITIZEN_ID_FRONT -> updateCitizenIdDocument(storeId, documentUrl, true);
                case TAX_REGISTRATION -> updateTaxDocument(storeId, documentUrl);
                case BUSINESS_REGISTRATION_CERTIFICATE -> updateBusinessDocument(storeId, documentUrl);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    private void updateBankDocument(String storeId, String url) {
        try {
            BankInformation bankInformation = bankInformationRepository
                    .findByStoreId(storeId)
                    .orElseThrow(() -> new NotfoundException("Bank information not found"));
            bankInformation.setDocument(url);
            bankInformationRepository.save(bankInformation);
        } catch (Exception exception) {
            Store store = storeRepository.findById(storeId)
                    .orElseThrow(() -> new RuntimeException("Update store status to verify_error failed because: " + exception.getMessage()));
            store.setStatus(StoreStatus.VERIFY_FAILED);
            store.getVerifyFailedMessages().add("Verify BankDocument fail with message: " + exception.getMessage());
            storeRepository.save(store);
        }

    }

    private void updateCitizenIdDocument(String storeId, String url, boolean isFrontSide) {

        Object lock = lockManager.getLock(storeId);

        synchronized (lock) {
            System.out.println(
                    "====================================================LOCK=================================================");
            try {
                var citizenId = citizenIdVerificationRepository
                        .findByStoreId(storeId)
                        .orElseThrow(() -> new NotfoundException("CitizenId not found"));

                if (isFrontSide) citizenId.setDocumentFrontSide(url);
                else citizenId.setDocumentBackSide(url);
                citizenIdVerificationRepository.save(citizenId);
            } catch (Exception exception) {
                Store store = storeRepository.findById(storeId)
                        .orElseThrow(() -> new RuntimeException("Update store status to verify_error failed because: " + exception.getMessage()));
                store.setStatus(StoreStatus.VERIFY_FAILED);
                store.getVerifyFailedMessages().add("Verify CitizenId fail with message: " + exception.getMessage());
                storeRepository.save(store);
            } finally {
                System.out.println(
                        "===================================================UNLOCK==================================================");
                lockManager.releaseLock(storeId);
            }
        }
    }

    private void updateTaxDocument(String storeId, String url) {
        try {
            TaxInformation taxInformation = taxInformationRepository
                    .findByStoreId(storeId)
                    .orElseThrow(() -> new NotfoundException("Bank information not found"));
            taxInformation.setDocument(url);
            taxInformationRepository.save(taxInformation);
        } catch (Exception exception) {
            Store store = storeRepository.findById(storeId)
                    .orElseThrow(() -> new RuntimeException("Update store status to verify_error failed because: " + exception.getMessage()));
            store.setStatus(StoreStatus.VERIFY_FAILED);
            store.getVerifyFailedMessages().add("Verify TaxDocument fail with message: " + exception.getMessage());
            storeRepository.save(store);
        }

    }

    private void updateBusinessDocument(String storeId, String url) {
        try {
            BusinessRegistration businessRegistration = businessRegistrationRepository
                    .findByStoreId(storeId)
                    .orElseThrow(() -> new NotfoundException("Business document not found"));
            businessRegistration.setBusinessRegistrationCertificate(url);
            businessRegistrationRepository.save(businessRegistration);
        } catch (Exception exception) {
            Store store = storeRepository.findById(storeId)
                    .orElseThrow(() -> new RuntimeException("Update store status to verify_error failed because: " + exception.getMessage()));
            store.setStatus(StoreStatus.VERIFY_FAILED);
            store.getVerifyFailedMessages().add("Verify BusinessDocument fail with message: " + exception.getMessage());
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
