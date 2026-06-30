'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Interface } from "readline";
import { showToast } from "@/components/toast/Toast";

export interface ITransaction {
        id: number
        amount : String 
        paymentmethod : String 
        transactiondate : String 
    }

export default function AdminTransactionPage () {

    const [transaction, setTransaction] = useState<ITransaction[]>([])

    const getData = async () => {
      try {
        const res = await api.get('transaction/get-all')
        setTransaction (res.data as ITransaction[])
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
                  const res = await api.delete(`Transaction/delete/${id}`)
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
                <h4>Data Transaction</h4>
                <Link href={'/admin/transaction/create'}>
                    <button type="button" className="btn btn-primary"> Tambah Transaction </button>
                </Link>
            </div>

         <table className="table mt-4 table-hover table-striped">
            <thead>
                <tr>
                     <td>amount</td>
                     <td>paymentmethod</td>
                     <td>transactiondate</td>
                     <td>Aksi</td>
                </tr>
            </thead>

            <tbody>
                {transaction.map(transaction=>{
                    return (
                        <tr key={transaction.id}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.paymentmethod}</td>
                            <td>{transaction.transactiondate}</td>
                            
                            
                            <td><div className="d-flex gap-2">
                                     <button type="button" className="btn btn-warning">Edit</button>
                                    <button onClick={() => deleteData(transaction.id)} type="button" className="btn btn-danger">Delete</button>
                                </div></td>
                        </tr>
                    )
                })}
            </tbody>
         </table>
        </div>
    )
}