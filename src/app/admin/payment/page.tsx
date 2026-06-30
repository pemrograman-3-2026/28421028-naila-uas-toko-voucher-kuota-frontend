'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { showToast } from "@/components/toast/Toast";
import { IProduct } from "../product/page";
import { ITransaction } from "../transaction/page";

export interface IPayment {
        id: number
        status : String 
        product : IProduct
        transaction : ITransaction
    }

export default function AdminPaymentPage () {

    const [payment, setPayment] = useState<IPayment[]>([])

    const getData = async () => {
      try {
        const res = await api.get('payment/get-all')
        setPayment (res.data as IPayment[])
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
                  const res = await api.delete(`Payment/delete/${id}`)
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
                <h4>Data Payment</h4>
                <Link href={'/admin/payment/create'}>
                    <button type="button" className="btn btn-primary"> Tambah Payment</button>
                </Link>
            </div>

         <table className="table mt-4 table-hover table-striped">
            <thead>
                <tr>
                     <td>status</td>
                     <td>product</td>
                     <td>transaction</td>
                     <td>Aksi</td>
                     
                </tr>
            </thead>

            <tbody>
                {payment.map(payment=>{
                    return (
                        <tr key={payment.id}>
                            <td>{payment.status}</td>
                            <td>{payment.id}</td>
                            <td>{payment.id}</td>

                            <td>
                                <div className="d-flex gap-2">
                                     <button type="button" className="btn btn-warning">Edit</button>
                                    <button onClick={() => deleteData(payment.id)} type="button" className="btn btn-danger">Delete</button>
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