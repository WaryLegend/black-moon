import Button from "@/components/ui/Button";

// Mock addresses
const mockAddresses = [
  {
    id: 1,
    name: "Nhà riêng",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    phone: "0923456789",
    default: true,
  },
  {
    id: 2,
    name: "Văn phòng",
    address: "456 Đường XYZ, Quận 3, TP. Hồ Chí Minh",
    phone: "0987654321",
    default: false,
  },
];

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Địa chỉ giao hàng</h2>
      {mockAddresses.length === 0 ? (
        <p className="text-center text-gray-600">Bạn chưa có địa chỉ nào.</p>
      ) : (
        <div className="space-y-4">
          {mockAddresses.map((addr) => (
            <div key={addr.id} className="rounded-lg border p-5 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{addr.name}</p>
                  <p className="text-gray-700">{addr.address}</p>
                  <p className="text-sm text-gray-600">SĐT: {addr.phone}</p>
                </div>
                {addr.default && (
                  <span className="rounded bg-green-100 px-3 py-1 text-green-600">
                    Mặc định
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-4">
                <Button className="text-red-600">Chỉnh sửa</Button>
                <Button variant="danger" className="text-gray-600">
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button className="mt-8 w-full md:w-auto">Thêm địa chỉ mới</Button>
    </div>
  );
}
