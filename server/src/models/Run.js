import mongoose from 'mongoose';


const FindingSchema = new mongoose.Schema({
type: { type: String, enum: ['product', 'image', 'console', 'network'], required: true },
severity: { type: String, enum: ['info', 'warn', 'error'], default: 'info' },
message: String,
meta: mongoose.Schema.Types.Mixed
}, { _id: false });


const RunSchema = new mongoose.Schema({
url: { type: String, required: true },
platform: { type: String, enum: ['shopify', 'bigcommerce', 'auto'], default: 'auto' },
status: { type: String, enum: ['queued', 'running', 'passed', 'failed'], default: 'queued' },
startedAt: Date,
finishedAt: Date,
summary: {
productChecks: {
titleFound: Boolean,
priceFound: Boolean,
addToCartFound: Boolean
},
images: {
total: Number,
loaded: Number,
broken: Number,
brokenSamples: [String]
},
errors: {
consoleCount: Number,
networkFailures: Number
}
},
findings: [FindingSchema]
}, { timestamps: true });


export const Run = mongoose.model('Run', RunSchema);