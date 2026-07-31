export declare class AddressBlockDto {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    district?: string;
    postalCode?: string;
    country?: string;
}
export declare class UpdateAddressDto {
    currentAddress?: AddressBlockDto;
    permanentAddress?: AddressBlockDto;
}
