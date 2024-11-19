export interface ImageOptimizationOptions {
  quality?: number; // 0-1
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'png' | 'webp';
  progressive?: boolean;
  stripMetadata?: boolean;
}

export interface OptimizationResult {
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  format: string;
  dimensions: { width: number; height: number };
}

export class ImageOptimizer {
  private static instance: ImageOptimizer;
  private cache: Map<string, string> = new Map();

  public static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  public async optimizeImage(
    imageUri: string,
    options: ImageOptimizationOptions = {}
  ): Promise<{ uri: string; result: OptimizationResult }> {
    const cacheKey = this.generateCacheKey(imageUri, options);
    
    if (this.cache.has(cacheKey)) {
      return {
        uri: this.cache.get(cacheKey)!,
        result: await this.getImageInfo(this.cache.get(cacheKey)!),
      };
    }

    try {
      const optimizedUri = await this.processImage(imageUri, options);
      const result = await this.getImageInfo(optimizedUri);
      
      this.cache.set(cacheKey, optimizedUri);
      
      return { uri: optimizedUri, result };
    } catch (error) {
      throw new Error(`Image optimization failed: ${error}`);
    }
  }

  public async batchOptimize(
    images: Array<{ uri: string; options?: ImageOptimizationOptions }>
  ): Promise<Array<{ uri: string; result: OptimizationResult }>> {
    const promises = images.map(({ uri, options }) => 
      this.optimizeImage(uri, options)
    );
    
    return Promise.all(promises);
  }

  public async generateThumbnail(
    imageUri: string,
    size: { width: number; height: number }
  ): Promise<string> {
    const options: ImageOptimizationOptions = {
      maxWidth: size.width,
      maxHeight: size.height,
      quality: 0.8,
      format: 'jpeg',
    };

    const result = await this.optimizeImage(imageUri, options);
    return result.uri;
  }

  public async generateResponsiveImages(
    imageUri: string,
    sizes: number[]
  ): Promise<Array<{ size: number; uri: string }>> {
    const results = await Promise.all(
      sizes.map(async (size) => {
        const optimized = await this.optimizeImage(imageUri, {
          maxWidth: size,
          quality: 0.8,
          format: 'webp',
        });
        return { size, uri: optimized.uri };
      })
    );

    return results;
  }

  public async convertFormat(
    imageUri: string,
    targetFormat: 'jpeg' | 'png' | 'webp'
  ): Promise<string> {
    const result = await this.optimizeImage(imageUri, {
      format: targetFormat,
      quality: 0.9,
    });
    
    return result.uri;
  }

  public async compressForUpload(
    imageUri: string,
    maxSizeKB: number
  ): Promise<string> {
    let quality = 0.9;
    let result = await this.optimizeImage(imageUri, { quality });
    
    // Iteratively reduce quality until size target is met
    while (result.result.optimizedSize > maxSizeKB * 1024 && quality > 0.1) {
      quality -= 0.1;
      result = await this.optimizeImage(imageUri, { quality });
    }
    
    return result.uri;
  }

  private async processImage(
    imageUri: string,
    options: ImageOptimizationOptions
  ): Promise<string> {
    // This would use native image processing libraries
    // For now, return the original URI as a mock
    return imageUri;
  }

  private async getImageInfo(imageUri: string): Promise<OptimizationResult> {
    // Mock image info
    return {
      originalSize: 1024 * 1024, // 1MB
      optimizedSize: 512 * 1024, // 512KB
      compressionRatio: 0.5,
      format: 'jpeg',
      dimensions: { width: 1920, height: 1080 },
    };
  }

  private generateCacheKey(
    imageUri: string,
    options: ImageOptimizationOptions
  ): string {
    return `${imageUri}_${JSON.stringify(options)}`;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  public async preloadImages(imageUris: string[]): Promise<void> {
    const promises = imageUris.map(uri => this.optimizeImage(uri));
    await Promise.all(promises);
  }
}

export default ImageOptimizer;
