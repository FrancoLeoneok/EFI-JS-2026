import{useOutletContext} from "react-router-dom";

export default function ProductsDescription() {
    const { product } = useOutletContext();
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </div>
    );
}