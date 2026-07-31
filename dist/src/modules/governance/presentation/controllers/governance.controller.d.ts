import { GovernanceService } from '../../application/use-cases/governance.service';
import { SystemConfigurationResponseDto, FeatureFlagResponseDto, MasterDataCategoryResponseDto, MasterDataItemResponseDto, PlatformGovernancePolicyResponseDto, MaintenanceConfigurationResponseDto, GovernanceAuditLogResponseDto, GovernanceDashboardResponseDto } from '../dto/governance-response.dto';
import { CreateConfigurationDto, UpdateConfigurationDto, ImportConfigurationsDto, CreateFeatureFlagDto, CreateMasterCategoryDto, CreateMasterItemDto, CreatePlatformPolicyDto, UpdateMaintenanceModeDto } from '../dto/governance-enterprise.dto';
export declare class GovernanceController {
    private readonly governanceService;
    constructor(governanceService: GovernanceService);
    getDashboard(): Promise<GovernanceDashboardResponseDto>;
    createConfiguration(req: any, dto: CreateConfigurationDto): Promise<SystemConfigurationResponseDto>;
    getConfigurations(category?: string): Promise<SystemConfigurationResponseDto[]>;
    exportConfigurations(category?: string): Promise<SystemConfigurationResponseDto[]>;
    importConfigurations(req: any, dto: ImportConfigurationsDto): Promise<{
        imported: number;
    }>;
    getConfigurationById(id: string): Promise<SystemConfigurationResponseDto>;
    updateConfiguration(req: any, id: string, dto: UpdateConfigurationDto): Promise<SystemConfigurationResponseDto>;
    softDeleteConfiguration(req: any, id: string): Promise<any>;
    createFeatureFlag(req: any, dto: CreateFeatureFlagDto): Promise<FeatureFlagResponseDto>;
    getFeatureFlags(): Promise<FeatureFlagResponseDto[]>;
    getFeatureFlagById(id: string): Promise<FeatureFlagResponseDto>;
    updateFeatureFlag(req: any, id: string, dto: Partial<CreateFeatureFlagDto>): Promise<FeatureFlagResponseDto>;
    softDeleteFeatureFlag(req: any, id: string): Promise<any>;
    createMasterCategory(req: any, dto: CreateMasterCategoryDto): Promise<MasterDataCategoryResponseDto>;
    getMasterCategories(): Promise<MasterDataCategoryResponseDto[]>;
    createMasterItem(req: any, dto: CreateMasterItemDto): Promise<MasterDataItemResponseDto>;
    getMasterItems(categoryId?: string): Promise<MasterDataItemResponseDto[]>;
    updateMasterItem(req: any, id: string, dto: Partial<CreateMasterItemDto>): Promise<MasterDataItemResponseDto>;
    softDeleteMasterItem(req: any, id: string): Promise<any>;
    createPolicy(req: any, dto: CreatePlatformPolicyDto): Promise<PlatformGovernancePolicyResponseDto>;
    getPolicies(): Promise<PlatformGovernancePolicyResponseDto[]>;
    getPolicyById(id: string): Promise<PlatformGovernancePolicyResponseDto>;
    updatePolicy(req: any, id: string, dto: Partial<CreatePlatformPolicyDto>): Promise<PlatformGovernancePolicyResponseDto>;
    softDeletePolicy(req: any, id: string): Promise<any>;
    getMaintenanceConfig(): Promise<MaintenanceConfigurationResponseDto>;
    updateMaintenanceConfig(req: any, dto: UpdateMaintenanceModeDto): Promise<MaintenanceConfigurationResponseDto>;
    getAuditLogs(entityType?: string): Promise<GovernanceAuditLogResponseDto[]>;
    getAuditLogById(id: string): Promise<GovernanceAuditLogResponseDto>;
}
