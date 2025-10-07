// Contrôleur Produit (CRUD + import Excel)
import PrismaProductRepository from '../../infrastructure/db/PrismaProductRepository.js';
import CreateProductUseCase from '../../application/products/CreateProductUseCase.js';
import GetProductUseCase from '../../application/products/GetProductUseCase.js';
import UpdateProductUseCase from '../../application/products/UpdateProductUseCase.js';
import DeleteProductUseCase from '../../application/products/DeleteProductUseCase.js';
import ImportExcelUseCase from '../../application/products/ImportExcelUseCase.js';
import CloudinaryService from '../../infrastructure/cloudinary/CloudinaryService.js';

const productRepository = new PrismaProductRepository();

const cloudinaryService = new CloudinaryService();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getProductUseCase = new GetProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const importExcelUseCase = new ImportExcelUseCase(productRepository);

export async function createProduct(req, res, next) {
  try {
    let imageUrl = req.body.imageUrl;
    if (req.file && req.file.path) {
      imageUrl = await cloudinaryService.uploadImage(req.file.path);
    }
    const product = await createProductUseCase.execute({ ...req.body, imageUrl, userId: req.user.id });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await getProductUseCase.execute(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await updateProductUseCase.execute({ ...req.body, id: req.params.id });
    res.json({ product });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    await deleteProductUseCase.execute(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function importProductsExcel(req, res, next) {
  try {
    // req.file.path fourni par multer
    const products = await importExcelUseCase.execute(req.file.path, req.user.id);
    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
}
