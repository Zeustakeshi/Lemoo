/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:26 PM
 * */


package com.lemoo.store.service.impl;

import com.lemoo.store.common.enums.DocumentType;
import com.lemoo.store.dto.common.AuthenticatedAccount;
import com.lemoo.store.dto.request.CreateCorporateStoreRequest;
import com.lemoo.store.dto.request.CreateIndividualStoreRequest;
import com.lemoo.store.dto.response.StoreResponse;
import com.lemoo.store.entity.*;
import com.lemoo.store.event.eventModel.UploadDocumentEvent;
import com.lemoo.store.exception.ConflictException;
import com.lemoo.store.exception.NotfoundException;
import com.lemoo.store.mapper.StoreMapper;
import com.lemoo.store.repository.StoreRepository;
import com.lemoo.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;
    private final ApplicationEventPublisher eventPublisher;
    @Value("${assets.default-avatar}")
    private String defaultAvatar;

    @Override
    public StoreResponse getStoreInfo(AuthenticatedAccount account) {
        Store store = storeRepository.findByOwnerId(account.getId())
                .orElseThrow(() -> new NotfoundException("Store doesn't exist "));
        return storeMapper.storeToStoreResponse(store);
    }

    @Override
    @SneakyThrows
    public StoreResponse createIndividualStore(AuthenticatedAccount account, CreateIndividualStoreRequest request) {
        if (storeRepository.existsByNameOrOwnerId(request.getName(), account.getId())) {
            throw new ConflictException("Store name " + request.getName() + " already existed.");
        }

        Store store = Store
                .builder()
                .avatar(defaultAvatar)
                .email(account.getEmail())
                .phone(account.getPhone())
                .name(request.getName())
                .ownerId(account.getId())
                .isVerified(false)
                .build();

        CitizenIdVerification citizenIdVerification = CitizenIdVerification
                .builder()
                .cardName(request.getIdentityCardName())
                .cardNumber(request.getIdentityCardNumber())
                .store(store)
                .build();

        TaxInformation taxInformation = TaxInformation
                .builder()
                .TIN(request.getTIN())
                .store(store)
                .build();

        BankInformation bankInformation = BankInformation
                .builder()
                .name(request.getBankName())
                .bin(request.getBankBin())
                .code(request.getBankCode())
                .accountName(request.getBankAccountName())
                .store(store)
                .build();

        store.setBankInformation(bankInformation);
        store.setTaxInformation(taxInformation);
        store.setCitizenIdVerification(citizenIdVerification);

        Store newStore = storeRepository.save(store);

        eventPublisher.publishEvent(UploadDocumentEvent.builder()
                .image(request.getIdentityCardFrontSide().getBytes())
                .storeId(newStore.getId())
                .type(DocumentType.CITIZEN_ID_FRONT)
                .build());

        eventPublisher.publishEvent(UploadDocumentEvent.builder()
                .image(request.getIdentityCardBackSide().getBytes())
                .storeId(newStore.getId())
                .type(DocumentType.CITIZEN_ID_BACK)
                .build());

        eventPublisher.publishEvent(UploadDocumentEvent.builder()
                .image(request.getTaxRegistrationDocument().getBytes())
                .storeId(newStore.getId())
                .type(DocumentType.TAX_REGISTRATION)
                .build());

        eventPublisher.publishEvent(UploadDocumentEvent.builder()
                .image(request.getBankDocument().getBytes())
                .storeId(newStore.getId())
                .type(DocumentType.BANK_DOCUMENT)
                .build());

        return storeMapper.storeToStoreResponse(store);
    }

    @Override
    @SneakyThrows
    public StoreResponse createCorporateStore(AuthenticatedAccount account, CreateCorporateStoreRequest request) {
        if (storeRepository.existsByNameOrOwnerId(request.getName(), account.getId())) {
            throw new ConflictException("Store already existed.");
        }

        BusinessRegistration businessRegistration = BusinessRegistration
                .builder()
                .businessOwnerName(request.getBusinessOwnerName())
                .businessRegistrationNumber(request.getBusinessRegistrationNumber())
                .companyLegalName(request.getCompanyLegalName())
                .type(request.getBusinessType())
                .build();

        TaxInformation taxInformation = TaxInformation
                .builder()
                .TIN(request.getTIN())
                .build();

        BankInformation bankInformation = BankInformation
                .builder()
                .name(request.getBankName())
                .bin(request.getBankBin())
                .code(request.getBankCode())
                .accountName(request.getBankAccountName())
                .build();

        Store store = storeRepository.save(Store
                .builder()
                .avatar(defaultAvatar)
                .bankInformation(bankInformation)
                .businessRegistration(businessRegistration)
                .taxInformation(taxInformation)
                .email(account.getEmail())
                .phone(account.getPhone())
                .name(request.getName())
                .ownerId(account.getId())
                .isVerified(false)
                .build());

        eventPublisher.publishEvent(UploadDocumentEvent.builder()
                .image(request.getBusinessRegistrationCertificate().getBytes())
                .storeId(store.getId())
                .type(DocumentType.BUSINESS_REGISTRATION_CERTIFICATE)
                .build());


        eventPublisher.publishEvent(UploadDocumentEvent.builder()
                .image(request.getTaxRegistrationDocument().getBytes())
                .storeId(store.getId())
                .type(DocumentType.TAX_REGISTRATION)
                .build());

        eventPublisher.publishEvent(UploadDocumentEvent.builder()
                .image(request.getBankDocument().getBytes())
                .storeId(store.getId())
                .type(DocumentType.BANK_DOCUMENT)
                .build());

        return storeMapper.storeToStoreResponse(store);
    }

    @Override
    public void updateStoreDocument(String storeId, DocumentType type, String documentUrl) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotfoundException("Store " + storeId + " not found"));


    }

}
