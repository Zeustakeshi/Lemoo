/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:26 PM
 * */

package com.lemoo.store.service.impl;

import com.lemoo.store.common.enums.DocumentType;
import com.lemoo.store.common.enums.StoreStatus;
import com.lemoo.store.common.enums.StoreType;
import com.lemoo.store.common.utils.ShortCodeGenerator;
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

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private static final String LEMOO_STORE_SHORT_CODE_PREFIX = "LS_";

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Value("${assets.default-avatar}")
    private String defaultAvatar;

    @Override
    public StoreResponse getStoreInfo(AuthenticatedAccount account) {
        Store store = storeRepository
                .findActiveStore(account.getId())
                .orElseThrow(() -> new NotfoundException("Store doesn't exist or is not verified."));
        return storeMapper.storeToStoreResponse(store);
    }

    @Override
    @SneakyThrows
    public StoreResponse createIndividualStore(AuthenticatedAccount account, CreateIndividualStoreRequest request) {
        if (storeRepository.existsByNameOrOwnerId(request.getName(), account.getId())) {
            throw new ConflictException("Store name already exists or you already have a store. Please check your store or register with different information.");
        }


        Store store = Store.builder()
                .logo(defaultAvatar)
                .type(StoreType.INDIVIDUAL)
                .email(account.getEmail())
                .phone(account.getPhone())
                .name(request.getName())
                .ownerId(account.getId())
                .verified(false)
                .status(StoreStatus.ACTIVE)
                .build();


        String shortCode = ShortCodeGenerator.generateShortCode(
                store.getId(),
                LocalDateTime.now().toString(),
                LEMOO_STORE_SHORT_CODE_PREFIX
        );

        store.setShortCode(shortCode);

        CitizenIdVerification citizenIdVerification = CitizenIdVerification.builder()
                .cardName(request.getIdentityCardName())
                .cardNumber(request.getIdentityCardNumber())
                .store(store)
                .build();

        TaxInformation taxInformation =
                TaxInformation.builder().TIN(request.getTIN()).store(store).build();

        BankInformation bankInformation = BankInformation.builder()
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

        // TODO:-------------------------- Refactor upload image async -----------------------

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

        // TODO: ----------------------Refactor upload store image-------------------------------

        // TODO: send event to admin to update verify store

        return storeMapper.storeToStoreResponse(store);
    }

    @Override
    @SneakyThrows
    public StoreResponse createCorporateStore(AuthenticatedAccount account, CreateCorporateStoreRequest request) {

        if (storeRepository.existsByNameOrCompanyNameOrOwnerId(request.getName(), request.getCompanyLegalName(), account.getId())) {
            throw new ConflictException("Store name already exists, or the company name or owner ID is already in use. Please verify your information or register with different details.");
        }

        BusinessRegistration businessRegistration = BusinessRegistration.builder()
                .businessOwnerName(request.getBusinessOwnerName())
                .businessRegistrationNumber(request.getBusinessRegistrationNumber())
                .companyLegalName(request.getCompanyLegalName())
                .type(request.getBusinessType())
                .build();

        TaxInformation taxInformation =
                TaxInformation.builder().TIN(request.getTIN()).build();

        BankInformation bankInformation = BankInformation.builder()
                .name(request.getBankName())
                .bin(request.getBankBin())
                .code(request.getBankCode())
                .accountName(request.getBankAccountName())
                .build();

        Store store = storeRepository.save(Store.builder()
                .logo(defaultAvatar)
                .type(StoreType.CORPORATE)
                .companyName(request.getCompanyLegalName())
                .bankInformation(bankInformation)
                .businessRegistration(businessRegistration)
                .taxInformation(taxInformation)
                .email(account.getEmail())
                .phone(account.getPhone())
                .name(request.getName())
                .ownerId(account.getId())
                .status(StoreStatus.ACTIVE)
                .verified(false)
                .build());

        String shortCode = ShortCodeGenerator.generateShortCode(
                store.getId(),
                LocalDateTime.now().toString(),
                LEMOO_STORE_SHORT_CODE_PREFIX
        );

        store.setShortCode(shortCode);

        // TODO:-------------------------- Refactor upload image async -----------------------

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

        // TODO:-------------------------- Refactor upload image async -----------------------

        return storeMapper.storeToStoreResponse(store);
    }


}
