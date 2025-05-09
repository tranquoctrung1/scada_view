const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['LineString'],
            required: true,
        },
        coordinates: {
            type: [[Number]], // Array of [lng, lat] coordinate pairs
            required: true,
        },
    },
    properties: {
        OBJECTID: Number,
        IDDoanOC: Number,
        IDTuyenOC: Number,
        LoaiTuyenO: Number,
        VatLieu: String,
        DuongKinhN: Number,
        DuongKinhT: Number,
        DoNhamDN: Number,
        DoNhamTT: Number,
        ApLucLV: Number,
        ChieuDaiHC: Number,
        KinhDoDauO: Number,
        ViDoDauOng: Number,
        KinhDoCuoi: Number,
        ViDoCuoiOn: Number,
        TieuChuan: String,
        HangSX: Number,
        NuocSX: Number,
        ThoiHanSD: Number,
        IDDVThietK: String,
        IDDVThiCon: String,
        IDDVGiamSa: String,
        IDDVQuanLy: String,
        NgayLapDat: Date,
        MoTaViTri: String,
        MoiTruongX: Number,
        DoSau: Number,
        DoDoc: Number,
        IDTuyenDuo: Number,
        IDPhuongXa: String,
        IDKVCN: String,
        TinhTrang: Number,
        TrangThaiC: Number,
        GhiChu: String,
        LASTUPDATE: Date,
        LASTEDITOR: String,
        ENABLED: Number,
        IDHoSoQT: Number,
        GlobalID: String,
        MatDoGiaoT: Number,
        KhuVuc: String,
        Layer: String,
        LyrColor: Number,
        LyrLineWt: Number,
        ChuDauTu: Number,
        IDVungCN: String,
        GISID: Number,
        IDVungQuan: String,
        IDTuyenOC_: String,
        SHAPE_STLe: Number,
    },
});

const PipeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['FeatureCollection'],
        required: true,
    },
    features: [featureSchema],
});

var Pipe = mongoose.model('Pipe', PipeSchema, 't_Pipe');

module.exports = Pipe;
