// "use client"

import ProductForm from "./_components/add-product-form";

// import { useDropzone } from "react-dropzone"
// import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { X, Star, Trash } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { useToast } from "@/hooks/use-toast"


// const formSchema = z.object({
//   name: z.string().min(1, { message: "Product name is required" }),
//   sku: z.string().min(1, { message: "SKU is required" }),
//   stock: z.number().min(0, { message: "Stock must be a non-negative number" }),
//   description: z.string().min(1, { message: "Description is required" }),
//   basePrice: z.number().min(0, { message: "Base price must be a non-negative number" }),
//   discountPrice: z.number().min(0, { message: "Discount price must be a non-negative number" }),
//   category: z.string().min(1, { message: "Category is required" }),
//   tags: z.array(z.string()),
// })


// export default function ProductForm({ productId }) {
//   const [images, setImages] = useState([])
//   const [existingImages, setExistingImages] = useState([])
//   const fileTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
//   const [fileError, setFileError] = useState("")
//   const { toast } = useToast()
//   const router = useRouter()

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       sku: "",
//       stock: 0,
//       description: "",
//       basePrice: 0,
//       discountPrice: 0,
//       category: "",
//       tags: [],
//     },
//   })

//   useEffect(() => {
//     if (productId) {
//       fetchProductData()
//     }
//   }, [productId])

//   const fetchProductData = async () => {
//     try {
//       const response = await fetch(`/api/products?id=${productId}`)
//       if (!response.ok) {
//         throw new Error("Failed to fetch product data")
//       }
//       const productData = await response.json()
//       form.reset(productData)
//       setExistingImages(productData.images || [])
//     } catch (error) {
//       console.error("Error fetching product data:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch product data. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   async function onSubmit(values) {
//     try {
//       const formData = new FormData()
//       Object.entries(values).forEach(([key, value]) => {
//         if (key === "tags") {
//           formData.append(key, JSON.stringify(value))
//         } else {
//           formData.append(key, value.toString())
//         }
//       })

//       images.forEach((image, index) => {
//         formData.append(`image${index}`, image)
//       })

//       existingImages.forEach((imageUrl, index) => {
//         formData.append(`existingImage${index}`, imageUrl)
//       })

//       const url = productId ? `/api/products?id=${productId}` : "/api/products"
//       const method = productId ? "PUT" : "POST"

//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error(productId ? "Failed to update product" : "Failed to create product")
//       }

//       const data = await response.json()
//       console.log(productId ? "Product updated:" : "Product created:", data)
//       toast({
//         title: productId ? "Product updated" : "Product created",
//         description: productId
//           ? "Your product has been successfully updated."
//           : "Your product has been successfully created.",
//       })
//       router.push("/admin/products")
//     } catch (error) {
//       console.error(productId ? "Error updating product:" : "Error creating product:", error)
//       toast({
//         title: "Error",
//         description: productId
//           ? "Failed to update product. Please try again."
//           : "Failed to create product. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const onDrop = (acceptedFiles, fileRejections) => {
//     if (fileRejections.length > 0) {
//       setFileError("Some files were rejected. Please upload valid image files.")
//     } else {
//       const validFiles = acceptedFiles.filter((file) => fileTypes.includes(file.type))
//       setImages((prevImages) => [...prevImages, ...validFiles])
//       setFileError("")
//     }
//   }

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: fileTypes.join(","),
//     multiple: true,
//   })

//   const handleDelete = (indexToRemove, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove))
//     } else {
//       setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove))
//     }
//   }

//   const handleSetPrimary = (index, isExisting = false) => {
//     if (isExisting) {
//       setExistingImages((prevImages) => {
//         const updatedImages = [...prevImages]
//         const [selectedImage] = updatedImages.splice(index, 1)
//         return [selectedImage, ...updatedImages]
//       })
//     } else {
//       setImages((prevImages) => {
//         const updatedImages = [...prevImages]
//         const [selectedImage] = updatedImages.splice(index, 1)
//         return [selectedImage, ...updatedImages]
//       })
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="grid grid-cols-2 gap-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Product Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Product Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="sku"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>SKU</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="stock"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Stock</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                       <Textarea {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="tags"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Tags</FormLabel>
//                     <FormControl>
//                       <div className="flex flex-wrap gap-2 p-2 border rounded-md">
//                         {field.value.map((tag, index) => (
//                           <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
//                             <span>{tag}</span>
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="sm"
//                               className="ml-2 h-auto p-0"
//                               onClick={() => {
//                                 const newTags = [...field.value]
//                                 newTags.splice(index, 1)
//                                 field.onChange(newTags)
//                               }}
//                             >
//                               <X className="h-4 w-4" />
//                               <span className="sr-only">Remove tag</span>
//                             </Button>
//                           </div>
//                         ))}
//                         <Input
//                           placeholder="Add a tag"
//                           className="flex-grow border-none focus:ring-0"
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter" && e.currentTarget.value.trim()) {
//                               e.preventDefault()
//                               const newTag = e.currentTarget.value.trim()
//                               if (!field.value.includes(newTag)) {
//                                 field.onChange([...field.value, newTag])
//                               }
//                               e.currentTarget.value = ""
//                             }
//                           }}
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>
//           <div className="flex flex-col gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Pricing</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="basePrice"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Base Price</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           {...field}
//                           onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="discountPrice"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Discount Price</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           {...field}
//                           onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Category</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <FormField
//                   control={form.control}
//                   name="category"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Category</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a category" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="category1">Category 1</SelectItem>
//                           <SelectItem value="category2">Category 2</SelectItem>
//                           <SelectItem value="category3">Category 3</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//         <Card>
//           <CardHeader>
//             <CardTitle>Product Images</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div
//                 {...getRootProps()}
//                 className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center cursor-pointer"
//               >
//                 <input {...getInputProps()} />
//                 <p className="text-gray-600">Drag and drop images here, or click to select files</p>
//                 <Button type="button" className="mt-2">
//                   Select Files
//                 </Button>
//               </div>
//               {fileError && <p className="text-red-500">{fileError}</p>}
//               {(existingImages.length > 0 || images.length > 0) && (
//                 <div className="grid grid-cols-5 gap-4">
//                   {existingImages.map((imageUrl, index) => (
//                     <div key={`existing-${index}`} className="relative">
//                       <img
//                         src={imageUrl || "/placeholder.svg"}
//                         alt={`Existing product image ${index + 1}`}
//                         className="w-full h-24 object-cover rounded"
//                       />
//                       <Button
//                         type="button"
//                         className="absolute top-0 right-0 bg-white rounded-full p-1"
//                         onClick={() => handleDelete(index, true)}
//                       >
//                         <Trash className="h-4 w-4 text-red-500" />
//                         <span className="sr-only">Delete image</span>
//                       </Button>
//                       <Button
//                         type="button"
//                         className={cn(
//                           "absolute bottom-0 left-0 bg-white rounded-full p-1",
//                           index === 0 && "text-yellow-500",
//                         )}
//                         onClick={() => handleSetPrimary(index, true)}
//                       >
//                         <Star className="h-4 w-4" />
//                         <span className="sr-only">Set as primary image</span>
//                       </Button>
//                     </div>
//                   ))}
//                   {images.map((image, index) => (
//                     <div key={`new-${index}`} className="relative">
//                       <img
//                         src={URL.createObjectURL(image) || "/placeholder.svg"}
//                         alt={`New product image ${index + 1}`}
//                         className="w-full h-24 object-cover rounded"
//                       />
//                       <Button
//                         type="button"
//                         className="absolute top-0 right-0 bg-white rounded-full p-1"
//                         onClick={() => handleDelete(index)}
//                       >
//                         <Trash className="h-4 w-4 text-red-500" />
//                         <span className="sr-only">Delete image</span>
//                       </Button>
//                       <Button
//                         type="button"
//                         className={cn(
//                           "absolute bottom-0 left-0 bg-white rounded-full p-1",
//                           index === 0 && existingImages.length === 0 && "text-yellow-500",
//                         )}
//                         onClick={() => handleSetPrimary(index)}
//                       >
//                         <Star className="h-4 w-4" />
//                         <span className="sr-only">Set as primary image</span>
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//         <Button type="submit">{productId ? "Update Product" : "Create Product"}</Button>
//       </form>
//     </Form>
//   )
// }



export default function CreateProductPage() {
  return (
    <div className=" mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
      <ProductForm />
    </div>
  )
}

