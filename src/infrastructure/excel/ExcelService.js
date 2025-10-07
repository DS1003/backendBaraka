// Service technique pour parser un fichier Excel de produits
import ExcelJS from 'exceljs';

// Liste complète des champs WooCommerce supportés
const WOO_FIELDS = [
  'name', 'description', 'short_description', 'regular_price', 'sale_price', 'sku', 'stock_quantity', 'manage_stock',
  'stock_status', 'categories', 'images', 'weight', 'length', 'width', 'height', 'status', 'type', 'attributes', 'tags',
  'meta_data', 'downloadable', 'virtual', 'tax_class', 'tax_status'
];

export default class ExcelService {
  async parseProducts(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    const products = [];
    let header = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        header = row.values.slice(1).map(h => h && h.toString().trim());
        return;
      }
      const values = row.values.slice(1);
      const product = {};
      header.forEach((col, idx) => {
        // On mappe chaque colonne Excel à son champ WooCommerce si possible
        if (WOO_FIELDS.includes(col)) {
          product[col] = values[idx];
        } else {
          // Permet d'ajouter des champs custom ou de les ignorer
          product[col] = values[idx];
        }
      });
      // Adaptation des types pour certains champs WooCommerce
      if (product.regular_price) product.regular_price = product.regular_price.toString();
      if (product.sale_price) product.sale_price = product.sale_price.toString();
      if (product.stock_quantity) product.stock_quantity = parseInt(product.stock_quantity);
      if (product.manage_stock !== undefined) product.manage_stock = Boolean(product.manage_stock);
      if (product.images && typeof product.images === 'string') {
        // Supporte plusieurs images séparées par ;
        product.images = product.images.split(';').map(src => ({ src: src.trim() }));
      }
      if (product.categories && typeof product.categories === 'string') {
        product.categories = product.categories.split(';').map(name => ({ name: name.trim() }));
      }
      if (product.tags && typeof product.tags === 'string') {
        product.tags = product.tags.split(';').map(name => ({ name: name.trim() }));
      }
      // Ajoute d'autres adaptations si besoin
      products.push(product);
    });
    return products;
  }

  // Permet d'exposer dynamiquement les colonnes Excel détectées pour aider l'utilisateur à faire la correspondance
  async getExcelColumns(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    const headerRow = worksheet.getRow(1);
    return headerRow.values.slice(1).map(h => h && h.toString().trim());
  }

  // Nouvelle méthode : parser avec mapping personnalisé {colExcel: wooField}
  async parseProductsWithMapping(filePath, mapping) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    const products = [];
    let header = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        header = row.values.slice(1).map(h => h && h.toString().trim());
        return;
      }
      const values = row.values.slice(1);
      const product = {};
      Object.entries(mapping).forEach(([excelCol, wooField]) => {
        const idx = header.indexOf(excelCol);
        if (idx !== -1) {
          product[wooField] = values[idx];
        }
      });
      // Adaptation des types pour certains champs WooCommerce (identique à parseProducts)
      if (product.regular_price) product.regular_price = product.regular_price.toString();
      if (product.sale_price) product.sale_price = product.sale_price.toString();
      if (product.stock_quantity) product.stock_quantity = parseInt(product.stock_quantity);
      if (product.manage_stock !== undefined) product.manage_stock = Boolean(product.manage_stock);
      if (product.images && typeof product.images === 'string') {
        product.images = product.images.split(';').map(src => ({ src: src.trim() }));
      }
      if (product.categories && typeof product.categories === 'string') {
        product.categories = product.categories.split(';').map(name => ({ name: name.trim() }));
      }
      if (product.tags && typeof product.tags === 'string') {
        product.tags = product.tags.split(';').map(name => ({ name: name.trim() }));
      }
      products.push(product);
    });
    return products;
  }
}
