// Use case d'import de produits via Excel
import ExcelService from '../../infrastructure/excel/ExcelService.js';
import CloudinaryService from '../../infrastructure/cloudinary/CloudinaryService.js';

export default class ImportExcelUseCase {
  constructor(productRepository) {
  this.productRepository = productRepository;
  this.excelService = new ExcelService();
  this.cloudinaryService = new CloudinaryService();
  }

  async execute(filePath, userId) {
    // Parse le fichier Excel et insère les produits
    const products = await this.excelService.parseProducts(filePath);
    const created = [];
    for (const p of products) {
      let imageUrl = p.imageUrl;
      // Si imageUrl est un chemin local, upload sur Cloudinary
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = await this.cloudinaryService.uploadImage(imageUrl);
      }
      const prod = await this.productRepository.create({ ...p, imageUrl, userId });
      created.push(prod);
    }
    return created;
  }
}
