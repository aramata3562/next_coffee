"use client"
import { useState } from 'react'
import useAuth from '@/app/utils/useAuth'


const CreateItem = () => {

    const [title,setTitle] = useState("")
    const [price,setprice] = useState("")
    const [image,setImage] = useState("")

    const loginUserEmail = useAuth()
    console.log(loginUserEmail)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
            method: "POST",
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
        });

        if (!response.ok) {
            console.error('サーバーからの応答が期待されるものではありません。');
            return;
        }

try {
    const jsonData = await response.json();
    alert(jsonData.message);
} catch (err) {
    console.error('レスポンスの解析中にエラーが発生しました: ', err);
}
    }
    if(loginUserEmail){

        return (
            <div>
                <h1 className='page-title'>Create Item</h1>
                <form onSubmit={handleSubmit}>
                    <input type="title" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder="アイテム名" required/>
                    <input type="text" value={price} onChange={(e) => setprice(e.target.value)} name="price" placeholder="価格" required/>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} name="image" placeholder="画像" required/>
                    <button type="submit">作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem