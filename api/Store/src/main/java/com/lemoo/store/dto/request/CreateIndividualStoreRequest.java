/*
 *  CreateIndividualStoreRequest
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:48 PM
 * */


package com.lemoo.store.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateIndividualStoreRequest {
    MultipartFile identityCardFrontSide;
    MultipartFile identityCardBackSide;
    private String TIN;
    private MultipartFile taxRegistrationDocument;
    private MultipartFile bankDocument;
    private String bankAccountName;
    private String bankAccountNumber;
    private String bankName;
    private String bankBranch;
    private String name;
    private String identityCardName;
    private String identityCardNumber;
}
