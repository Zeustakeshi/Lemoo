type Props = { description?: string };

const ProductDescriptionSection = ({ description }: Props) => {
    return (
        <article className="text-gray-600">
            <h3 className="font-semibold text-2xl ">Mô tả sản phẩm:</h3>
            <p className="px-3 py-5">{description}</p>
        </article>
    );
};

export default ProductDescriptionSection;
