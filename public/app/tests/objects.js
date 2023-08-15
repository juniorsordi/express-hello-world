var contracts = {
    "count": 1,
        "rows": [
            {
                "id": "m2dz6e4",
                "oid": "m2dz6e4",
                "name": "Dilson Sordi IT Contract",
                "contractType": "ongoing_time_based",
                "status": "in_progress",
                "rate": 10000,
                "cycleScale": "monthly",
                "jobTitleName": "IT Analyst",
                "completionPlainDate": null,
                "organization": {
                    "id": 63997,
                    "logoUrl": null,
                    "name": "Direct Link Worldwide"
                },
                "total": 10000,
                "currency": "BRL",
                "isEdited": false,
                "isArchived": false,
                "wasCreatedByProfileParty": false,
                "canBeCancelled": false,
                "canBeRejected": false
            }
        ]
};

var account = {
    "balancesTotal": {
        "currency": "USD",
        "amount": "0.00"
    },
    "balances": [
        {
            "currency": "BRL",
            "amount": "0.00"
        }
    ],
    "archivedWithdrawMethods": [],
    "withdrawMethods": [
        {
            "id": 929077,
            "uuid": "612d056d-f7b6-4d4f-b9a7-9fd6cd577e54",
            "userId": "804460",
            "paymentMethod": "bank_transfer",
            "status": "approved",
            "methodName": null,
            "isDefault": true,
            "payload": {
                "name": "DSJ Consultoria e Desenvolvimento",
                "type": "brazil",
                "email": "juniorsordi@gmail.com",
                "address": {
                    "city": "São José",
                    "state": "SC",
                    "country": "BR",
                    "postCode": "88101070",
                    "firstLine": "Rua Dinarte Domingos 213"
                },
                "currency": "BRL",
                "bank_code": "001",
                "legalType": "BUSINESS",
                "bank_branch": "3616",
                "document_id": "03543977962",
                "account_type": "C",
                "bank_account": "00015647-7",
                "selectedMethod": "bank_transfer",
                "deel": 929077
            },
            "createdAt": "2023-05-02T18:18:46.507Z",
            "deletedAt": null,
            "estimatedArrival": "Aug 14, 2023",
            "currency": "BRL",
            "valid": true,
            "validationError": null
        }
    ],
    "earned": 0,
    "processingWithdrawals": [],
    "isUserEligibleForPaysendPromotion": false
};

var company = {
    "legalName": "DSJ Consultoria e Desenvolvimento",
    "legalStatus": "limited-liability-company-limitada",
    "registeredNumber": null,
    "vatId": null,
    "id": 111457,
    "shareholders": [
        {
            "id": 115224,
            "name": "Dilson Sordi Junior",
            "percentage": null,
            "entity": null,
            "verified": null,
            "type": "INDIVIDUAL",
            "isBlocked": false,
            "kyc": "approved",
            "IdentityProfileId": 804460,
            "ParentShareholderId": null
        }
    ],
    "address": {
        "id": 163622,
        "country": "BR",
        "state": null,
        "province": "SC",
        "city": "São José",
        "street": "Rua Professora Maria do Carmo Souza, 18",
        "zip": "88101360",
        "phone": null,
        "callingCode": null,
        "geoCode": null,
        "createdAt": "2023-05-02T18:07:43.456Z",
        "updatedAt": "2023-05-02T18:07:43.456Z"
    },
    "invoiceAddress": null
};

var profile = {
    "profileType": "contractor",
    "id": 804460,
    "userId": 767668,
    "username": "juniorsordi",
    "name": "Dilson Sordi Junior",
    "firstName": "Dilson",
    "middleName": null,
    "lastName": "Sordi Junior",
    "preferredName": null,
    "email": "juniorsordi@gmail.com",
    "picUrl": "https://media.letsdeel.com/avatar/mR9yxWqR?q=1683051672095",
    "company": {
        "type": "company",
        "registration": {
            "province": ""
        },
        "invoice": {
            "legalCompanyName": "DSJ Consultoria e Desenvolvimento",
            "registeredNumber": "",
            "country": "BR",
            "province": "SC",
            "vatId": "",
            "showSignature": true,
            "isDefaultSignature": true,
            "firstName": "Dilson",
            "middleName": null,
            "lastName": "Sordi Junior",
            "street": "Rua Professora Maria do Carmo Souza, 18",
            "city": "São José",
            "zip": "88101360",
            "phone": "+5548996198194"
        },
        "entityType": "limited-liability-company-limitada",
        "country": "BR",
        "province": "SC",
        "legalCompanyName": "DSJ Consultoria e Desenvolvimento",
        "registeredNumber": "",
        "shareholders": [
            {
                "name": "Dilson Sordi Junior",
                "percentage": null
            }
        ],
        "street": "Rua Professora Maria do Carmo Souza, 18",
        "city": "São José",
        "zip": "88101360",
        "phone": "+5548996198194",
        "timezone": "Etc/GMT+3",
        "personal": {
            "firstName": "Dilson",
            "lastName": "Sordi Junior",
            "street": "Rua Professora Maria do Carmo Souza, 18",
            "city": "São José",
            "zip": "88101360",
            "country": "BR",
            "citizen": "BR",
            "phone": "+5548996198194",
            "timezone": "Etc/GMT+3",
            "taxResidence": "BR",
            "idType": "Passport"
        }
    },
    "signature": "Dilson Sordi Junior",
    "signatureUrl": null,
    "deelFeePercent": "1.00",
    "isAutoWithdrawEnabled": false,
    "timezone": "Etc/GMT+3",
    "currency": "USD",
    "flags": 0,
    "kyc": "approved",
    "dashboard": {
        "otherTasksOrder": [
            "PROVIDE_EMERGENCY_CONTACT"
        ]
    },
    "isEor": false,
    "jobTitle": null,
    "invitationMessage": null,
    "ICPId": null,
    "currentOnboardingStep": "ONBOARDING_COMPLETED",
    "isShieldProvider": false,
    "employeeExternalId": null,
    "dob": "1982-05-02T00:00:00.000Z",
    "dateOfBirthConsent": false,
    "hasAcceptedGetHiredProgram": false,
    "Company": {
        "id": 111457,
        "Shareholders": [
            {
                "name": "Dilson Sordi Junior",
                "percentage": null
            }
        ]
    },
    "CustomVerificationScreening": null,
    "kycExpirationDetails": null,
    "isEmployee": false,
    "mobility": {},
    "isKYCSpecified": true,
    "isKYCPendingReview": false,
    "isKycNameChangeInProgress": false,
    "kycNameChangeScreening": {},
    "isKYCIdentityResubmissionInProgress": false,
    "kycIdentityResubmissionScreening": {},
    "paymentLimit": 10000,
    "otpOptions": [],
    "teams": [],
    "team": null,
    "organizations": [
        {
            "id": 63997,
            "name": "Direct Link Worldwide",
            "globalPayrollEnabled": false,
            "activeGlobalPayrollIntegrations": [],
            "hrisScopes": [
                "publicPeopleList"
            ],
            "logoUrl": null,
            "hrisEnabled": false,
            "hrisAccessStatusChangedAt": null,
            "engageBillingStatus": "NOT_STARTED",
            "engageAccessStatusChangedAt": null,
            "hrisProfile": {
                "oid": "ce0940bb-ebb6-41ff-9fd7-f3bc14792ae7",
                "isActive": true,
                "directReports": []
            },
            "hrisDirectoriesVisibility": {
                "people": true,
                "analytics": true,
                "org_chart": true,
                "pto": true
            },
            "plugins": {}
        }
    ],
    "organization": null,
    "organizationProfile": null,
    "numberOfTeams": 0,
    "countries": [],
    "isEorEnabled": true,
    "canBecomeClient": false,
    "taxForms": [
        {
            "amount": "1",
            "type": "W-8BEN-E"
        }
    ],
    "companyId": 111457,
    "isEarlyPayoutEnabled": true,
    "isAdvanceEnabled": true,
    "advance": {
        "repayableAdvance": null,
        "overdueAdvance": null
    },
    "hasPendingOrOutstandingAdvance": false,
    "isDeelCardEnabled": false,
    "compliance": {
        "missing": 0,
        "available": 2
    },
    "availableProfiles": [
        {
            "id": 804460,
            "profile_type": "contractor",
            "country": "BR",
            "employee": false,
            "is_eor": false,
            "company": {
                "personal": {
                    "firstName": "Dilson",
                    "lastName": "Sordi Junior",
                    "street": "Rua Professora Maria do Carmo Souza, 18",
                    "city": "São José",
                    "zip": "88101360",
                    "country": "BR",
                    "citizen": "BR",
                    "phone": "+5548996198194",
                    "timezone": "Etc/GMT+3",
                    "taxResidence": "BR",
                    "idType": "Passport"
                }
            }
        }
    ],
    "hris": {
        "id": "ce0940bb-ebb6-41ff-9fd7-f3bc14792ae7",
        "oid": "ce0940bb-ebb6-41ff-9fd7-f3bc14792ae7",
        "slackUserId": null,
        "Contracts": [
            {
                "id": "m2dz6e4",
                "oid": "m2dz6e4",
                "contractType": "ongoing_time_based",
                "status": "in_progress"
            }
        ]
    },
    "kycScreening": {
        "status": "verified",
        "isPending": false,
        "responseStatus": "approved",
        "type": "veriff",
        "attempts": 1
    },
    "isKYCScreeningNeeded": true,
    "signupRoute": "self",
    "lastLoginData": {
        "google": "2023-08-10T12:49:11.674Z"
    },
    "verifiedAt": "2023-05-02T18:01:04.311Z",
    "scimPermissionConfig": false,
    "hashid": "mR9yxWqR",
    "features": {
        "platformCohereChat": {
            "name": "Platform Cohere Chat",
            "result": [
                {
                    "model": "user",
                    "id": 767668,
                    "isEnabled": true
                }
            ],
            "keys": [
                "platform.cohereChat.targetPercentage"
            ]
        },
        "newAccountSettings": {
            "name": "Can Use New Account Settings?",
            "result": [
                {
                    "model": "user",
                    "id": 767668,
                    "isEnabled": true
                }
            ],
            "keys": [
                "onboarding.newAccountSettings.targetPercentage"
            ]
        },
        "platformMfaRecommendation": {
            "name": "Platform MFA Recommendation",
            "result": [
                {
                    "model": "user",
                    "id": 767668,
                    "isEnabled": true
                }
            ],
            "keys": [
                "platform.mfaRecommendation.targetPercentage",
                "platform.mfaRecommendation.allowedUsers",
                "platform.mfaRecommendation.allowedEmailDomains"
            ]
        },
        "platformTrustedDevice": {
            "name": "Platform Trusted Devices",
            "result": [
                {
                    "model": "user",
                    "id": 767668,
                    "isEnabled": false
                }
            ],
            "keys": [
                "platform.trustedDevices.targetPercentage",
                "platform.trustedDevices.allowedUsers",
                "platform.trustedDevices.allowedDomains"
            ]
        },
        "pepScreeningOfac": {
            "name": "KYC PEP Screening - OFAC",
            "result": [
                {
                    "model": "user",
                    "id": 767668,
                    "isEnabled": false
                }
            ],
            "keys": [
                "kyc.pepScreening.ofac.targetPercentage"
            ]
        }
    },
    "source": "email",
    "hrisProfileIds": [
        {
            "oid": "ce0940bb-ebb6-41ff-9fd7-f3bc14792ae7",
            "organizationId": 63997,
            "isActive": true,
            "directReports": []
        }
    ],
    "withdrawEligibilityInfo": {
        "enabled": true
    },
    "isReferralsEnabled": true,
    "canFallbackToEmailOtp": false,
    "hasTimeTrackingContract": false,
    "isDeeler": false
};

//https://api.deel.com/commons/exchange_rates