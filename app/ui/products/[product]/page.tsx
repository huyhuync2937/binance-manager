export default function Page({ params }: { params: { product: string } }){
    return <p>About detail {params.product}</p>;
  }