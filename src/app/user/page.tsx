'use client'
import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { IProduct } from "../admin/product/page"

export default function UserDashboardPage() {

    const [product, setProduct] = useState<IProduct[]>([])

    const getData = async () => {
        try {
          const res = await api.get('Product/get-all')
          setProduct(res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return(
        <div>
            <div className="row">
                {product.map(product => (
                    <div key={product.id} className="col-md-4 col-sm-6 col-xs-12">
                        <div className="card">
                            <Image
                            unoptimized
                            alt=""
                            src={`${baseURL}/image/${product.Image}`}
                            width={100}
                            height={100}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.name}</p>
                                <div className="d-flex gap-1">
                                    <button className="btn btn-primary">Detail</button>
                                    <button className="btn btn-danger">Beli</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

