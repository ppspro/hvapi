export class AuditLogEntity {
  id!: string;
  userId!: string;
  action!: string;
  details!: string | null;
  ipAddress!: string | null;
  createdAt!: Date;
}
