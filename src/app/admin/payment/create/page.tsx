'use client'
import React, { useEffect, useState } from "react"
import { api } from "@/lib/axios"
import { showToast } from "@/components/toast/Toast"
import { IProduct } from "../../product/page"
import { ITransaction } from "../../transaction/page"
import { useRouter } from "next/navigation"

export default function AdminCreatePaymentPage() {


    const router = useRouter()
    const [product, setProduct] =  useState<IProduct[]>([])
    const [transaction, setTransaction] = useState<ITransaction[]> ([])
    const [status, setStatus]= useState('')
    const [productID, setProductID]= useState('')
    const [transactionID, setTransactionID] = useState('')

   const getProduct = async ()=>  {
        try {
            const res = await api.get('product/get-all')
            setProduct(res.data)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect (() => {
        getProduct()
    }, [])

    
    const getTransaction = async ()=>  {
        try {
            const res = await api.get('transaction/get-all')
            setTransaction(res.data)
        } catch (error) {
          console.log(error)
            
        }
    }
    useEffect (() => {
        getTransaction()
    }, [])

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('payment/create',{
            status,
            productID,
            transactionID
            })

            showToast(res.data.message, 'success')
            
        } catch (error: any) {
            console.log (error)
            
        }
    }
    
    return (
        <div>
        <h4> Input Payment</h4>

        <div className="row">
            <div className="col-md-6">
                <form onSubmit={onSubmit}>
                <div>
                    <label className="form-label small fw-semibold"> Status </label>
                    <input 
                    type="text"
                    name="status" 
                    className="form-control"
                    onChange={(e) => setStatus (e.target.value)}
                    />
                </div>

                <div className="mb-3"> 
                    <label className="from-label small fw-semibold "> Product </label>
                        <select 
                        name="productID" 
                        className="form-control" 
                        onChange={(e) => setProductID (e.target.value)}
                        defaultValue={""}
                        >
                            <option 
                            disabled 
                            value={""}
                            >
                            Select Product
                            </option>
                        {product.map (product => {
                            return (
                                <option
                                key={product.id}
                                value={product.id}
                                > 
                                {product.id}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="mb-3"> 
                    <label className="from-label small fw-semibold "> Transaction </label>
                        <select 
                        name="transactionID" 
                        className="form-control" 
                        onChange={(e) => setTransactionID(e.target.value)}
                        defaultValue={""}
                        >
                            <option 
                            disabled 
                            value={""}
                            >
                            </option>
                        {transaction.map (transaction => {
                            return (
                                <option
                                key={transaction.id}
                                value={transaction.id}
                                > 
                                {transaction.id}
                                </option>
                            )
                        })}
                    </select>
                </div>
                

                <button type="submit" className="btn btn-primary"> save payment </button>
                </form>
            </div>
        </div>
        </div>
    )
}