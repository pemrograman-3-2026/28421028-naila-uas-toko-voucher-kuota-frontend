'use client'

import { showToast } from "@/components/toast/Toast"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateProductPage () {
    const router = useRouter()
    const [amount, setAmount] = useState('')
    const [paymentmethod, setPaymentmethod] = useState ('')
    const [transactiondate, setTransactiondate] = useState ('')

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('transaction/create',{
                amount,
                paymentmethod,
                transactiondate
            })
            showToast(res.data.message, 'success')
            router.push('/admin/transaction')
        } catch (error: any) {
            console.log(error)
            
        }
    }

   return(
        <div>
            <h4>Input Transaction</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label small fw-semibold"> Amount </label>
                    <input 
                        type="text" 
                        name="amount"
                        className="form-control form-control-sm py-2"
                        value={amount}
                        onChange={(e) => setAmount (e.target.value)}
                        />
                </div>

                <div className="mb-3">
                    <label className="form-label small fw-semibold"> Paymentmethod</label>
                    <input 
                        type="text" 
                        name="paymentmethod"
                        className="form-control form-control-sm py-2"
                        value={paymentmethod}
                        onChange={(e) => setPaymentmethod (e.target.value)}
                        />
                </div>

                <div className="mb-3">
                    <label className="form-label small fw-semibold"> transactiondate</label>
                    <input 
                        type="text" 
                        name="transactiondate"
                        className="form-control form-control-sm py-2"
                        value={transactiondate}
                        onChange={(e) => setTransactiondate (e.target.value)}
                        />
                </div>
                <button type="submit" className="btn btn-primary"> Save </button>
            </form>
        </div>
    )
}