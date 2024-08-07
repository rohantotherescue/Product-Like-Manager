import React, {PropsWithRef, SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import {useParams, useNavigate} from 'react-router-dom';
import {Product} from "../interfaces/product";

const ProductsEdit = (props: PropsWithRef<any>) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:8000/api/products/${id}`);

                const product: Product = await response.json();

                setTitle(product.title);
                setImage(product.image);
            }
        )();
    }, [id]); // Add id as a dependency

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                image
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        navigate('/admin/products'); // Navigate to the specified route
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title"
                           value={title} // Use value instead of defaultValue
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" name="image"
                           value={image} // Use value instead of defaultValue
                           onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductsEdit;