/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:26 PM
 * */

package com.lemoo.store.service.impl;

import com.lemoo.store.common.enums.StoreStatus;
import com.lemoo.store.common.enums.StoreType;
import com.lemoo.store.common.utils.ShortCodeGenerator;
import com.lemoo.store.dto.common.AuthenticatedAccount;
import com.lemoo.store.dto.request.CreateCorporateStoreRequest;
import com.lemoo.store.dto.request.CreateIndividualStoreRequest;
import com.lemoo.store.dto.response.StoreResponse;
import com.lemoo.store.entity.*;
import com.lemoo.store.exception.ConflictException;
import com.lemoo.store.exception.NotfoundException;
import com.lemoo.store.mapper.StoreMapper;
import com.lemoo.store.repository.StoreRepository;
import com.lemoo.store.service.StoreDocumentService;
import com.lemoo.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private static final String LEMOO_STORE_SHORT_CODE_PREFIX = "LS_";

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;
    private final StoreDocumentService documentService;

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


        documentService.uploadCitizenIdDocumentAsync(
                newStore.getId(),
                request.getIdentityCardFrontSide().getBytes(),
                true
        );

        documentService.uploadCitizenIdDocumentAsync(
                newStore.getId(),
                request.getIdentityCardBackSide().getBytes(),
                false
        );

        documentService.uploadTaxDocumentAsync(
                newStore.getId(),
                request.getTaxRegistrationDocument().getBytes()
        );

        documentService.uploadBankDocumentAsync(
                newStore.getId(),
                request.getBankDocument().getBytes()
        );

        // TODO: send event to admin to update verify store

        return storeMapper.storeToStoreResponse(newStore);
    }

    @Override
    @SneakyThrows
    public StoreResponse createCorporateStore(AuthenticatedAccount account, CreateCorporateStoreRequest request) {

        if (storeRepository.existsByNameOrCompanyNameOrOwnerId(request.getName(), request.getCompanyLegalName(), account.getId())) {
            throw new ConflictException("Store name already exists, or the company name or owner ID is already in use. Please verify your information or register with different details.");
        }

        Store store = Store.builder()
                .logo(defaultAvatar)
                .type(StoreType.CORPORATE)
                .companyName(request.getCompanyLegalName())
                .email(account.getEmail())
                .phone(account.getPhone())
                .name(request.getName())
                .ownerId(account.getId())
                .status(StoreStatus.ACTIVE)
                .businessType(request.getBusinessType())
                .verified(false)
                .build();


        BusinessRegistration businessRegistration = BusinessRegistration.builder()
                .businessOwnerName(request.getBusinessOwnerName())
                .businessRegistrationNumber(request.getBusinessRegistrationNumber())
                .companyLegalName(request.getCompanyLegalName())
                .type(request.getBusinessType())
                .store(store)
                .build();

        TaxInformation taxInformation =
                TaxInformation.builder()
                        .store(store)
                        .TIN(request.getTIN()).build();

        BankInformation bankInformation = BankInformation.builder()
                .name(request.getBankName())
                .bin(request.getBankBin())
                .store(store)
                .code(request.getBankCode())
                .accountName(request.getBankAccountName())
                .build();


        String shortCode = ShortCodeGenerator.generateShortCode(
                store.getId(),
                LocalDateTime.now().toString(),
                LEMOO_STORE_SHORT_CODE_PREFIX
        );

        store.setShortCode(shortCode);

        store.setBusinessRegistration(businessRegistration);
        store.setBankInformation(bankInformation);
        store.setTaxInformation(taxInformation);

        Store newStore = storeRepository.save(store);

        documentService.uploadBusinessDocumentAsync(
                newStore.getId(),
                request.getBusinessRegistrationCertificate().getBytes()
        );

        documentService.uploadTaxDocumentAsync(
                newStore.getId(),
                request.getTaxRegistrationDocument().getBytes()
        );

        documentService.uploadBankDocumentAsync(
                newStore.getId(),
                request.getBankDocument().getBytes()
        );

        return storeMapper.storeToStoreResponse(newStore);
    }

    private void addStoreVerifyFailedMessages(String storeId, String message) {

    }
}
