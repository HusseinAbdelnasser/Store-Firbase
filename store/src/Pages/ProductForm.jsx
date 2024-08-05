
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firbase/config'

const ProductForm = () => {

    const [img, setImg] = useState(null);
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null)



    return (
        <form style={{ textAlign: "center" }}>
            <div className="mb-4">
                <label htmlFor="username" className="form-label">
                    Product Image :
                </label>
                <input
                    onChange={(eo) => {
                        setImg(eo.target.value)
                    }}
                    required
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    value={img}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Product Title:
                </label>
                <input
                    required
                    onChange={(eo) => {
                        setTitle(eo.target.value)
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="T-shirt"
                    value={title}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Product Price:
                </label>
                <input
                    placeholder="$99.99"
                    required
                    onChange={(eo) => {
                        setPrice(eo.target.value)
                    }}
                    type="number"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={price}
                />
            </div>

             <div className="mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Product Category:
                </label>
                <input
                    required
                    onChange={(eo) => {
                        setCategory(eo.target.value)
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={category}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Product Description:
                </label>

                <textarea
                    placeholder="Product Description....."
                    required
                    onChange={(eo) => {
                        setDescription(eo.target.value)
                    }}
                    rows={3}
                    className="form-control"
                    id="exampleInputPassword1"
                    value={description}
                />
            </div>

            <button
                // disabled={!name || !email || !password}
                type="submit"
                className="btn btn-primary"
                onClick={ async (eo) => {
                    eo.preventDefault();
                    const taskId = new Date().getTime();
                    await setDoc(doc(db, "products", `${taskId}`), {
                        title: title,
                        description: description,
                        id: taskId,
                        price: price,
                        img: img,
                        category: category,
                    });
                    
                }}
            >
                
                Add Product
            </button>
        </form>
    );
};

export default ProductForm;
