const mongoose = require('mongoose');

var dmaDrawingSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true,
    },
    properties: {
        PKID: Number,
        IDKVCN: String,
        IDVungCN: String,
        TenKVCN: String,
        GhiChu: String,
        LASTUPDATE: String,
        LASTEDITOR: String,
        OBJECTID: Number,
        GlobalID: String,
        PhanQuyen: String,
        TrangThai: String,
        IDVungQuan: String,
        SHAPE_STAr: Number,
        SHAPE_STLe: Number,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true,
        },
        coordinates: {
            type: [[[Number]]], // 3D array for Polygon
            required: true,
        },
    },
});

var DMADrawing = mongoose.model(
    'DMADrawing',
    dmaDrawingSchema,
    't_DMA_Drawing',
);

module.exports = DMADrawing;
