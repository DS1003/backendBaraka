// Route pour sauvegarder les produits enrichis/corrigés par l'utilisateur
// POST /excel/save
// Body: { products: [ { ...données produit WooCommerce complètes... } ] }
import ProductRepository from '../../infrastructure/db/PrismaProductRepository.js';
import ExcelService from '../../infrastructure/excel/ExcelService.js';
import WooCommerceProductService from '../../infrastructure/woo/WooCommerceProductService.js';

const productRepo = new ProductRepository();

export async function saveCompletedProducts(req, res, next) {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Aucun produit à sauvegarder' });
    }
    // Récupération dynamique des champs obligatoires WooCommerce
    const wooService = new WooCommerceProductService({
      storeUrl: process.env.WOO_STORE_URL,
      apiKey: process.env.WOO_API_KEY,
      apiSecret: process.env.WOO_API_SECRET,
    });
    let REQUIRED_FIELDS = ['name', 'regular_price', 'sku'];
    let wooApiError = null;
    let notification = null;
    try {
      REQUIRED_FIELDS = await wooService.fetchRequiredFields();
    } catch (e) {
      wooApiError = 'Erreur WooCommerce : impossible de récupérer les champs obligatoires. Vérifiez la connexion ou les identifiants API.';
      notification = {
        type: 'warning',
        title: 'Connexion WooCommerce échouée',
        message: 'La connexion à WooCommerce a échoué. Les champs obligatoires sont estimés. Veuillez vérifier vos paramètres ou réessayer plus tard.'
      };
    }
    const saved = [];
    const rejected = [];
    for (const prod of products) {
      const missing = REQUIRED_FIELDS.filter(f => !prod[f]);
      if (missing.length > 0) {
        rejected.push({ product: prod, missingFields: missing });
        continue;
      }
      const created = await productRepo.createProduct(prod);
      saved.push(created);
    }
    res.json({ saved, rejected, requiredFields: REQUIRED_FIELDS, wooApiError, notification });
  } catch (err) {
    next(err);
  }
}
// Contrôleur pour exposer les colonnes d'un fichier Excel (aide mapping Sage/WooCommerce)

const excelService = new ExcelService();

export async function getExcelColumns(req, res, next) {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Aucun fichier Excel fourni' });
    }
    const columns = await excelService.getExcelColumns(req.file.path);
    res.json({ columns });
  } catch (err) {
    next(err);
  }
}

// Nouvelle route : POST /import
// Accepte un fichier Excel + un mapping personnalisé (mapping: { excelCol: wooField })
export async function importProductsWithMapping(req, res, next) {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Aucun fichier Excel fourni' });
    }
    const mapping = req.body.mapping ? JSON.parse(req.body.mapping) : null;
    if (!mapping || typeof mapping !== 'object') {
      return res.status(400).json({ message: 'Mapping invalide ou manquant' });
    }
    // Liste complète des champs WooCommerce attendus (doit matcher avec ExcelService)
    const WOO_FIELDS = [
      'name', 'description', 'short_description', 'regular_price', 'sale_price', 'sku', 'stock_quantity', 'manage_stock',
      'stock_status', 'categories', 'images', 'weight', 'length', 'width', 'height', 'status', 'type', 'attributes', 'tags',
      'meta_data', 'downloadable', 'virtual', 'tax_class', 'tax_status'
    ];
    // Champs WooCommerce couverts par le mapping fourni
    const mappedWooFields = Object.values(mapping);
    // Champs manquants à renseigner (non mappés)
    const missingFields = WOO_FIELDS.filter(f => !mappedWooFields.includes(f));
    const products = await excelService.parseProductsWithMapping(req.file.path, mapping);
    // Pour chaque produit, on signale les champs manquants (à renseigner plus tard)
    const productsWithMissing = products.map(prod => {
      const missing = missingFields.filter(f => !prod[f]);
      return { ...prod, missingFields: missing };
    });
    res.json({ products: productsWithMissing, missingFields });
  } catch (err) {
    next(err);
  }
}
