/*
 *  CreateIndividualStoreRequest
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:48 PM
 * */


package com.lemoo.store.dto.request;

import com.lemoo.store.common.enums.BusinessType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateCorporateStoreRequest {
    // store information

    @NotEmpty(message = "Store name must not be empty.")
    @Size(max = 100, message = "Store name must not exceed 100 characters.")
    private String name;

    // business

    @NotEmpty(message = "Company legal name must not be empty.")
    @Size(max = 100, message = "Company legal name must not exceed 100 characters.")
    private String companyLegalName;

    @NotEmpty(message = "Business owner name must not be empty.")
    @Size(max = 100, message = "Business owner name must not exceed 100 characters.")
    private String businessOwnerName;

    @NotEmpty(message = "Business registration number must not be empty.")
    @Pattern(regexp = "\\d{9,15}", message = "Business registration number must be between 9 and 15 digits.")
    private String businessRegistrationNumber;

    @NotNull(message = "Business registration certificate must be provided.")
    private MultipartFile businessRegistrationCertificate;

    private BusinessType businessType = BusinessType.COMPANY;

    // tax
    @NotEmpty(message = "TIN (Tax Identification Number) must not be empty.")
    @Pattern(regexp = "\\d{9}|\\d{12}", message = "TIN must be 9 or 12 digits.")
    private String TIN;

    @NotNull(message = "Tax registration document must be provided.")
    private MultipartFile taxRegistrationDocument;

    // bank
    @NotEmpty(message = "Bank account name must not be empty.")
    @Size(max = 100, message = "Bank account name must not exceed 100 characters.")
    private String bankAccountName;

    @NotNull(message = "Bank document must be provided.")
    private MultipartFile bankDocument;

    @NotEmpty(message = "Bank account number must not be empty.")
    @Pattern(regexp = "\\d{6,20}", message = "Bank account number must be between 6 and 20 digits.")
    private String bankAccountNumber;

    @Size(max = 10, message = "Bank code must not exceed 10 characters.")
    private String bankCode;

    @Pattern(regexp = "\\d{6}", message = "Bank BIN must be exactly 6 digits.")
    private String bankBin;

    @Size(max = 100, message = "Bank name must not exceed 100 characters.")
    private String bankName;

}
