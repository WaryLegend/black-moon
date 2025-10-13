function NoCartlistFound() {
  return (
    <div className="border-primary-400 bg-primary-0 flex flex-col gap-5 self-center rounded-md border-1 p-5 text-center">
      <p className="up text-2xl font-semibold">
        Chưa có sản phẩm nào trong giỏ của bạn.
      </p>
      <p>Khám phá cửa hàng chúng tôi và ấn thêm vào giỏ hàng.</p>
    </div>
  );
}

export default NoCartlistFound;
