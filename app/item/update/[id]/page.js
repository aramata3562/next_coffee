"use client"
import { useState, useEffect } from "react"
import useAuth from "@/app/utils/useAuth"

const UpdateItem = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")

    const loginUserEmail = useAuth()

    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"}) 
            const jsonData = await response.json() 
            const singleItem = jsonData.singleItem         
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setEmail(singleItem.email)
        }
        getSingleItem(context.params.id) 
    }, [context])  

    const handleSubmit = async(e) => {
        e.preventDefault()  
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, { 
                method: "PUT",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    email: loginUserEmail 
                })
            })
            const jsonData = await response.json()  
            alert(jsonData.message)           
        }catch(err){
            alert("アイテム編集失敗")  
        }
    } 
    if(loginUserEmail === email){
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <button>編集</button>
                </form>
            </div>
        )
    }else{
        return <h1> 権限がありません</h1>
    }
}

export default UpdateItem
