import { ApiProperty } from '@nestjs/swagger';

export class ConfigurationVersionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() version!: number;
  @ApiProperty({ nullable: true }) previousValue?: string;
  @ApiProperty() newValue!: string;
  @ApiProperty({ nullable: true }) changedBy?: string;
  @ApiProperty({ nullable: true }) changeReason?: string;
  @ApiProperty() createdAt!: string;
}

export class SystemConfigurationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() category!: string;
  @ApiProperty() key!: string;
  @ApiProperty() value!: string;
  @ApiProperty() valueType!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() isEncrypted!: boolean;
  @ApiProperty() isEditable!: boolean;
  @ApiProperty() version!: number;
  @ApiProperty({ nullable: true }) createdBy?: string;
  @ApiProperty({ nullable: true }) updatedBy?: string;
  @ApiProperty() status!: string;
  @ApiProperty({ type: [ConfigurationVersionResponseDto] }) versions!: ConfigurationVersionResponseDto[];
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class FeatureFlagResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() status!: string;
  @ApiProperty({ type: [String] }) enabledForRoles!: string[];
  @ApiProperty({ type: [String] }) enabledForModules!: string[];
  @ApiProperty() rolloutPercentage!: number;
  @ApiProperty() version!: number;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class MasterDataItemResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() categoryId!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() sortOrder!: number;
  @ApiProperty() isDefault!: boolean;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: string;
}

export class MasterDataCategoryResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() status!: string;
  @ApiProperty({ type: [MasterDataItemResponseDto] }) items!: MasterDataItemResponseDto[];
  @ApiProperty() createdAt!: string;
}

export class PlatformGovernancePolicyResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() title!: string;
  @ApiProperty({ nullable: true }) description?: string;
  @ApiProperty() content!: string;
  @ApiProperty() version!: string;
  @ApiProperty({ nullable: true }) effectiveDate?: string;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class MaintenanceConfigurationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() mode!: string;
  @ApiProperty({ nullable: true }) message?: string;
  @ApiProperty({ nullable: true }) startsAt?: string;
  @ApiProperty({ nullable: true }) endsAt?: string;
  @ApiProperty() allowAdminAccess!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class GovernanceAuditLogResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() entityType!: string;
  @ApiProperty() entityId!: string;
  @ApiProperty() action!: string;
  @ApiProperty({ nullable: true }) performedBy?: string;
  @ApiProperty({ nullable: true }) oldValue?: string;
  @ApiProperty({ nullable: true }) newValue?: string;
  @ApiProperty({ nullable: true }) metadata?: any;
  @ApiProperty() createdAt!: string;
}

export class GovernanceDashboardResponseDto {
  @ApiProperty() totalConfigurations!: number;
  @ApiProperty() activeFeatureFlags!: number;
  @ApiProperty() masterDataCategoriesCount!: number;
  @ApiProperty() masterDataItemsCount!: number;
  @ApiProperty() activePoliciesCount!: number;
  @ApiProperty() maintenanceMode!: string;
  @ApiProperty() recentAuditLogsCount!: number;
}
