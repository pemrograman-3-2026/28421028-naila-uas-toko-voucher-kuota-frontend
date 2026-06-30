'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Interface } from "readline";
import Image from "next/image";
import { showToast } from "@/components/toast/Toast";

export interface IProduct {
        id: number
        name : String 
        category : String 
        price : String 
        Image: string
        created_at: string
        update_at: string
    }

export default function AdminProductPage () {

    const [products, setProduct] = useState<IProduct[]>([])

    const getData = async () => {
      try {
        const res = await api.get('product/get-all')
        setProduct (res.data as IProduct[])
      } catch (error) {
        console.log(error)
        
      }
    }

    useEffect (() => {
        getData()
    }, [])

    
    const deleteData = async (id: number) => {
            const isAgree = confirm('Are you sure?')
    
            if (isAgree) {
                try {
                  const res = await api.delete(`Product/delete/${id}`)
                  showToast(res.data.message, 'success')
                  getData()
                } catch (error: any) {
                    showToast(error.response.data.message, 'danger')
                    
                }
            }
        }
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4>Data Product</h4>
                <Link href={'/admin/product/create'}>
                    <button type="button" className="btn btn-primary"> Tambah Product </button>
                </Link>
            </div>

         <table className="table mt-4 table-hover table-striped">
            <thead>
                <tr>
                     <td>name</td>
                     <td>category</td>
                     <td>price</td>
                     <td>Image</td>
                     <td>Aksi</td>
                </tr>
            </thead>

            <tbody>
                {products.map(product=>{
                    return (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            
                            
                            <td> 
                                <Image 
                                src={`${baseURL}/Image/${product.Image}`} width={200} height={200} alt="" unoptimized/>
                            </td>

                            <td>
                                    <div className="d-flex gap-2">
                                         <button type="button" className="btn btn-warning">Edit</button>
                                        <button onClick={() => deleteData(product.id)} type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            
                        </tr>
                    )
                })}
            </tbody>
         </table>
        </div>
    )
}