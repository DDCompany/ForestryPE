const Bitmap = android.graphics.Bitmap;
const Canvas = android.graphics.Canvas;
const Paint = android.graphics.Paint;
const LightingColorFilter = android.graphics.LightingColorFilter;
const Color = android.graphics.Color;
const File = java.io.File;
const PorterDuffXfermode = android.graphics.PorterDuffXfermode;
const PorterDuff = android.graphics.PorterDuff;

interface IBitmapLayer {
    bitmap: android.graphics.Bitmap | string,
    mask?: android.graphics.Bitmap | string,
    color?: number
}

interface IBitmapDescription {
    path: string,
    size?: number,
    layers: IBitmapLayer[]
}

class TextureBakery {
    static create(description: IBitmapDescription) {
        const destination = new File(`${__dir__}resources/res/${description.path}.png`);
        // if (destination.exists()) {
        //     alert(`Already created ${description.path}`);
        //     return;
        // }

        const parentDir = destination.getParentFile();
        if (!parentDir.exists()) {
            parentDir.mkdirs();
        }

        const bitmap = this.buildBitmap(description.size ?? 16, description.layers);
        FileTools.WriteImage(destination.getAbsolutePath(), bitmap);
        alert(`Baked ${description.path}`);
    }

    static loadBitmap(bitmap: android.graphics.Bitmap | string) {
        if (typeof bitmap === "string") {
            const options = new android.graphics.BitmapFactory.Options();
            options.inScaled = false;
            options.inPreferredConfig = Bitmap.Config.ALPHA_8;
            try {
                const bmp = android.graphics.BitmapFactory.decodeFile(
                    FileTools.getFullPath(`${__dir__}overlays/${bitmap}.png`), options);
                bmp.setHasAlpha(true);
                return bmp;
            } catch (e) {
                return null;
            }
            // const loaded = FileTools.ReadImage();
            // assert(loaded, `File not found: ${bitmap}`);
            // return loaded;
        }

        return bitmap;
    }

    private static buildBitmap(size: number, layers: IBitmapLayer[]) {
        const bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        bitmap.setHasAlpha(true);
        const canvas = new Canvas(bitmap);
        for (const layer of layers) {
            const image = this.loadBitmap(layer.bitmap);

            const paint = new Paint();
            if (layer.mask) {
                const mask = this.loadBitmap(layer.mask);
                canvas.drawBitmap(mask, 0, 0, null);
                paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
            }

            if (layer.color) {
                const color = Color.parseColor(`#${layer.color.toString(16)}`);
                paint.setColorFilter(new LightingColorFilter(color, 0));
            }

            canvas.drawBitmap(image, 0, 0, paint);
        }

        return bitmap;
    }
}