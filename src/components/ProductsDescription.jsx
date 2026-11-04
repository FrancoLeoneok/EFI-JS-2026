import{useOutletContext} from "react-router-dom";

export default function ProductsDescription() {
    const { product } = useOutletContext();
    return (
        <div>
            <h2>{product.nombre ?? product.name}</h2>
            <p>{product.descripcion ?? product.description ?? 'Sin descripción.'}</p>
        </div>
    );
}
