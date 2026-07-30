export class FacilityEntity {
  id!: string;
  name!: string;
  address!: string;
  phone!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class FacilityDepartmentEntity {
  id!: string;
  facilityId!: string;
  name!: string;
  description!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
