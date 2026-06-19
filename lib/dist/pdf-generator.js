"use strict";
/**
 * Optimized Print Handler untuk Laporan Kehadiran
 * Menggunakan native browser print dengan pagination otomatis
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.exportTableData = exports.generatePDF = void 0;
/**
 * Optimize element untuk print sebelum print dialog
 * Mengurangi memory usage dan file size
 */
function optimizeForPrint(element) {
    var clone = element.cloneNode(true);
    // Remove unnecessary elements
    clone.querySelectorAll('.print\\:hidden').forEach(function (el) {
        el.remove();
    });
    // Clean up styling
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.boxShadow = 'none';
    clone.style.backgroundColor = 'white';
    // Optimize images
    clone.querySelectorAll('img').forEach(function (img) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.pageBreakInside = 'avoid';
    });
    // Optimize tables
    clone.querySelectorAll('table').forEach(function (table) {
        table.style.pageBreakInside = 'avoid';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
    });
    clone.querySelectorAll('tr').forEach(function (tr) {
        tr.style.pageBreakInside = 'avoid';
    });
    clone.querySelectorAll('tbody').forEach(function (tbody) {
        tbody.style.pageBreakInside = 'avoid';
    });
    return clone;
}
/**
 * Generate and print PDF dengan optimasi performa
 * Menggunakan native print dialog browser
 */
function generatePDF(options) {
    return __awaiter(this, void 0, void 0, function () {
        var elementId, _a, title, _b, margins, element, printWindow_1, optimizedElement, printHTML;
        return __generator(this, function (_c) {
            elementId = options.elementId, _a = options.title, title = _a === void 0 ? 'Laporan Kehadiran Mahasiswa' : _a, _b = options.margins, margins = _b === void 0 ? { top: 10, right: 10, bottom: 10, left: 10 } : _b;
            element = document.getElementById(elementId);
            if (!element) {
                throw new Error("Element dengan ID \"" + elementId + "\" tidak ditemukan");
            }
            try {
                printWindow_1 = window.open('', '', 'height=400,width=600');
                if (!printWindow_1) {
                    throw new Error('Tidak bisa membuka print window');
                }
                optimizedElement = optimizeForPrint(element);
                printHTML = "\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <meta charset=\"UTF-8\">\n          <title>" + title + "</title>\n          <style>\n            * {\n              margin: 0;\n              padding: 0;\n              box-sizing: border-box;\n            }\n            \n            body {\n              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;\n              line-height: 1.5;\n              color: #000;\n              background: white;\n              padding: " + margins.top + "mm " + margins.right + "mm " + margins.bottom + "mm " + margins.left + "mm;\n            }\n\n            table {\n              width: 100%;\n              border-collapse: collapse;\n              margin-bottom: 10px;\n            }\n\n            th, td {\n              border: 1px solid #ddd;\n              padding: 8px;\n              text-align: left;\n            }\n\n            th {\n              background-color: #f8f9fa;\n              font-weight: 600;\n            }\n\n            tr {\n              page-break-inside: avoid;\n            }\n\n            thead {\n              display: table-header-group;\n              page-break-after: avoid;\n            }\n\n            tbody {\n              page-break-inside: avoid;\n            }\n\n            h1, h2, h3 {\n              margin-bottom: 10px;\n              page-break-after: avoid;\n            }\n\n            h1 { font-size: 24px; }\n            h2 { font-size: 18px; }\n            h3 { font-size: 14px; }\n\n            p {\n              margin-bottom: 10px;\n              page-break-inside: avoid;\n            }\n\n            img {\n              max-width: 100%;\n              height: auto;\n              page-break-inside: avoid;\n            }\n\n            .no-print {\n              display: none;\n            }\n\n            @media print {\n              body {\n                margin: 0;\n                padding: " + margins.top + "mm " + margins.right + "mm " + margins.bottom + "mm " + margins.left + "mm;\n              }\n              \n              a {\n                text-decoration: underline;\n                color: #000;\n              }\n            }\n          </style>\n        </head>\n        <body>\n          " + optimizedElement.innerHTML + "\n        </body>\n      </html>\n    ";
                printWindow_1.document.write(printHTML);
                printWindow_1.document.close();
                // Wait for content to load then print
                printWindow_1.onload = function () {
                    printWindow_1.focus();
                    printWindow_1.print();
                    // Close after print
                    setTimeout(function () {
                        printWindow_1.close();
                    }, 250);
                };
            }
            catch (error) {
                console.error('Error generating PDF:', error);
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
exports.generatePDF = generatePDF;
/**
 * Alternative: Download sebagai JSON/CSV untuk re-print nanti
 * Berguna untuk dataset besar
 */
function exportTableData(elementId, filename) {
    if (filename === void 0) { filename = 'laporan.json'; }
    var element = document.getElementById(elementId);
    if (!element) {
        throw new Error("Element dengan ID \"" + elementId + "\" tidak ditemukan");
    }
    var table = element.querySelector('table');
    if (!table) {
        throw new Error('Tabel tidak ditemukan di element');
    }
    // Extract table data
    var data = [];
    var headers = [];
    // Get headers
    table.querySelectorAll('thead th').forEach(function (th) {
        var _a;
        headers.push(((_a = th.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '');
    });
    // Get rows
    table.querySelectorAll('tbody tr').forEach(function (tr) {
        var row = {};
        tr.querySelectorAll('td').forEach(function (td, index) {
            var _a;
            row[headers[index] || "col_" + index] = ((_a = td.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        });
        data.push(row);
    });
    // Download as JSON
    var dataStr = JSON.stringify(data, null, 2);
    var dataBlob = new Blob([dataStr], { type: 'application/json' });
    var url = URL.createObjectURL(dataBlob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
exports.exportTableData = exportTableData;
