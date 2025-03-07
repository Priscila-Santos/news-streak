"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleArticleRead = void 0;
const userModel_1 = require("../models/userModel");
const handleArticleRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const { articleId } = req.body;
            yield (0, userModel_1.recordArticleRead)(req.user.id, articleId);
            yield (0, userModel_1.updateUserStreak)(req.user.id);
            res.status(200).json({ message: 'Article read recorded successfully' });
        }
        else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    }
    catch (error) {
        console.error("Error recording article read:", error);
        res.status(500).json({ message: 'Error recording article read' });
    }
});
exports.handleArticleRead = handleArticleRead;
