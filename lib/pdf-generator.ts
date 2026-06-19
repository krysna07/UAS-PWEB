/**
 * Optimized Print Handler untuk Laporan Kehadiran
 * Menggunakan native browser print dengan pagination otomatis
 */

interface PrintOptions {
  title?: string;
  elementId: string;
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

/**
 * Optimize element untuk print sebelum print dialog
 * Mengurangi memory usage dan file size
 */
function optimizeForPrint(element: HTMLElement) {
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Remove unnecessary elements
  clone.querySelectorAll('.print\\:hidden').forEach(el => {
    el.remove();
  });

  // Clean up styling
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.boxShadow = 'none';
  clone.style.backgroundColor = 'white';

  // Optimize images
  clone.querySelectorAll('img').forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.pageBreakInside = 'avoid';
  });

  // Optimize tables
  clone.querySelectorAll('table').forEach(table => {
    table.style.pageBreakInside = 'avoid';
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
  });

  clone.querySelectorAll('tr').forEach(tr => {
    tr.style.pageBreakInside = 'avoid';
  });

  clone.querySelectorAll('tbody').forEach(tbody => {
    tbody.style.pageBreakInside = 'avoid';
  });

  return clone;
}

/**
 * Generate and print PDF dengan optimasi performa
 * Menggunakan native print dialog browser
 */
export async function generatePDF(options: PrintOptions) {
  const { 
    elementId, 
    title = 'Laporan Kehadiran Mahasiswa',
    margins = { top: 10, right: 10, bottom: 10, left: 10 }
  } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element dengan ID "${elementId}" tidak ditemukan`);
  }

  try {
    // Create print window
    const printWindow = window.open('', '', 'height=400,width=600');
    if (!printWindow) {
      throw new Error('Tidak bisa membuka print window');
    }

    // Optimize element
    const optimizedElement = optimizeForPrint(element);

    // Build HTML untuk print
    const printHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.5;
              color: #000;
              background: white;
              padding: ${margins.top}mm ${margins.right}mm ${margins.bottom}mm ${margins.left}mm;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }

            th {
              background-color: #f8f9fa;
              font-weight: 600;
            }

            tr {
              page-break-inside: avoid;
            }

            thead {
              display: table-header-group;
              page-break-after: avoid;
            }

            tbody {
              page-break-inside: avoid;
            }

            h1, h2, h3 {
              margin-bottom: 10px;
              page-break-after: avoid;
            }

            h1 { font-size: 24px; }
            h2 { font-size: 18px; }
            h3 { font-size: 14px; }

            p {
              margin-bottom: 10px;
              page-break-inside: avoid;
            }

            img {
              max-width: 100%;
              height: auto;
              page-break-inside: avoid;
            }

            .no-print {
              display: none;
            }

            @media print {
              body {
                margin: 0;
                padding: ${margins.top}mm ${margins.right}mm ${margins.bottom}mm ${margins.left}mm;
              }
              
              a {
                text-decoration: underline;
                color: #000;
              }
            }
          </style>
        </head>
        <body>
          ${optimizedElement.innerHTML}
        </body>
      </html>
    `;

    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      
      // Close after print
      setTimeout(() => {
        printWindow.close();
      }, 250);
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

/**
 * Alternative: Download sebagai JSON/CSV untuk re-print nanti
 * Berguna untuk dataset besar
 */
export function exportTableData(elementId: string, filename: string = 'laporan.json') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element dengan ID "${elementId}" tidak ditemukan`);
  }

  const table = element.querySelector('table');
  if (!table) {
    throw new Error('Tabel tidak ditemukan di element');
  }

  // Extract table data
  const data: any[] = [];
  const headers: string[] = [];

  // Get headers
  table.querySelectorAll('thead th').forEach(th => {
    headers.push(th.textContent?.trim() || '');
  });

  // Get rows
  table.querySelectorAll('tbody tr').forEach(tr => {
    const row: any = {};
    tr.querySelectorAll('td').forEach((td, index) => {
      row[headers[index] || `col_${index}`] = td.textContent?.trim() || '';
    });
    data.push(row);
  });

  // Download as JSON
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(url);
}

