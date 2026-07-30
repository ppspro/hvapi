"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ai_ocr_service_1 = require("../application/use-cases/ai-ocr.service");
describe('AiOcrService', () => {
    let service;
    let mockAiOcrRepository;
    let mockLogger;
    beforeEach(() => {
        mockAiOcrRepository = {
            findProfileByUserId: jest.fn(),
            createDocument: jest.fn(),
            createExtraction: jest.fn(),
            findDocumentById: jest.fn(),
            createReview: jest.fn(),
            updateDocumentStatus: jest.fn(),
        };
        mockLogger = {
            log: jest.fn(),
        };
        service = new ai_ocr_service_1.AiOcrService(mockAiOcrRepository, mockLogger);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('extractDocument', () => {
        it('should successfully upload a document and save parsed extraction details', async () => {
            mockAiOcrRepository.findProfileByUserId.mockResolvedValue({ id: 'profile-123' });
            mockAiOcrRepository.createDocument.mockResolvedValue({ id: 'doc-123' });
            mockAiOcrRepository.createExtraction.mockResolvedValue({ id: 'extract-123' });
            const result = await service.extractDocument('user-123', {
                imageUrl: 'https://storage.healthvault360.com/reports/lab-123.jpg',
            });
            expect(mockAiOcrRepository.createDocument).toHaveBeenCalledWith('profile-123', 'https://storage.healthvault360.com/reports/lab-123.jpg');
            expect(mockAiOcrRepository.createExtraction).toHaveBeenCalled();
            expect(result.documentId).toBe('doc-123');
            expect(result.confidence).toBe(0.92);
        });
    });
});
//# sourceMappingURL=ai-ocr.service.spec.js.map