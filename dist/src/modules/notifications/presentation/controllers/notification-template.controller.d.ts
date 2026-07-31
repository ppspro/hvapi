import { NotificationService } from '../../application/use-cases/notification.service';
import { NotificationTemplateResponseDto } from '../dto/notification-response.dto';
import { CreateTemplateDto, UpdateTemplateDto } from '../dto/notification-enterprise.dto';
export declare class NotificationTemplateController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createTemplate(req: any, dto: CreateTemplateDto): Promise<NotificationTemplateResponseDto>;
    getTemplates(): Promise<NotificationTemplateResponseDto[]>;
    getTemplateById(id: string): Promise<NotificationTemplateResponseDto>;
    updateTemplate(req: any, id: string, dto: UpdateTemplateDto): Promise<NotificationTemplateResponseDto>;
    softDeleteTemplate(req: any, id: string): Promise<any>;
}
