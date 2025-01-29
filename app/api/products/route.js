import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/lib/models/product";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // GET one product
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    } else {
      // GET all products
      const products = await Product.find({});
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const basePrice = Number(formData.get("basePrice"));
    const category = formData.get("category");
    const stock = Number(formData.get("stock"));
    const tags = JSON.parse(formData.get("tags"));
    const sku = formData.get("sku");
    const discountPrice = Number(formData.get("discountPrice"));
    console.log(
      name,
      description,
      discountPrice,
      basePrice,
      tags,
      sku,
      category,
      "goo"
    );
    const imageUrls = [];

    // Handle multiple image uploads
    for (let i = 0; formData.has(`image${i}`); i++) {
      const image = formData.get(`image${i}`);
      if (!image) continue;

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrls.push(result.secure_url);
    }

    if (imageUrls.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const product = await Product.create({
      name,
      description,
      basePrice,
      category,
      stock,
      tags,
      sku,
      discountPrice,
      images: imageUrls,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const updateData = {};

    // Extract fields from formData
    ["name", "description", "category", "sku"].forEach((field) => {
      const value = formData.get(field);
      if (value) updateData[field] = value;
    });
    ["basePrice", "discountPrice", "stock"].forEach((field) => {
      const value = formData.get(field);
      if (value) updateData[field] = Number(value);
    });

    const tags = formData.get("tags");
    if (tags) updateData.tags = JSON.parse(tags);

    // Handle image updates
    const imageUrls = [];
    for (let i = 0; formData.has(`image${i}`); i++) {
      const image = formData.get(`image${i}`);
      if (!image) continue;

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result =
        (await new Promise()) <
        { secure_url: string } >
        ((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: "auto" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

      imageUrls.push(result.secure_url);
    }

    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete images from Cloudinary
    for (const imageUrl of deletedProduct.images) {
      const publicId = imageUrl.split("/").pop()?.split(".")[0];
      if (publicId) {
        await new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        });
      }
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
