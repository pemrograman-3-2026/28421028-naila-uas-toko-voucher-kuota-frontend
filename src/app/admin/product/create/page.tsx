'use client'

import { showToast } from "@/components/toast/Toast"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function CreateProductPage () {

    const router = useRouter()
    const [name, setName] = useState('')
    const [category, setCategory] = useState ('')
    const [price, setPrice] = useState ('')
    const [Image, setImage] = useState<File | null>(null)

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('category', category)
            formData.append('price', price.toString())

            if (!Image) {
                showToast('Pilih Gambar', 'danger')
                return
            }
            formData.append('Image', Image)


            const res = await api.post('product/create', formData)
            showToast(res.data.message, 'success')
            router.push('/admin/product')
            } catch (error) {
                console.log(error)
                
            }
        }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const fileSelected = e.target.files ? e.target.files[0] : null
        setImage(fileSelected)
    }

    return(
        <div>
            <h4>Input Product</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Name</label>
                    <input
                    type="text" 
                    name="name"
                    className="form-control form-control-sm py2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                 <div className="mb-3">
                    <label className="from-label small fw-semibold">Category</label>
                    <input
                    type="text" 
                    name="category"
                    className="form-control form-control-sm py2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="from-label small fw-semibold">Price</label>
                    <input
                    type="text" 
                    name="price"
                    className="form-control form-control-sm py2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                        <label className="form-label small fw-semibold">Image</label>
                        <input 
                        type="file" 
                        name="Image"
                        className="form-control"
                        onChange={handleFileChange}
                        />
                        </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}