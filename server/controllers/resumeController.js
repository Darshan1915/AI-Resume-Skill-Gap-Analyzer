import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { upload } from '../middleware/uploadMiddleware.js';
import { extractSkills } from '../utils/geminiAI.js';
import Resume from '../models/Resume.js';

export const uploadAndExtractSkills = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err });
        if (!req.file) return res.status(400).json({ message: 'No file selected' });

        const filePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        let rawText = '';

        try {
            if (ext === '.pdf') {
                const buffer = fs.readFileSync(filePath);
                const parser = new PDFParse({ data: buffer });
                const result = await parser.getText();
                rawText = result.text;
                await parser.destroy();
            } else if (ext === '.docx') {
                const result = await mammoth.extractRawText({ path: filePath });
                rawText = result.value;
            } else {
                throw new Error('Unsupported file type');
            }

            const extractedSkills = await extractSkills(rawText);

            const newResume = new Resume({
                user: req.user._id,
                fileName: req.file.originalname,
                extractedSkills,
                rawText,
            });

            const savedResume = await newResume.save();
            fs.unlinkSync(filePath);

            res.status(201).json({
                message: 'Resume uploaded and skills extracted successfully',
                resumeId: savedResume._id,
                extractedSkills: savedResume.extractedSkills,
            });

        } catch (error) {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            console.error(error);
            res.status(500).json({ message: 'Processing failed' });
        }
    });
};
